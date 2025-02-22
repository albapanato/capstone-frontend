import { ErrorMessage } from "@/components/error/ErrorMessage";
import MapComponent from "@/components/location/MapComponent";
import { getIncidents, getIncidentsVerified } from "@/services/incidents";
import Link from "next/link";

export default async function HomePage() {
  const response = await getIncidentsVerified();
  if (!response) {
    return <ErrorMessage />;
  }
  const incidents = response;
  console.log("🚀 ~ HomePage ~ incidents:", incidents);

  return (
    <div className="flex flex-col gap-11 text-center">
      <h1 className="text-5xl font-bold tracking-tight">
        Bienvenido a nuestra plataforma
      </h1>
      <p className="text-xl text-gray-600">
        Una plataforma segura para reportar sucesos y ayudar a la comunidad
      </p>

      <MapComponent
        showPosition={false}
        locations={incidents.map((location) => ({
          popupContent: (
            <div>
              <h3>{location.nombre_caso}</h3>
              <Link href={location.id_caso.toString()}>
                Ver más información
              </Link>
            </div>
          ),
          position: Object.values(location.coordenadas.split(",")),
        }))}
      />
    </div>
  );
}
