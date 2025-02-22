import { useEffect, useState } from "react";
import { SearchSelect } from "./SearchSelect";
import { getIncidents } from "@/services/incidents";

export const IncidentSearcher = ({
  callback,
  error,
  watch,
  setValue,
  disabled,
}) => {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    getIncidents().then((data) => {
      if (!data) return;
      setIncidents(data);
      callback();
    });
  }, []);
  return (
    <div className="grid grid-cols-1 gap-4">
      <SearchSelect
        disabled={disabled}
        label={
          disabled
            ? "Suceso"
            : "Selecciona el suceso para poder completar el resto de datos"
        }
        name="incidentId"
        error={error}
        options={incidents.map((incident) => ({
          value: incident.id_caso,
          label: incident.nombre_caso,
        }))}
        value={watch("incidentId")}
        onChange={(value) => setValue("incidentId", value)}
      />
    </div>
  );
};
