import IncidentForm from "../../components/tipos-formulario/IncidentForm";

export default function AddIncidentPage() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-2xl w-full space-y-8 p-8 bg-white rounded-lg shadow-lg m-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Agregar nuevo suceso</h2>
            <p className="mt-2 text-sm text-gray-600">
              Complete el formulario con los detalles del suceso
            </p>
          </div>
          <IncidentForm />
        </div>
      </div>
    </>
  );
}
