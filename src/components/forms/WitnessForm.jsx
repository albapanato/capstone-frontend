'use client'
import { Button } from '@/components/form-components/Button'
import { FormInput } from '@/components/form-components/FormInput'
import { IncidentSearcher } from '@/components/form-components/IncidentSearcher'
import { Label } from '@/components/form-components/Label'
import { Notification } from '@/components/form-components/Notification'
import { HOME_ROUTE } from '@/constants'
import { incidentsMock } from '@/data/incidents'
import { createWitness } from '@/services/witnesses'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export default function WitnessForm({ onComplete, incidentId }) {
  const router = useRouter()
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    watch,
  } = useForm()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notification, setNotification] = useState('')

  const isIncidentSelected = !!getValues().incidentId
  useEffect(() => {
    if (incidentId) {
      setValue('incidentId', incidentId)
    }
  }, [incidentId, setValue])

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    const response = await createWitness(data)
    if (!response?.ok) {
      setNotification({
        message:
          'Hubo un error al enviar los datos. Por favor, inténtalo de nuevo.',
        type: 'error',
      })
      setIsSubmitting(false)
      return
    }
    setNotification({
      message: 'Testigo registrado correctamente',
      type: 'success',
    })
    setIsSubmitting(false)
    if (onComplete) {
      onComplete()
      return
    }
    router.push(HOME_ROUTE)
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='space-y-6 max-w-3xl mx-auto'
      >
        <IncidentSearcher
          disabled={!!incidentId}
          incidents={incidentsMock}
          error={errors.incidentId?.message}
          watch={watch}
          setValue={setValue}
        />
        {/* Nombre y Apellidos */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <FormInput
            disabled={!isIncidentSelected}
            label='Nombre*'
            {...register('nombre', { required: 'Campo obligatorio' })}
            error={errors.nombre?.message}
          />
          <FormInput
            disabled={!isIncidentSelected}
            label='Apellidos*'
            {...register('apellidos', { required: 'Campo obligatorio' })}
            error={errors.apellidos?.message}
          />
        </div>

        {/* DNI y Teléfonos */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <FormInput
            disabled={!isIncidentSelected}
            label='DNI*'
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
          label='Email*'
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
          <Label className='text-sm font-medium text-gray-700'>
            Declaración*
          </Label>
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

        <Button
          type='submit'
          className='w-full'
          disabled={isSubmitting || !isIncidentSelected}
        >
          {isSubmitting ? 'Guardando...' : 'Registrar Testigo'}
        </Button>
      </form>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </>
  )
}
