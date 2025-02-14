import { FormInput } from "../objetos-formulario/FormInput"; // Asegúrate de importar correctamente FormInput

function FormUbication({ err = [], dataForm, setDataForm, ubication }) {
  console.log("Ubicación recibida en FormUbication:", ubication);

  const handleChange = (e) => {
    if (setDataForm) {
      setDataForm({ ...dataForm, [e.target.name]: e.target.value });
    }
  };

  return (
    <>
      <div className="space-y-4">
        <FormInput
          label="Nombre de la ubicación"
          name="tittle"
          type="text"
          value={dataForm?.tittle || ""}
          onChange={handleChange}
          error={err.find((error) => error.field === "tittle")?.message}
        />

        <FormInput
          label="Descripción"
          name="description"
          type="text"
          value={dataForm?.description || ""}
          onChange={handleChange}
          error={err.find((error) => error.field === "description")?.message}
        />

        <FormInput
          label="Valoración de daños"
          name="valoration"
          type="text"
          value={dataForm?.valoration || ""}
          onChange={handleChange}
          error={err.find((error) => error.field === "valoration")?.message}
        />

        {/* Input de coordenadas solo lectura */}
        <FormInput
          label="Coordenadas"
          name="coordinates"
          type="text"
          value={
            ubication
              ? `${ubication.lat}, ${ubication.lng}`
              : "No seleccionadas"
          }
          readOnly
          className="bg-gray-200 cursor-not-allowed"
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

export default FormUbication;
