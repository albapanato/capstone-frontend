'use client'
import { sendDocumentSourceData } from '@/utils/documentSourceApi'; // Función para enviar datos
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../form-components/Button';
import { FormInput } from '../form-components/FormInput';
import { Label } from '../form-components/Label';
import VerificatorForm from './VerificatorForm'; // Formulario de verificación
import { HAS_DOCUMENTAL_SOURCES, HOME_ROUTE, ROUTE_BY_TYPE } from '@/constants';
import { useHandleCookiesData } from '@/hooks/use-handle-cookies-data'

export default function DocumentSourceForm() {
  const router = useRouter()
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    getValues,
  } = useForm()
  const { incidentId, nextStep } = useHandleCookiesData(HAS_DOCUMENTAL_SOURCES)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [showVerifier, setShowVerifier] = useState(false)

  const onSubmit = async (data) => {
    console.log('📩 Datos enviados al backend:', data)
    setIsSubmitting(true)
    setError('')

    try {
      // ✅ Enviar los datos al backend
      const response = await sendDocumentSourceData(data)

      console.log('✅ Respuesta del servidor:', response)
      router.push(ROUTE_BY_TYPE[nextStep] ?? HOME_ROUTE)
    } catch (error) {
      setIsSubmitting(false)
      setError(error.message || 'Hubo un error al enviar los datos.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-4 max-w-2xl mx-auto'
    >
      {/* Descripción del medio */}
      <FormInput
        label='Descripción del Medio'
        {...register('descripcion_medio', {
          required: 'Campo obligatorio',
          maxLength: { value: 250, message: 'Máximo 250 caracteres' },
        })}
        error={errors.descripcion_medio?.message}
      />

      {/* Autor del Medio */}
      <FormInput
        label='Autor del Medio'
        {...register('autor_medio', {
          maxLength: { value: 200, message: 'Máximo 200 caracteres' },
        })}
        error={errors.autor_medio?.message}
      />

      {/* Fecha de Publicación */}
      <FormInput
        label='Fecha de Publicación'
        type='date'
        {...register('fecha_publicacion')}
        error={errors.fecha_publicacion?.message}
      />

      {/* URL */}
      <FormInput
        label='URL'
        {...register('url', {
          maxLength: { value: 250, message: 'Máximo 250 caracteres' },
          pattern: {
            value: /^(https?:\/\/)?([\w\-]+(\.[\w\-]+)+)(:[0-9]+)?(\/[\w\-._~:\/?#[\]@!$&'()*+,;=]*)?$/,
            message: 'Formato de URL incorrecto',
          },
        })}
        error={errors.url?.message}
      />

      {/* Opción de agregar Verificador */}
      <div className='flex items-center'>
        <input
          type='checkbox'
          id='addVerifier'
          className='mr-2'
          onChange={() => setShowVerifier(!showVerifier)}
        />
        <Label htmlFor='addVerifier'>Agregar Verificador</Label>
      </div>

      {/* Mostrar formulario de verificador si el checkbox está marcado */}
      {showVerifier && <VerificatorForm />}

      {/* Mensaje de error */}
      {error && <p className='text-sm text-red-500'>{error}</p>}

      {/* Botón de envío */}
      <Button type='submit' className='w-full' disabled={isSubmitting}>
        {isSubmitting ? 'Guardando...' : 'Registrar Medio'}
      </Button>
    </form>
  )
}
