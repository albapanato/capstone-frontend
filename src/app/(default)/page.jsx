import { ErrorMessage } from '@/components/error/ErrorMessage';
import MapComponent from '@/components/location/MapComponent';
import { incidentsMock } from '@/data/incidents';
import { getIncidents } from '@/services/incidents';
import Link from 'next/link';

export default async function HomePage() {
  // const response = await getIncidents({})
  // if (!response || !response.data) {
  //   return <ErrorMessage/>;
  // }
  // const incidents = response.data;
  const incidents = incidentsMock

  return (
    <div className="flex flex-col gap-11 text-center">
      <h1 className="text-5xl font-bold tracking-tight">
        Bienvenido a nuestra plataforma
      </h1>
      <p className="text-xl text-gray-600">
        Una plataforma segura para reportar sucesos y ayudar a la comunidad
      </p>

      <MapComponent showPosition={false} locations={incidents.map((location) => ({
        popupContent: <div>
          <h3>{location.nombre}</h3>
          <Link href={location.id.toString()}>Ver más información</Link>
        </div>,
        position: Object.values(location.coordenadas),
      }))} />
    </div>
  );
}
