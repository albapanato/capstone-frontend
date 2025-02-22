"use client";
import { Button } from "@/components/form-components/Button";
import { FormInput } from "@/components/form-components/FormInput";
import { Notification } from "@/components/form-components/Notification";
import { loginVerificator } from "@/services/auth"; // Importamos la función de API
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { persistDataInCookies } from "@/utils/cookies";
import { REGISTER_ROUTE, VALIDATOR_ROUTE } from "@/constants";

export default function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const router = useRouter();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setError("");

    try {
      const res = await loginVerificator(data);

      if (res.error) {
        throw new Error(res.error);
      }

      if (!res?.token) {
        throw new Error("No tienes autorización para entrar.");
      }

      if (res.token && res.id) {
        persistDataInCookies("token", res.token);
        persistDataInCookies("id", res.id);
        router.push(VALIDATOR_ROUTE);
      } else {
        throw new Error(res.error || "No se pudo registrar el usuario.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <FormInput
          label="Email"
          type="email"
          {...register("email", {
            required: "El email es obligatorio",
            maxLength: { value: 60, message: "El email es demasiado largo" },
            pattern: {
              value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
              message: "El formato del email no es válido",
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
            minLength: {
              value: 8,
              message: "Debe tener al menos 8 caracteres",
            },
          })}
          error={errors.password?.message}
        />

        {/* Mensaje de error */}
        {error && <p className="text-sm text-red-500">{error}</p>}

        {/* Botón de envío */}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Cargando..." : "Inicia sesión"}
        </Button>

        {/* Enlace a registro */}
        <p className="text-sm text-center">
          ¿No tienes cuenta?{" "}
          <Link href={REGISTER_ROUTE} className="text-primary hover:underline">
            Regístrate
          </Link>
        </p>
      </form>

      {/* Notificación de error */}
      {error && (
        <Notification
          message={error}
          type="error"
          onClose={() => setError("")}
        />
      )}
    </>
  );
}
