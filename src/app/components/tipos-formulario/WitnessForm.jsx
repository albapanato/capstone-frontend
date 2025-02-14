"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie"; // Importamos js-cookie
import { sendWitnessData } from "../../utils/witnessApi";
import { Button } from "../objetos-formulario/Button";
import { FormInput } from "../objetos-formulario/FormInput";
import { Label } from "../objetos-formulario/Label";
import { useEffect, useState } from "react";

export default function WitnessForm() {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // ✅ Cargar datos desde las cookies al cargar la página
  useEffect(() => {
    const savedData = Cookies.get("witnessForm");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      Object.keys(parsedData).forEach((key) => setValue(key, parsedData[key]));
    }
  }, [setValue]);

  // ✅ Guardar datos en cookies mientras el usuario escribe
  useEffect(() => {
    const subscription = watch((data) => {
      Cookies.set("witnessForm", JSON.stringify(data), { expires: 1 });
      console.log("✅ Datos guardados en cookies (Testigos):", data);
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (data) => {
    console.log("Datos del testigo enviados:", data);
    setIsSubmitting(true);
    setError("");

    try {
      // ✅ Enviar los datos al backend
      const response = await sendWitnessData(data);

      console.log("✅ Respuesta del servidor:", response);

      // ✅ Eliminar cookies solo si la solicitud es exitosa
      Cookies.remove("witnessForm");

      // ✅ Redirigir a otra página si es necesario
      router.push("/caso-registrado"); // Opcional: cambiar ruta tras el envío
    } catch (error) {
      setIsSubmitting(false);
      setError(error.message || "Hubo un error al enviar los datos.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-2xl mx-auto"
    >
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

      {/* DNI y Teléfonos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormInput
          label="DNI"
          {...register("DNI", { required: "Campo obligatorio" })}
          error={errors.DNI?.message}
        />
        <FormInput
          label="Teléfono"
          {...register("telefono")}
          error={errors.telefono?.message}
        />
        <FormInput
          label="Móvil"
          {...register("movil")}
          error={errors.movil?.message}
        />
      </div>

      {/* Email */}
      <FormInput
        label="Email"
        type="email"
        {...register("email", { required: "Campo obligatorio" })}
        error={errors.email?.message}
      />

      {/* Sexo */}
      <div>
        <Label className="text-sm font-medium text-gray-700 mb-2 block">
          Sexo
        </Label>
        <FormInput
          label="Sexo"
          {...register("sexo")}
          error={errors.sexo?.message}
        />
      </div>

      {/* Declaración */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">Declaración</Label>
        <textarea
          {...register("declaracion", {
            required: "Campo obligatorio",
            minLength: {
              value: 10,
              message: "Debe tener al menos 10 caracteres",
            },
          })}
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[100px]"
        />
        {errors.declaracion?.message && (
          <p className="text-sm text-red-500">{errors.declaracion.message}</p>
        )}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Guardando..." : "Registrar Testigo"}
      </Button>
    </form>
  );
}
