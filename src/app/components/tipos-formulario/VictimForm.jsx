"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { sendVictimData } from "../../utils/victimsApi";
import { Button } from "../objetos-formulario/Button";
import { FormInput } from "../objetos-formulario/FormInput";
import { Label } from "../objetos-formulario/Label";
import { useEffect, useState } from "react";

export default function VictimForm() {
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
    const savedData = Cookies.get("victimForm");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      Object.keys(parsedData).forEach((key) => setValue(key, parsedData[key]));
    }
  }, [setValue]);

  // ✅ Guardar datos en cookies mientras el usuario escribe
  useEffect(() => {
    const subscription = watch((data) => {
      Cookies.set("victimForm", JSON.stringify(data), { expires: 1 });
      console.log("✅ Datos guardados en cookies (Víctimas):", data);
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (data) => {
    console.log("Datos de la víctima enviados:", data);
    setIsSubmitting(true);
    setError("");

    try {
      // ✅ Enviar los datos al backend usando la función de `utils/api.js`
      const response = await sendVictimData(data);

      console.log("✅ Respuesta del servidor:", response);

      // ✅ Elimina las cookies solo cuando la solicitud es exitosa
      Cookies.remove("victimForm");

      // ✅ Redirigir a otra página si es necesario
      router.push("/caso-registrado"); // Opcional: redirigir tras el envío
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
      {/* Estado de la víctima */}
      <div>
        <FormInput
          label="Estado"
          {...register("estado", { required: "Campo obligatorio" })}
          error={errors.estado?.message}
        />
      </div>

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
        <FormInput
          label="Sexo"
          {...register("sexo")}
          error={errors.sexo?.message}
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Guardando..." : "Registrar Víctima"}
      </Button>
    </form>
  );
}
