"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { sendVerificatorData } from "../../utils/verificatorApi"; // Función para enviar datos
import { Button } from "../objetos-formulario/Button";
import { FormInput } from "../objetos-formulario/FormInput";
import { Label } from "../objetos-formulario/Label";

export default function OrganizationForm() {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    getValues,
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // ✅ Cargar datos desde las cookies al cargar la página
  useEffect(() => {
    const savedData = Cookies.get("organizationForm");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      Object.keys(parsedData).forEach((key) => setValue(key, parsedData[key]));
    }
  }, [setValue]);

  // ✅ Guardar datos en cookies cuando el usuario cambia de pantalla
  useEffect(() => {
    const handleRouteChange = () => {
      const formData = getValues();
      Cookies.set("organizationForm", JSON.stringify(formData), { expires: 1 });
      console.log(
        "✅ Datos guardados en cookies al cambiar de página:",
        formData
      );
    };

    router.events?.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events?.off("routeChangeStart", handleRouteChange);
    };
  }, [getValues, router]);

  const onSubmit = async (data) => {
    console.log("📩 Datos enviados al backend:", data);
    setIsSubmitting(true);
    setError("");

    try {
      // ✅ Enviar los datos al backend
      const response = await sendVerificatorData(data);

      console.log("✅ Respuesta del servidor:", response);

      // ✅ Eliminar cookies solo si la solicitud es exitosa
      Cookies.remove("organizationForm");

      // ✅ Redirigir a otra página tras el envío
      router.push("/organizacion-registrada"); // Opcional
    } catch (error) {
      setIsSubmitting(false);
      setError(error.message || "Hubo un error al enviar los datos.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-2xl mx-auto"
    >
      {/* Entidad */}
      <FormInput
        label="Entidad"
        {...register("entidad", {
          required: "Campo obligatorio",
          maxLength: { value: 300, message: "Máximo 300 caracteres" },
        })}
        error={errors.entidad?.message}
      />

      {/* CIF */}
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

      {/* Nombre y Apellidos */}
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

      {/* DNI */}
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

      {/* Teléfonos */}
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

      {/* Email */}
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

      {/* Botón de envío */}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Guardando..." : "Registrar Entidad"}
      </Button>
    </form>
  );
}
