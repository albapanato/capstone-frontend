"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { createUser } from "../../utils/user"; // Importamos la función de API
import { FormInput } from "../form-components/FormInput";
import { Button } from "../form-components/Button";

export default function RegisterForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // // ✅ Si el usuario ya está autenticado, redirigir a la página de validación
  // useEffect(() => {
  //   const jwt = localStorage.getItem("jwt");
  //   if (jwt) {
  //     router.push("/validacion-usuario");
  //   }
  // }, [router]);

  // ✅ Verificar si el usuario ya tiene sesión iniciada
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/validate-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.valid) {
            router.push("/validacion-usuario");
          } else {
            // Si el token es inválido, limpiamos el localStorage y cookies
            localStorage.removeItem("jwt");
            document.cookie =
              "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          }
        })
        .catch((err) => console.error("❌ Error validando token:", err));
    }
  }, [router]);

  const onSubmit = async (data) => {
    setError("");
    setIsSubmitting(true);
    try {
      console.log("Datos enviados al backend:", data);
      const res = await createUser(data); // Enviamos los datos al backend

      console.log("Respuesta del backend:", res);

      if (res.token) {
        // ✅ Guardar el token en cookies y localStorage
        document.cookie = `jwt=${res.token}; path=/; max-age=86400`; // Expira en 1 día
        localStorage.setItem("jwt", res.token);

        // ✅ Redirigir a la validación
        router.push("/validacion-usuario");
      } else {
        throw new Error(res.message || "No se pudo registrar el usuario.");
      }
    } catch (e) {
      console.error("❌ Error en el registro:", e);
      setError(e.message || "No se puede registrar, ha ocurrido un error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Nombre */}
      <FormInput
        label="Nombre"
        {...register("name", {
          required: "Campo obligatorio",
          minLength: { value: 5, message: "Debe tener al menos 5 caracteres" },
          maxLength: {
            value: 20,
            message: "No puede tener más de 20 caracteres",
          },
        })}
        error={errors.name?.message}
      />

      {/* Email */}
      <FormInput
        label="Email"
        type="email"
        {...register("email", {
          required: "Campo obligatorio",
          maxLength: { value: 30, message: "El email es demasiado largo" },
          pattern: {
            value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
            message: "El formato de email no es válido",
          },
        })}
        error={errors.email?.message}
      />

      {/* Contraseña */}
      <FormInput
        label="Contraseña"
        type="password"
        {...register("password", {
          required: "La contraseña es obligatoria",
          minLength: { value: 8, message: "Debe tener al menos 8 caracteres" },
        })}
        error={errors.password?.message}
      />

      {/* Mensaje de error */}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* Botón de envío */}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Cargando..." : "Regístrate"}
      </Button>

      {/* Enlace a inicio de sesión */}
      <p className="text-sm text-center">
        ¿Ya tienes una cuenta?{" "}
        <Link href="/login" className="text-primary hover:underline">
          Inicia sesión
        </Link>
      </p>
    </form>
  );
}
