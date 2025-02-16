import HandlerData from '@/components/HandlerData';
import MapComponent from '@/components/location/MapComponent';
import { incidentsMock } from '@/data/incidents';
import Link from 'next/link';

export default function HomePage() {
  // Get the incidents data from the API using the slug
  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/incidents`, {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // });
  // const incidents = await response.json();

  return (
    <div className="flex flex-col gap-11 text-center">
      <h1 className="text-5xl font-bold tracking-tight">
        Bienvenido a nuestra plataforma
      </h1>
      <p className="text-xl text-gray-600">
        Una plataforma segura para reportar sucesos y ayudar a la comunidad
      </p>

      <MapComponent showPosition={false} locations={incidentsMock.map((location) => ({
        popupContent: <div>
          <h3>{location.nombre}</h3>
          <Link href={location.id.toString()}>Ver más información</Link>
        </div>,
        position: Object.values(location.coordenadas),
      }))} />
      <HandlerData />
    </div>
  );
}
