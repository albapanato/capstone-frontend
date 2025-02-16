'use client'
import { HAS_WITNESSES, HOME_ROUTE, ROUTE_BY_TYPE } from '@/constants'
import { incidentsMock } from '@/data/incidents'
import { useHandleCookiesData } from '@/hooks/use-handle-cookies-data'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../form-components/Button'
import { FormInput } from '../form-components/FormInput'
import { Label } from '../form-components/Label'
import { SearchSelect } from '../form-components/SearchSelect'

export default function WitnessForm() {
  const router = useRouter()
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    watch,
  } = useForm()
  const cookiesData = useHandleCookiesData(HAS_WITNESSES)
  const incidentId = cookiesData.incidentId
  const nextStep = cookiesData.nextStep

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const isIncidentSelected = !!getValues().incidentId

  useEffect(() => {
    if (incidentId) {
      setValue('incidentId', incidentId)
    }
  }, [incidentId, setValue])

  const onSubmit = async (data) => {
    console.log('Datos del testigo enviados:', data)
    setIsSubmitting(true)
    setError('')

    try {
      // ✅ Enviar los datos al backend
      // const response = await sendWitnessData(data)
      // console.log('✅ Respuesta del servidor:', response)

      router.push(ROUTE_BY_TYPE[nextStep] ?? HOME_ROUTE)
    } catch (error) {
      setIsSubmitting(false)
      setError(error.message || 'Hubo un error al enviar los datos.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-6 max-w-2xl mx-auto'
    >
      <div className='grid grid-cols-1 gap-4'>
        <SearchSelect
          label='Selecciona el suceso'
          name='incidentId'
          error={errors.incidentId?.message}
          options={incidentsMock.map((incident) => ({
            value: incident.id,
            label: incident.nombre,
          }))}
          value={watch('incidentId')}
          onChange={(value) => setValue('incidentId', value)}
        />
      </div>
      {/* Nombre y Apellidos */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <FormInput
          disabled={!isIncidentSelected}
          label='Nombre'
          {...register('nombre', { required: 'Campo obligatorio' })}
          error={errors.nombre?.message}
        />
        <FormInput
          disabled={!isIncidentSelected}
          label='Apellidos'
          {...register('apellidos', { required: 'Campo obligatorio' })}
          error={errors.apellidos?.message}
        />
      </div>

      {/* DNI y Teléfonos */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <FormInput
          disabled={!isIncidentSelected}
          label='DNI'
          {...register('DNI', { required: 'Campo obligatorio' })}
          error={errors.DNI?.message}
        />
        <FormInput
          disabled={!isIncidentSelected}
          label='Teléfono'
          {...register('telefono')}
          error={errors.telefono?.message}
        />
        <FormInput
          disabled={!isIncidentSelected}
          label='Móvil'
          {...register('movil')}
          error={errors.movil?.message}
        />
      </div>

      {/* Email */}
      <FormInput
        disabled={!isIncidentSelected}
        label='Email'
        type='email'
        {...register('email', { required: 'Campo obligatorio' })}
        error={errors.email?.message}
      />

      {/* Sexo */}
      <div>
        <Label className='text-sm font-medium text-gray-700 mb-2 block'></Label>
        <FormInput
          disabled={!isIncidentSelected}
          label='Sexo'
          {...register('sexo')}
          error={errors.sexo?.message}
        />
      </div>

      {/* Declaración */}
      <div className='space-y-2'>
        <Label className='text-sm font-medium text-gray-700'>Declaración</Label>
        <textarea
          disabled={!isIncidentSelected}
          {...register('declaracion', {
            required: 'Campo obligatorio',
            minLength: {
              value: 10,
              message: 'Debe tener al menos 10 caracteres',
            },
          })}
          className='flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[100px]'
        />
        {errors.declaracion?.message && (
          <p className='text-sm text-red-500'>{errors.declaracion.message}</p>
        )}
      </div>

      {error && <p className='text-sm text-red-500'>{error}</p>}

      <Button
        type='submit'
        className='w-full'
        disabled={isSubmitting || !isIncidentSelected}
      >
        {isSubmitting ? 'Guardando...' : 'Registrar Testigo'}
      </Button>
    </form>
  )
}
