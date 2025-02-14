import VictimForm from "../../components/tipos-formulario/VictimForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react"; // npm install lucide-react
export default function AddIncidentPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-2xl w-full space-y-8 p-8 bg-white rounded-lg shadow-lg m-4">
        <Link
          href="/agregar-suceso"
          className="text-black font-bold hover:text-gray-800 transition flex items-center gap-2 "
        >
          <ArrowLeft size={20} />
          Volver
        </Link>
        <div className="text-center">
          <h2 className="text-3xl font-bold">Agregar victima</h2>
          <p className="mt-2 text-sm text-gray-600">
            Complete el formulario con los detalles de la victima
          </p>
        </div>
        <VictimForm />
      </div>
    </div>
  );
}
