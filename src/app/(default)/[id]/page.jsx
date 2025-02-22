import { ErrorMessage } from "@/components/error/ErrorMessage";
import MapComponent from "@/components/location/MapComponent";
import { getOneIncident } from "@/services/incidents";

async function IncidentPage({ params }) {
  const { id } = await params;
  const incident = await getOneIncident(id);
  if (!incident) {
    return <ErrorMessage />;
  }

  const { nombre_caso, descripcion_caso, fecha, coordenadas } = incident;
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{nombre_caso}</h1>
      <p className="text-gray-600 mb-4">{descripcion_caso}</p>
      <div className="flex gap-4">
        <div className="flex items-center">
          <span className="font-semibold mr-2">Fecha:</span>
          <span>{new Date(fecha).toLocaleDateString()}</span>
        </div>
      </div>
      <div className="flex justify-center">
        <MapComponent position={coordenadas.split(",")} zoom={10} />
      </div>
    </div>
  );
}

export default IncidentPage;
