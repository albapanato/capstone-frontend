'use client'
import MapComponent from '@/components/location/MapComponent'
import {
  ADD_DOCUMENTAL_SOURCE_ROUTE,
  ADD_VICTIM_ROUTE,
  ADD_WITNESS_ROUTE,
  DATA_COOKIES_KEY,
  HAS_DOCUMENTAL_SOURCES,
  HAS_VICTIMS,
  HAS_WITNESSES,
  HOME_ROUTE,
} from '@/constants'
import { persistDataInCookies } from '@/utils/cookies'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../form-components/Button'
import { FormInput } from '../form-components/FormInput'
import { Label } from '../form-components/Label'
import { RadioGroup, RadioGroupItem } from '../form-components/RadioGroup'
import LocationForm from './LocationForm'

export default function IncidentForm() {
  const router = useRouter()
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [location, setLocation] = useState(null)
  const [dataForm, setDataForm] = useState({})

  // ✅ Observamos los valores de los radio buttons
  const hasWitnesses = watch(HAS_WITNESSES)
  const hasVictims = watch(HAS_VICTIMS)
  const hasDocumentalSources = watch(HAS_DOCUMENTAL_SOURCES)

  const onSubmit = async (data) => {
    console.log('Datos enviados:', {
      ...data,
      coordenadas: location,
      ...dataForm,
    })
    setIsSubmitting(true)
    setError('')
    try {
      // const response = await sendIncidentData( {...data, coordenadas: location, ...dataForm})
      persistDataInCookies(DATA_COOKIES_KEY, {
        hasWitnesses,
        hasVictims,
        hasDocumentalSources,
        incidentId: '10', // TO-DO cambiar por response.id cuando la API esté lista
      })
      if (hasWitnesses) return router.push(ADD_WITNESS_ROUTE)
      if (hasVictims) return router.push(ADD_VICTIM_ROUTE)
      if (hasDocumentalSources) return router.push(ADD_DOCUMENTAL_SOURCE_ROUTE)
      router.push(HOME_ROUTE)
    } catch (error) {
      setIsSubmitting(false)
      setError(error.message || 'Hubo un error al enviar los datos.')
    }
  }
  console.log(errors)
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-6 max-w-2xl mx-auto'
    >
      {/* Nombre del suceso */}
      <FormInput
        label='Nombre del suceso'
        {...register('name', {
          required: 'Campo obligatorio',
          minLength: { value: 5, message: 'Debe tener al menos 5 caracteres' },
          maxLength: {
            value: 20,
            message: 'No puede tener más de 20 caracteres',
          },
        })}
        error={errors.name?.message}
      />

      {/* Fecha y Hora */}
      <div className='flex gap-4 w-full'>
        <FormInput
          label='Fecha'
          type='date'
          {...register('date', { required: 'Campo obligatorio' })}
          error={errors.date?.message}
        />
        <FormInput
          label='Hora'
          type='time'
          {...register('time', { required: 'Campo obligatorio' })}
          error={errors.time?.message}
        />
      </div>

      {/* Descripción */}
      <div className='space-y-2'>
        <Label className='text-sm font-medium text-gray-700'>Descripción</Label>
        <textarea
          {...register('description', {
            required: 'Campo obligatorio',
            minLength: {
              value: 5,
              message: 'Debe tener al menos 5 caracteres',
            },
            maxLength: {
              value: 200,
              message: 'No puede tener más de 200 caracteres',
            },
          })}
          className='flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[100px]'
        />
        {errors.description?.message && (
          <p className='text-sm text-red-500'>{errors.description.message}</p>
        )}
      </div>

      {/* Mapa */}
      <MapComponent
        setLocation={setLocation}
        enableSelectPosition
        relocate={true}
        zoom={13}
      />
      <LocationForm
        dataForm={dataForm}
        setDataForm={setDataForm}
        location={location}
        register={register}
      />

      {/* ¿Hay testigos? */}
      <div id={HAS_WITNESSES}>
        <Label>¿Hay testigos?</Label>
        <RadioGroup className='flex gap-4' {...register(HAS_WITNESSES)}>
          <RadioGroupItem value='true' id='witnesses-yes' />
          <Label htmlFor='witnesses-yes'>Sí</Label>
          <RadioGroupItem value='false' id='witnesses-no' />
          <Label htmlFor='witnesses-no'>No</Label>
        </RadioGroup>
      </div>

      {/* ¿Hay víctimas? */}
      <div id={HAS_VICTIMS}>
        <Label>¿Hay víctimas?</Label>
        <RadioGroup className='flex gap-4' {...register(HAS_VICTIMS)}>
          <RadioGroupItem value='true' id='victims-yes' />
          <Label htmlFor='victims-yes'>Sí</Label>
          <RadioGroupItem value='false' id='victims-no' />
          <Label htmlFor='victims-no'>No</Label>
        </RadioGroup>
      </div>

      {/* ¿Hay fuente documental? */}
      <div id={HAS_DOCUMENTAL_SOURCES}>
        <Label>¿Hay fuente documental?</Label>
        <RadioGroup
          className='flex gap-4'
          {...register(HAS_DOCUMENTAL_SOURCES)}
        >
          <RadioGroupItem value='true' id='documental-yes' />
          <Label htmlFor='documental-yes'>Sí</Label>
          <RadioGroupItem value='false' id='documental-no' />
          <Label htmlFor='documental-no'>No</Label>
        </RadioGroup>
      </div>

      <Button type='submit' className='w-full' disabled={isSubmitting}>
        {!hasWitnesses && !hasVictims && !hasDocumentalSources
          ? 'Guardar Suceso'
          : 'Continuar'}
      </Button>
    </form>
  )
}
