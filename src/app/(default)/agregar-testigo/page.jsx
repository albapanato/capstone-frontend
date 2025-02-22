import WitnessForm from "../../../components/forms/WitnessForm";

export default function AddIncidentPage() {
  return (
    <div className="flex max-w-5xl w-full items-center justify-center bg-gray-50">
      <div className="w-full p-8 bg-white rounded-lg shadow-lg m-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Agregar nuevo testigo</h2>
          <p className="mt-2 text-sm text-gray-600 mb-8">
            Complete el formulario con los detalles del testigo
          </p>
        </div>
        <WitnessForm />
      </div>
    </div>
  );
}
