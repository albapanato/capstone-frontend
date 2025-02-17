import MapComponent from '@/components/location/MapComponent'
import { incidentsMock } from '@/data/incidents'
import { getIncident } from '@/services/incidents';
import { ErrorMessage } from '@/components/error/ErrorMessage';

async function IncidentPage({ params }) {
  const { id } = await params
  // const response = await getIncident({})
  // if (!response || !response.data) {
  //   return <ErrorMessage/>;
  // }
  // const incident = response.data;
  const incident = incidentsMock.find(
    (incident) => incident.id === parseInt(id)
  )

  if (!incident) return null

  const { nombre, descripcion, fecha, coordenadas } = incident
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-4'>{nombre}</h1>
      <p className='text-gray-600 mb-4'>{descripcion}</p>
      <div className='flex gap-4'>
        <div className='flex items-center'>
          <span className='font-semibold mr-2'>Date:</span>
          <span>{new Date(fecha).toLocaleDateString()}</span>
        </div>
      </div>
      <div className='flex justify-center'>
        <MapComponent position={coordenadas} zoom={10}/>
      </div>
    </div>
  )
}

export default IncidentPage
