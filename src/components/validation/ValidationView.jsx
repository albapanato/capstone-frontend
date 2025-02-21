"use client";

import { Button } from "@/components/form-components/Button";
import { Notification } from "@/components/form-components/Notification";
import { validateIncident as validateIncidentService } from "@/services/incidents";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ActionModal from "./ActionModal";
import IncidentTable from "./IncidentTable";

const STATUS_TABS = {
  all: "all",
  pending: "pending",
  validated: "validated",
  ownValidated: "ownValidated",
};

const ValidationView = ({
  allIncidents,
  pendingIncidents,
  validatedIncidents,
  ownValidatedIncidents,
  idVerificador,
}) => {
  const [activeTab, setActiveTab] = useState(STATUS_TABS.all); // Estado de pestaña activa
  const [selectedIncident, setSelectedIncident] = useState(null); // Para el modal
  const [notification, setNotification] = useState(null); // Estado para la notificación
  const router = useRouter();

  const handleRevalidate = () => {
    router.refresh(); // Esto recarga los datos del servidor
  };

  const incidentsByStatus = {
    [STATUS_TABS.all]: allIncidents,
    [STATUS_TABS.pending]: pendingIncidents,
    [STATUS_TABS.validated]: validatedIncidents,
    [STATUS_TABS.ownValidated]: ownValidatedIncidents,
  };
  const titles = {
    [STATUS_TABS.all]: "Listado de sucesos",
    [STATUS_TABS.pending]: "Sucesos pendientes",
    [STATUS_TABS.validated]: "Sucesos validados",
    [STATUS_TABS.ownValidated]: "Mis sucesos validados",
  };

  const currentIncidents = incidentsByStatus[activeTab];

  const validateIncident = async () => {
    if (!selectedIncident) return;
    setSelectedIncident(null);
    const response = await validateIncidentService(selectedIncident.id_caso, {
      validar: true,
      fk_verificador: idVerificador,
    });
    if (!response.ok) {
      setNotification({
        message: response.message,
        type: "error",
      });
      return;
    }
    setNotification({
      message: "Suceso validado correctamente",
      type: "success",
    });
    handleRevalidate();
  };

  const invalidateIncident = async () => {
    if (!selectedIncident) return;
    setSelectedIncident(null);
    const response = await validateIncidentService(selectedIncident.id_caso, {
      validar: false,
      fk_verificador: idVerificador,
    });
    if (!response.ok) {
      setNotification({
        message: response.message,
        type: "error",
      });
      return;
    }
    setNotification({
      message: "Suceso invalidado correctamente",
      type: "success",
    });
    handleRevalidate();
  };

  return (
    <div className="w-[80%] max-w-screen-xl px-6">
      <div className="flex gap-4">
        <Button
          variant={activeTab === "all" ? "default" : "outline"}
          className="w-full"
          onClick={() => setActiveTab("all")}
        >
          Todos los suceso ({allIncidents.length})
        </Button>
        <Button
          variant={activeTab === "pending" ? "default" : "outline"}
          className="w-full"
          onClick={() => setActiveTab("pending")}
        >
          Pendientes ({pendingIncidents.length})
        </Button>
        <Button
          variant={activeTab === "validated" ? "default" : "outline"}
          className="w-full"
          onClick={() => setActiveTab("validated")}
        >
          Validados ({validatedIncidents.length})
        </Button>
        <Button
          variant={activeTab === "ownValidated" ? "default" : "outline"}
          className="w-full"
          onClick={() => setActiveTab("ownValidated")}
        >
          Mis suceso validados ({ownValidatedIncidents.length})
        </Button>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 py-6">
        <h2 className="text-2xl font-bold mb-4">{titles[activeTab]}</h2>

        <IncidentTable
          currentIncidents={currentIncidents}
          setSelectedIncident={setSelectedIncident}
        />
      </div>

      {/* Modal con información del suceso */}
      {selectedIncident && (
        <ActionModal
          selectedIncident={selectedIncident}
          activeTab={activeTab}
          validateIncident={validateIncident}
          invalidateIncident={invalidateIncident}
          setSelectedIncident={setSelectedIncident}
        />
      )}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          duration={3}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default ValidationView;
