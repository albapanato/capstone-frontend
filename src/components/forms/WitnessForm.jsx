"use client";
import { Button } from "@/components/form-components/Button";
import { FormInput } from "@/components/form-components/FormInput";
import { IncidentSearcher } from "@/components/form-components/IncidentSearcher";
import { Label } from "@/components/form-components/Label";
import { Notification } from "@/components/form-components/Notification";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/form-components/RadioGroup";
import { HOME_ROUTE } from "@/constants";
import { createWitness } from "@/services/witnesses";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function WitnessForm({ onComplete, incidentId }) {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    watch,
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
    const response = await createWitness(data);
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
          error={errors.incidentId?.message}
          watch={watch}
          setValue={setValue}
          callback={() => setReload(!reload)}
        />
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
          <Label>Sexo</Label>
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
        <div>
          <FormInput
            disabled={!isIncidentSelected}
            label="parentesco"
            {...register("parentesco")}
            error={errors.parentesco?.message}
          />
        </div>

        {/* Declaración */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Declaración*
          </Label>
          <textarea
            disabled={!isIncidentSelected}
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

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting || !isIncidentSelected}
        >
          {isSubmitting ? "Guardando..." : "Registrar Testigo"}
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
