import { Button } from '../form-components/Button'

const ActionModal = ({
  selectedIncident,
  validateIncident,
  invalidateIncident,
  setSelectedIncident,
  activeTab,
}) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4'>
      <div className='bg-white p-6 rounded-lg shadow-lg max-w-md w-full'>
        <h3 className='text-xl font-semibold mb-4 text-center'>
          {selectedIncident.nombre_caso}
        </h3>
        <p>
          <strong>Fecha:</strong> {selectedIncident.fecha}
        </p>
        <p>
          <strong>Hora:</strong> {selectedIncident.hora || 'N/A'}
        </p>
        <p>
          <strong>Descripción:</strong> {selectedIncident.descripcion_caso}
        </p>
        <div className='mt-4 flex justify-center gap-4'>
          {activeTab === 'pending' ? (
            <Button variant='default' onClick={validateIncident}>
              Validar
            </Button>
          ) : (
            <Button variant='destructive' onClick={invalidateIncident}>
              Invalidar
            </Button>
          )}
          <Button variant='outline' onClick={() => setSelectedIncident(null)}>
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ActionModal
