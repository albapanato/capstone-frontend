"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { sendDocumentSourceData } from "../../utils/documentSourceApi"; // Función para enviar datos
import { Button } from "../objetos-formulario/Button";
import { FormInput } from "../objetos-formulario/FormInput";
import { Label } from "../objetos-formulario/Label";
import VerificatorForm from "../tipos-formulario/VerificatorForm"; // Formulario de verificación

export default function DocumentSourceForm() {
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
  const [showVerifier, setShowVerifier] = useState(false);

  // ✅ Cargar datos desde las cookies al cargar la página
  useEffect(() => {
    const savedData = Cookies.get("mediaForm");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      Object.keys(parsedData).forEach((key) => setValue(key, parsedData[key]));
    }
  }, [setValue]);

  // ✅ Guardar datos en cookies cuando el usuario cambia de pantalla
  useEffect(() => {
    const handleRouteChange = () => {
      const formData = getValues();
      Cookies.set("mediaForm", JSON.stringify(formData), { expires: 1 });
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
      const response = await sendDocumentSourceData(data);

      console.log("✅ Respuesta del servidor:", response);

      // ✅ Eliminar cookies solo si la solicitud es exitosa
      Cookies.remove("mediaForm");

      // ✅ Redirigir a otra página tras el envío
      router.push("/media-registrado"); // Opcional
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
      {/* Descripción del medio */}
      <FormInput
        label="Descripción del Medio"
        {...register("descripcion_medio", {
          required: "Campo obligatorio",
          maxLength: { value: 250, message: "Máximo 250 caracteres" },
        })}
        error={errors.descripcion_medio?.message}
      />

      {/* Autor del Medio */}
      <FormInput
        label="Autor del Medio"
        {...register("autor_medio", {
          maxLength: { value: 200, message: "Máximo 200 caracteres" },
        })}
        error={errors.autor_medio?.message}
      />

      {/* Fecha de Publicación */}
      <FormInput
        label="Fecha de Publicación"
        type="date"
        {...register("fecha_publicacion")}
        error={errors.fecha_publicacion?.message}
      />

      {/* URL */}
      <FormInput
        label="URL"
        type="url"
        {...register("url", {
          maxLength: { value: 250, message: "Máximo 250 caracteres" },
          pattern: {
            value: /^(https?:\/\/)?([\w-]+)+([\w-]+)+(\/[\w-./?%&=]*)?$/,
            message: "Formato de URL incorrecto",
          },
        })}
        error={errors.url?.message}
      />

      {/* Opción de agregar Verificador */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="addVerifier"
          className="mr-2"
          onChange={() => setShowVerifier(!showVerifier)}
        />
        <Label htmlFor="addVerifier">Agregar Verificador</Label>
      </div>

      {/* Mostrar formulario de verificador si el checkbox está marcado */}
      {showVerifier && <VerificatorForm />}

      {/* Mensaje de error */}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* Botón de envío */}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Guardando..." : "Registrar Medio"}
      </Button>
    </form>
  );
}
