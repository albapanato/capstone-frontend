"use client";
import { Button } from "@/components/form-components/Button";
import { FormInput } from "@/components/form-components/FormInput";
import { createVerificator } from "@/services/verificator";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function RegisterForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setError("");
    setIsSubmitting(true);
    try {
      const res = await createVerificator(data);
      if (res.token) {
        // Guardar token en cookies de forma segura
        document.cookie = `jwt=${res.token}; path=/; Secure; HttpOnly; SameSite=Strict; max-age=86400`; // Expira en 1 día
        localStorage.setItem("jwt", res.token);

        // Redirigir a la página principal después del registro
        router.push("/validacion");
      } else {
        throw new Error(res.error || "No se pudo registrar el usuario.");
      }
    } catch (e) {
      console.error("Error en el registro:", e);
      setError(e.message || "No se puede registrar, ha ocurrido un error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-2xl mx-auto"
    >
      <FormInput
        label="Entidad"
        {...register("entidad", {
          required: "Campo obligatorio",
          maxLength: { value: 300, message: "Máximo 300 caracteres" },
        })}
        error={errors.entidad?.message}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="CIF"
          {...register("cif", {
            pattern: {
              value: /^[A-HJNP-SUVW][0-9]{7}[0-9A-J]$/,
              message: "Formato CIF incorrecto",
            },
          })}
          error={errors.cif?.message}
        />
        <FormInput
          label="DNI"
          {...register("DNI", {
            pattern: {
              value: /^[0-9XYZxyz]{1}[0-9]{7}[A-Za-z]{1}$/,
              message: "Formato de DNI incorrecto",
            },
          })}
          error={errors.DNI?.message}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="Nombre"
          {...register("nombre", { required: "Campo obligatorio" })}
          error={errors.nombre?.message}
        />
        <FormInput
          label="Apellidos"
          {...register("apellidos", { required: "Campo obligatorio" })}
          error={errors.apellidos?.message}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="Teléfono"
          {...register("telefono", {
            pattern: { value: /^[0-9]{9}$/, message: "Teléfono inválido" },
          })}
          error={errors.telefono?.message}
        />
        <FormInput
          label="Móvil"
          {...register("movil", {
            pattern: { value: /^[0-9]{9}$/, message: "Móvil inválido" },
          })}
          error={errors.movil?.message}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="Email"
          type="email"
          {...register("email", {
            required: "Campo obligatorio",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Correo inválido",
            },
          })}
          error={errors.email?.message}
        />
        <FormInput
          label="Contraseña"
          type="password"
          {...register("password", {
            required: "La contraseña es obligatoria",
            minLength: {
              value: 8,
              message: "Debe tener al menos 8 caracteres",
            },
          })}
          error={errors.password?.message}
        />
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Guardando..." : "Registrar organización"}
      </Button>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      <p className="text-sm text-center">
        ¿Ya tienes una cuenta?{" "}
        <Link href="/login" className="text-primary hover:underline">
          Inicia sesión
        </Link>
      </p>
    </form>
  );
}
