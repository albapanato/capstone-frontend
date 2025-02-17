import { SearchSelect } from './SearchSelect'

export const IncidentSearcher = ({ incidents, error, watch, setValue, disabled }) => {
  return (
    <div className='grid grid-cols-1 gap-4'>
      <SearchSelect
        disabled={disabled}
        label={
          disabled
            ? 'Suceso'
            : 'Selecciona el suceso para poder completar el resto de datos'
        }
        name='incidentId'
        error={error}
        options={incidents.map((incident) => ({
          value: incident.id,
          label: incident.nombre,
        }))}
        value={watch('incidentId')}
        onChange={(value) => setValue('incidentId', value)}
      />
    </div>
  )
}