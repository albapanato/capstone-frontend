"use client";

import { Button } from "@/components/form-components/Button";
import LoadingSpinner from "@/components/form-components/LoadingSpinner";
import { Notification } from "@/components/form-components/Notification";
import { ID_COOKIES_KEY, TOKEN_COOKIES_KEY } from "@/constants";
import {
  getIncidents,
  validateIncident as validateIncidentService,
} from "@/services/incidents";
import { getPersistedDataFromCookies } from "@/utils/cookies";
import { useEffect, useState } from "react";
import ActionModal from "./ActionModal";
import IncidentTable from "./IncidentTable";

const STATUS_TABS = {
  all: "all",
  pending: "pending",
  validated: "validated",
  own: "own",
};

const ValidationView = () => {
  const ownId = getPersistedDataFromCookies(ID_COOKIES_KEY);
  const [tokenState, setTokenState] = useState();
  const [incidents, setIncidents] = useState();
  const [activeTab, setActiveTab] = useState(STATUS_TABS.all); // Estado de pestaña activa
  const [selectedIncident, setSelectedIncident] = useState(null); // Para el modal
  const [notification, setNotification] = useState(null); // Estado para la notificación
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getPersistedDataFromCookies(TOKEN_COOKIES_KEY);
    setTokenState(!!token);
  }, []);

  useEffect(() => {
    getIncidents().then((response) => {
      const incidentsMapped = response.reduce(
        (acc, incident) => {
          if (!incident.fk_verificador) {
            acc[STATUS_TABS.pending].push(incident);
            return acc;
          }
          acc[STATUS_TABS.validated].push(incident);
          if (incident.fk_verificador.toString() === ownId.toString()) {
            acc[STATUS_TABS.own].push(incident);
          }
          return acc;
        },
        {
          validated: [],
          pending: [],
          own: [],
        }
      );
      setIncidents({ ...incidentsMapped, [STATUS_TABS.all]: response });
      setIsLoading(false);
    });
  }, []);

  if (tokenState === false) return <div>No tienes acceso. Inicia sesión</div>;

  const incidentsByStatus = {
    [STATUS_TABS.all]: incidents?.all,
    [STATUS_TABS.pending]: incidents?.pending,
    [STATUS_TABS.validated]: incidents?.validated,
    [STATUS_TABS.own]: incidents?.own,
  };
  const titles = {
    [STATUS_TABS.all]: "Listado de sucesos",
    [STATUS_TABS.pending]: "Sucesos pendientes",
    [STATUS_TABS.validated]: "Sucesos validados",
    [STATUS_TABS.own]: "Mis sucesos validados",
  };

  const currentIncidents = incidentsByStatus[activeTab];

  const validateIncident = async () => {
    if (!selectedIncident) return;
    setIsLoading(true);
    setSelectedIncident(null);
    const response = await validateIncidentService(selectedIncident.id_caso, {
      validar: true,
      fk_verificador: ownId,
    });
    if (!response?.ok) {
      setNotification({
        message: response.message,
        type: "error",
      });
      setIsLoading(false);
      return;
    }
    setIncidents({
      ...incidents,
      validated: [...incidents.validated, selectedIncident],
      own: [...incidents.own, selectedIncident],
      pending: incidents.pending.filter(
        (incident) => incident.id_caso !== selectedIncident.id_caso
      ),
    });
    setIsLoading(false);
    setNotification({
      message: "Suceso validado correctamente",
      type: "success",
    });
  };

  const invalidateIncident = async () => {
    if (!selectedIncident) return;
    setIsLoading(true);
    setSelectedIncident(null);
    const response = await validateIncidentService(selectedIncident.id_caso, {
      validar: false,
      fk_verificador: ownId,
    });
    if (!response?.ok) {
      setNotification({
        message: response.message,
        type: "error",
      });
      setIsLoading(false);
      return;
    }
    setIncidents({
      ...incidents,
      validated: incidents.validated.filter(
        (incident) => incident.id_caso !== selectedIncident.id_caso
      ),
      own: incidents.own.filter(
        (incident) => incident.id_caso !== selectedIncident.id_caso
      ),
      pending: [...incidents.pending, selectedIncident],
    });
    setNotification({
      message: "Suceso invalidado correctamente",
      type: "success",
    });
    setIsLoading(false);
  };

  return (
    <div className="w-[90%] max-w-screen-xl px-6">
      {isLoading && <LoadingSpinner fullView />}
      {!!incidents && (
        <div>
          <div className="flex gap-4">
            <Button
              variant={activeTab === STATUS_TABS.all ? "default" : "outline"}
              className="w-full"
              onClick={() => setActiveTab(STATUS_TABS.all)}
            >
              Todos los suceso ({incidents.all.length})
            </Button>
            <Button
              variant={
                activeTab === STATUS_TABS.pending ? "default" : "outline"
              }
              className="w-full"
              onClick={() => setActiveTab(STATUS_TABS.pending)}
            >
              Pendientes ({incidents.pending.length})
            </Button>
            <Button
              variant={
                activeTab === STATUS_TABS.validated ? "default" : "outline"
              }
              className="w-full"
              onClick={() => setActiveTab(STATUS_TABS.validated)}
            >
              Validados ({incidents.validated.length})
            </Button>
            <Button
              variant={activeTab === STATUS_TABS.own ? "default" : "outline"}
              className="w-full"
              onClick={() => setActiveTab(STATUS_TABS.own)}
            >
              Mis suceso validados ({incidents.own.length})
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
        </div>
      )}
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
