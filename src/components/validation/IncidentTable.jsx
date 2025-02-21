import { formatDate, formatTime } from "@/utils/date";
import { Button } from "../form-components/Button";

function IncidentTable({ setSelectedIncident, currentIncidents }) {
  return (
    <div className="overflow-auto h-[60vh] rounded-md">
      <table className="w-full border border-gray-300  rounded-md">
        <thead className="bg-black text-white">
          <tr>
            <th className="p-2 text-justify">ID</th>
            <th className="p-2 text-justify">Suceso</th>
            <th className="p-2 text-justify">Fecha</th>
            <th className="p-2 text-justify">Hora</th>
            <th className="p-2 text-justify">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentIncidents.length > 0 ? (
            currentIncidents.map((caso) => (
              <tr key={caso.id_caso} className="border-b">
                <td className="p-2">{caso.id_caso}</td>
                <td className="p-2">{caso.nombre_caso}</td>
                <td className="p-2">{formatDate(caso.fecha)}</td>
                <td className="p-2">{formatTime(caso.hora) || "N/A"}</td>
                <td className="p-2">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedIncident(caso)}
                  >
                    Ver detalles
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-500">
                No hay sucesos por validar.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default IncidentTable;
