import DocumentSourceForm from "../../components/tipos-formulario/DocumentSource";

export default function AddDocumentSourcePage() {
  return (
    <div className="flex items-center justify-center bg-gray-50">
      <div className="w-full space-y-8 p-8 bg-white rounded-lg shadow-lg m-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold">
            Agregar nueva fuente documental
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Complete el formulario con los detalles de la fuente documental
          </p>
        </div>
        <DocumentSourceForm />
      </div>
    </div>
  );
}
