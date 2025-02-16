import { FormInput } from "../form-components/FormInput"; // Asegúrate de importar correctamente FormInput

function LocationForm({ err = [], dataForm, setDataForm, location, register, errors }) {

  const handleChange = (e) => {
    if (setDataForm) {
      setDataForm({ ...dataForm, [e.target.name]: e.target.value });
    }
  };

  return (
    <>
      <div className="space-y-4">
        {/* Input de coordenadas solo lectura */}
        <FormInput
          label="Coordenadas"
          name="coordinates"
          type="text"
          {...register('coordinates', { required: 'Campo obligatorio' })}
          value={
            location
              ? `${location.lat}, ${location.lng}`
              : "No seleccionadas"
          }
          readOnly
          className="bg-gray-200 cursor-not-allowed"
        />

        <FormInput
          label="Nombre de la ubicación"
          name="tittle"
          type="text"
          value={dataForm?.tittle || ""}
          onChange={handleChange}
          error={err.find((error) => error.field === "tittle")?.message}
        />

        <FormInput
          label="Descripción de la ubicación"
          name="locationDescription"
          type="text"
          value={dataForm?.locationDescription || ""}
          onChange={handleChange}
          error={err.find((error) => error.field === "locationDescription")?.message}
        />

        <FormInput
          label="Valoración de daños"
          name="valoration"
          type="text"
          value={dataForm?.valoration || ""}
          onChange={handleChange}
          error={err.find((error) => error.field === "valoration")?.message}
        />
      </div>

      {/* Manejo seguro de errores generales */}
      {err.length > 0 && (
        <ul className="text-red-500 mt-2">
          {err.map((elem, index) => (
            <li key={index}>{elem.message}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default LocationForm;
