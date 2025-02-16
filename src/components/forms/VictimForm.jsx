'use client'
import { useHandleCookiesData } from '@/hooks/use-handle-cookies-data'
import { sendVictimData } from '@/utils/victimsApi'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../form-components/Button'
import { FormInput } from '../form-components/FormInput'
import { HAS_VICTIMS, ROUTE_BY_TYPE } from '@/constants'

export default function VictimForm() {
  const router = useRouter()
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm()
  const { incidentId, nextStep } = useHandleCookiesData(HAS_VICTIMS)
  console.log("🚀 ~ VictimForm ~ nextStep:", nextStep)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (data) => {
    console.log('Datos de la víctima enviados:', data)
    setIsSubmitting(true)
    setError('')

    try {
      // ✅ Enviar los datos al backend usando la función de `utils/api.js`
      // const response = await sendVictimData(data)
      // console.log('✅ Respuesta del servidor:', response)
      console.log("route ",ROUTE_BY_TYPE[nextStep])
      router.push(ROUTE_BY_TYPE[nextStep] ?? '/')
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
      {/* Estado de la víctima */}
      <div>
        <FormInput
          label='Estado'
          {...register('estado', { required: 'Campo obligatorio' })}
          error={errors.estado?.message}
        />
      </div>

      {/* Nombre y Apellidos */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <FormInput
          label='Nombre'
          {...register('nombre', { required: 'Campo obligatorio' })}
          error={errors.nombre?.message}
        />
        <FormInput
          label='Apellidos'
          {...register('apellidos', { required: 'Campo obligatorio' })}
          error={errors.apellidos?.message}
        />
      </div>

      {/* DNI y Teléfonos */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <FormInput
          label='DNI'
          {...register('DNI', { required: 'Campo obligatorio' })}
          error={errors.DNI?.message}
        />
        <FormInput
          label='Teléfono'
          {...register('telefono')}
          error={errors.telefono?.message}
        />
        <FormInput
          label='Móvil'
          {...register('movil')}
          error={errors.movil?.message}
        />
      </div>

      {/* Email */}
      <FormInput
        label='Email'
        type='email'
        {...register('email', { required: 'Campo obligatorio' })}
        error={errors.email?.message}
      />

      {/* Sexo */}
      <div>
        <FormInput
          label='Sexo'
          {...register('sexo')}
          error={errors.sexo?.message}
        />
      </div>

      {error && <p className='text-sm text-red-500'>{error}</p>}

      <Button type='submit' className='w-full' disabled={isSubmitting}>
        {isSubmitting ? 'Guardando...' : 'Registrar Víctima'}
      </Button>
    </form>
  )
}
