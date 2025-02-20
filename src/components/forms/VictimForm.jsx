"use client";
import { Button } from "@/components/form-components/Button";
import { FormInput } from "@/components/form-components/FormInput";
import { IncidentSearcher } from "@/components/form-components/IncidentSearcher";
import { Notification } from "@/components/form-components/Notification";
import { HOME_ROUTE } from "@/constants";
import { incidentsMock } from "@/data/incidents";
import { createVictim } from "@/services/victims";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function VictimForm({ onComplete, incidentId }) {
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
  const [notification, setNotification] = useState("");
  const isIncidentSelected = !!getValues().incidentId;

  useEffect(() => {
    if (incidentId) {
      setValue("incidentId", incidentId);
    }
  }, [incidentId, setValue]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const response = await createVictim(data);
    if (!response?.ok) {
      setNotification({
        message:
          "Hubo un error al enviar los datos. Por favor, inténtalo de nuevo.",
        type: "error",
      });
      setIsSubmitting(false);
      return;
    }
    setNotification({
      message: "Testigo registrado correctamente",
      type: "success",
    });
    setIsSubmitting(false);
    if (onComplete) {
      onComplete();
      return;
    }
    router.push(HOME_ROUTE);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 max-w-3xl mx-auto"
      >
        <IncidentSearcher
          disabled={!!incidentId}
          incidents={incidentsMock}
          error={errors.incidentId?.message}
          watch={watch}
          setValue={setValue}
        />
        {/* Estado de la víctima */}
        <div>
          <FormInput
            disabled={!isIncidentSelected}
            label="Estado*"
            {...register("estado", { required: "Campo obligatorio" })}
            error={errors.estado?.message}
          />
        </div>

        {/* Nombre y Apellidos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            disabled={!isIncidentSelected}
            label="Nombre*"
            {...register("nombre", { required: "Campo obligatorio" })}
            error={errors.nombre?.message}
          />
          <FormInput
            disabled={!isIncidentSelected}
            label="Apellidos*"
            {...register("apellidos", { required: "Campo obligatorio" })}
            error={errors.apellidos?.message}
          />
        </div>

        {/* DNI y Teléfonos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormInput
            disabled={!isIncidentSelected}
            label="DNI*"
            {...register("DNI", { required: "Campo obligatorio" })}
            error={errors.DNI?.message}
          />
          <FormInput
            disabled={!isIncidentSelected}
            label="Teléfono"
            {...register("telefono")}
            error={errors.telefono?.message}
          />
          <FormInput
            disabled={!isIncidentSelected}
            label="Móvil"
            {...register("movil")}
            error={errors.movil?.message}
          />
        </div>

        {/* Email */}
        <FormInput
          disabled={!isIncidentSelected}
          label="Email*"
          type="email"
          {...register("email", { required: "Campo obligatorio" })}
          error={errors.email?.message}
        />

        {/* Sexo */}
        <div>
          <FormInput
            disabled={!isIncidentSelected}
            label="Sexo"
            {...register("sexo")}
            error={errors.sexo?.message}
          />
        </div>

        <div>
          <FormInput
            disabled={!isIncidentSelected}
            label="parentesco"
            {...register("parentesco")}
            error={errors.parentesco?.message}
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting || !isIncidentSelected}
        >
          {isSubmitting ? "Guardando..." : "Registrar Víctima"}
        </Button>
      </form>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </>
  );
}
