"use client";
import { Button } from "@/components/form-components/Button";
import { FormInput } from "@/components/form-components/FormInput";
import { Label } from "@/components/form-components/Label";
import LoadingSpinner from "@/components/form-components/LoadingSpinner";
import { Notification } from "@/components/form-components/Notification";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/form-components/RadioGroup";
import DocumentSourceForm from "@/components/forms/DocumentSourceForm";
import VictimForm from "@/components/forms/VictimForm";
import WitnessForm from "@/components/forms/WitnessForm";
import MapComponent from "@/components/location/MapComponent";
import {
  HAS_DOCUMENTAL_SOURCES,
  HAS_VICTIMS,
  HAS_WITNESSES,
  HOME_ROUTE,
  TITLE_BY_STEP,
} from "@/constants";
import { createIncident } from "@/services/incidents";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../form-components/Modal";

export default function IncidentForm() {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);
  const [location, setLocation] = useState(null);
  const [stepQueue, setStepQueue] = useState([]);
  const [currentStep, setCurrentStep] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [incidentId, setIncidentId] = useState(null);

  // Observamos los valores de los radio buttons
  const hasWitnesses = watch(HAS_WITNESSES) === "true";
  const hasVictims = watch(HAS_VICTIMS) === "true";
  const hasDocumentalSources = watch(HAS_DOCUMENTAL_SOURCES) === "true";

  const stepComponents = {
    [HAS_WITNESSES]: WitnessForm,
    [HAS_VICTIMS]: VictimForm,
    [HAS_DOCUMENTAL_SOURCES]: DocumentSourceForm,
  };

  const onSubmit = async (data) => {
    if (!verifyLocation()) return;
    setIsSubmitting(true);
    try {
      const response = await createIncident({ ...data, coordinates: location });
      if (!response) throw Error;
      setNotification({
        message: "Suceso creado correctamente",
        type: "success",
      });
      handleFinalAction(response.id_caso);
    } catch {
      setNotification({ message: "Error al crear el suceso", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const verifyLocation = () => {
    if (!location) {
      setNotification({
        message: "Debe seleccionar una ubicación en el mapa",
        type: "error",
      });
      return false;
    }
    return true;
  };

  const handleFinalAction = (id) => {
    const steps = [];
    if (hasWitnesses) steps.push("hasWitnesses");
    if (hasVictims) steps.push("hasVictims");
    if (hasDocumentalSources) steps.push("hasDocumentalSources");

    if (steps.length > 0) {
      setStepQueue(steps);
      setCurrentStep(steps[0]);
      setIncidentId(id);
      setIsModalOpen(true);
    } else {
      router.push(HOME_ROUTE);
    }
  };

  const handleNextStep = () => {
    const nextQueue = stepQueue.slice(1);
    setStepQueue(nextQueue);
    setCurrentStep(nextQueue[0] || null);
    if (nextQueue.length === 0) {
      setIsModalOpen(false);
      router.push(HOME_ROUTE);
    }
  };

  return (
    <>
      {isSubmitting && <LoadingSpinner fullView />}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 max-w-3xl mx-auto"
      >
        <FormInput
          label="Nombre del suceso*"
          {...register("name", {
            required: "Campo obligatorio",
            minLength: {
              value: 5,
              message: "Debe tener al menos 5 caracteres",
            },
          })}
          error={errors.name?.message}
        />

        <div className="flex gap-4 w-full">
          <FormInput
            label="Fecha*"
            type="date"
            {...register("date", { required: "Campo obligatorio" })}
            error={errors.date?.message}
          />
          <FormInput
            label="Hora*"
            type="time"
            {...register("time", { required: "Campo obligatorio" })}
            error={errors.time?.message}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Descripción*
          </Label>
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

        <MapComponent
          setLocation={setLocation}
          enableSelectPosition
          relocate={true}
          zoom={13}
        />

        <div className="space-y-4">
          <FormInput
            label="Coordenadas*"
            name="coordinates"
            type="text"
            value={
              location ? `${location.lat}, ${location.lng}` : "No seleccionadas"
            }
            readOnly
            className="bg-gray-200 cursor-not-allowed"
          />
          <FormInput
            label="Nombre de la ubicación*"
            name="locationName"
            type="text"
            {...register("locationName", { required: "Campo obligatorio" })}
            error={errors.locationName?.message}
          />
          <FormInput
            label="Descripción de la ubicación*"
            name="locationDescription"
            type="text"
            {...register("locationDescription", {
              required: "Campo obligatorio",
            })}
            error={errors.locationDescription?.message}
          />
          <FormInput
            label="Valoración de daños*"
            name="valoration"
            type="text"
            {...register("valoration", { required: "Campo obligatorio" })}
            error={errors.valoration?.message}
          />
        </div>

        <div>
          <Label>¿Hay testigos?</Label>
          <RadioGroup className="flex gap-4" {...register(HAS_WITNESSES)}>
            <RadioGroupItem value="true" id="witnesses-yes" label="Sí" />
            <RadioGroupItem value="false" id="witnesses-no" label="No" />
          </RadioGroup>
        </div>

        <div>
          <Label>¿Hay víctimas?</Label>
          <RadioGroup className="flex gap-4" {...register(HAS_VICTIMS)}>
            <RadioGroupItem value="true" id="victims-yes" label="Sí" />
            <RadioGroupItem value="false" id="victims-no" label="No" />
          </RadioGroup>
        </div>

        <div>
          <Label>¿Hay fuente documental?</Label>
          <RadioGroup
            className="flex gap-4"
            {...register(HAS_DOCUMENTAL_SOURCES)}
          >
            <RadioGroupItem value="true" id="documental-yes" label="Sí" />
            <RadioGroupItem value="false" id="documental-no" label="No" />
          </RadioGroup>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {hasWitnesses || hasVictims || hasDocumentalSources
            ? "Continuar"
            : "Guardar Suceso"}
        </Button>
      </form>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      {currentStep && stepComponents[currentStep] ? (
        <Modal
          isOpen={isModalOpen}
          onClose={handleNextStep}
          title={TITLE_BY_STEP[currentStep]}
        >
          {stepComponents[currentStep] &&
            React.createElement(stepComponents[currentStep], {
              onComplete: handleNextStep,
              incidentId,
            })}
        </Modal>
      ) : null}
    </>
  );
}
