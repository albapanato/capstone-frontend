"use client";

import { Button } from "@/components/form-components/Button";
import { Notification } from "@/components/form-components/Notification";
import { useState } from "react";
import ActionModal from "./ActionModal";
import IncidentTable from "./IncidentTable";

const ValidationView = ({ pendingIncidents, validatedIncidents }) => {
  const [activeTab, setActiveTab] = useState("pending"); // Estado de pestaña activa
  const [selectedIncident, setSelectedIncident] = useState(null); // Para el pop-up
  const [notification, setNotification] = useState(null); // Estado para la notificación

  const validateIncident = () => {
    if (!selectedIncident) return;
    setSelectedIncident(null); // Cerrar pop-up
    setNotification({
      message: "Suceso validado correctamente",
      type: "success",
    });
  };

  const invalidateIncident = () => {
    if (!selectedIncident) return;
    setSelectedIncident(null); // Cerrar pop-up
    setNotification({
      message: "Suceso invalidado",
      type: "success",
    });
  };

  const currentIncidents =
    activeTab === "pending" ? pendingIncidents : validatedIncidents;

  return (
    <div className="w-[80%] max-w-screen-xl px-6">
      <div className="flex gap-4">
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
      </div>

      {/* Contenido principal */}
      <div className="flex-1 py-6">
        <h2 className="text-2xl font-bold mb-4">
          {activeTab === "pending" ? "Sucesos pendientes" : "Sucesos validados"}
        </h2>

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
