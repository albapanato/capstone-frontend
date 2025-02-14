"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie"; // Importamos js-cookie
import { sendIncidentData } from "../../utils/incidentApi";
import Map from "../map/map";
import PositionClick from "../../serviceMap/positionClick";
import LoadMarker from "../../serviceMap/loadMarker";
import FormUbication from "../formUbication/formUbication";
import { Button } from "../objetos-formulario/Button";
import { FormInput } from "../objetos-formulario/FormInput";
import { Label } from "../objetos-formulario/Label";
import { RadioGroup, RadioGroupItem } from "../objetos-formulario/RadioGroup";
import { useState, useEffect } from "react";

export default function IncidentForm() {
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
  const [ubication, setUbicacion] = useState(null);
  const [dataForm, setDataForm] = useState({});

  // ✅ Observamos los valores de los radio buttons
  const hasWitnesses = watch("hasWitnesses");
  const hasVictims = watch("hasVictims");

  // ✅ Cargar datos desde las cookies al cargar la página
  useEffect(() => {
    const savedData = Cookies.get("incidentForm");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      Object.keys(parsedData).forEach((key) => setValue(key, parsedData[key]));
    }
  }, [setValue]);

  // ✅ Guardar datos en cookies cuando el usuario cambia de pantalla
  useEffect(() => {
    const handleRouteChange = () => {
      const formData = getValues();
      Cookies.set("incidentForm", JSON.stringify(formData), { expires: 1 });
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

  // ✅ Guardar datos en cookies en cada letra (desactivado por defecto, pero listo para activar)
  /*
  useEffect(() => {
    const subscription = watch((data) => {
      Cookies.set("incidentForm", JSON.stringify(data), { expires: 1 });
      console.log("✅ Datos guardados en cookies en tiempo real:", data);
    });
    return () => subscription.unsubscribe();
  }, [watch]);
  */

  const onSubmit = async (data) => {
    console.log("Datos enviados:", data);
    setIsSubmitting(true);
    setError("");

    try {
      // ✅ Enviar los datos al backend
      const response = await sendIncidentData(data);

      console.log("✅ Respuesta del servidor:", response);

      // ✅ Eliminar cookies solo si la solicitud es exitosa
      Cookies.remove("incidentForm");

      // ✅ Redirigir a otra página tras el envío
      router.push("/caso-registrado"); // Opcional
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
      {/* Nombre del suceso */}
      <FormInput
        label="Nombre del suceso"
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

      {/* Fecha y Hora */}
      <div className="flex gap-4 w-full">
        <FormInput
          label="Fecha"
          type="date"
          {...register("date", { required: "Campo obligatorio" })}
          error={errors.date?.message}
        />
        <FormInput
          label="Hora"
          type="time"
          {...register("time", { required: "Campo obligatorio" })}
          error={errors.time?.message}
        />
      </div>

      {/* Descripción */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">Descripción</Label>
        <textarea
          {...register("description", {
            required: "Campo obligatorio",
            minLength: {
              value: 5,
              message: "Debe tener al menos 5 caracteres",
            },
            maxLength: {
              value: 200,
              message: "No puede tener más de 200 caracteres",
            },
          })}
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[100px]"
        />
        {errors.description?.message && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* Mapa */}
      <Map
        setUbicacion={setUbicacion}
        PositionClick={PositionClick}
        LoadMarker={LoadMarker}
      />
      <FormUbication
        dataForm={dataForm}
        setDataForm={setDataForm}
        ubication={ubication}
      />

      {/* ¿Hay testigos? */}
      <div id="hayTestigos">
        <Label>¿Hay testigos?</Label>
        <RadioGroup className="flex gap-4" {...register("hasWitnesses")}>
          <RadioGroupItem value="true" id="witnesses-yes" />
          <Label htmlFor="witnesses-yes">Sí</Label>
          <RadioGroupItem value="false" id="witnesses-no" />
          <Label htmlFor="witnesses-no">No</Label>
        </RadioGroup>

        {hasWitnesses === "true" && (
          <Button
            className="mt-4 w-full bg-green-500"
            onClick={() => router.push("/agregar-testigo")}
          >
            Ir al formulario de testigos
          </Button>
        )}
      </div>

      {/* ¿Hay víctimas? */}
      <div id="hayVictimas">
        <Label>¿Hay víctimas?</Label>
        <RadioGroup className="flex gap-4" {...register("hasVictims")}>
          <RadioGroupItem value="true" id="victims-yes" />
          <Label htmlFor="victims-yes">Sí</Label>
          <RadioGroupItem value="false" id="victims-no" />
          <Label htmlFor="victims-no">No</Label>
        </RadioGroup>

        {hasVictims === "true" && (
          <Button
            className=" mt-4 w-full  bg-orange-400"
            onClick={() => router.push("/agregar-victima")}
          >
            Ir al formulario de víctimas
          </Button>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Guardando..." : "Guardar Suceso"}
      </Button>
    </form>
  );
}
