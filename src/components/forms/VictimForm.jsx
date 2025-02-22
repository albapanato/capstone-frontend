"use client";
import { Button } from "@/components/form-components/Button";
import { FormInput } from "@/components/form-components/FormInput";
import { IncidentSearcher } from "@/components/form-components/IncidentSearcher";
import { Label } from "@/components/form-components/Label";
import LoadingSpinner from "@/components/form-components/LoadingSpinner";
import { Notification } from "@/components/form-components/Notification";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/form-components/RadioGroup";
import { HOME_ROUTE } from "@/constants";
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
  const [reload, setReload] = useState(false);

  const isIncidentSelected = !!getValues().incidentId;

  useEffect(() => {
    if (incidentId) {
      setValue("incidentId", incidentId);
    }
  }, [incidentId, setValue, reload]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const response = await createVictim(data);
    if (!response?.ok) {
      setNotification({
        message:
          response.message ||
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
      {isSubmitting && <LoadingSpinner fullView />}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 max-w-3xl mx-auto"
      >
        <IncidentSearcher
          disabled={!!incidentId}
          error={errors.incidentId?.message}
          watch={watch}
          setValue={setValue}
          callback={() => setReload(!reload)}
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
            {...register("DNI", {
              required: "Campo obligatorio",
              pattern: {
                value: /^[0-9XYZxyz]{1}[0-9]{7}[A-Za-z]{1}$/,
                message: "Formato de DNI incorrecto",
              },
            })}
            error={errors.DNI?.message}
          />
          <FormInput
            disabled={!isIncidentSelected}
            label="Teléfono"
            {...register("telefono", {
              minLength: {
                value: 9,
                message: "Debe tener 9 caracteres",
              },
              maxLength: {
                value: 9,
                message: "Debe tener 9 caracteres",
              },
            })}
            error={errors.telefono?.message}
          />
          <FormInput
            disabled={!isIncidentSelected}
            label="Móvil"
            {...register("movil", {
              minLength: {
                value: 9,
                message: "Debe tener 9 caracteres",
              },
              maxLength: {
                value: 9,
                message: "Debe tener 9 caracteres",
              },
            })}
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
          <Label>Sexo*</Label>
          <RadioGroup
            error={errors.sexo?.message}
            className="flex gap-4 mt-1"
            value={watch("sexo")}
            onValueChange={(value) =>
              setValue("sexo", value, { shouldValidate: true })
            }
          >
            <RadioGroupItem value="mujer" id="mujer" label="Mujer" />
            <RadioGroupItem value="hombre" id="hombre" label="Hombre" />
            <RadioGroupItem value="otro" id="otro" label="Otro" />
          </RadioGroup>
          <input
            type="hidden"
            {...register("sexo", { required: "Campo obligatorio" })}
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
