import Link from "next/link";
import { ArrowLeft } from "lucide-react"; // npm install lucide-react

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-bold">
      {/* Header */}
      <header className="w-full bg-gray-900">
        <div className="py-4">
          <Link
            href="/"
            className="text-zinc-200 font-bold hover:text-gray-800 transition flex items-center gap-2 px-9"
          >
            <ArrowLeft size={20} />
            Volver
          </Link>
        </div>
      </header>

      {/* Contenido con imagen de fondo y texto */}
      <div className="flex flex-grow w-full">
        {/* Imagen a la izquierda */}
        <div
          className="w-1/2 h-screen bg-cover bg-left bg-no-repeat"
          style={{ backgroundImage: "url('/fondo-def.jpg')" }} // 🔹 Solución alternativa
        ></div>

        {/* Texto a la derecha */}
        <div className="w-1/2 flex items-center justify-center p-10">
          <div className="max-w-lg bg-gray-900 bg-opacity-80 p-8 rounded-lg">
            <h1 className="text-3xl font-bold text-white mb-6">
              Sobre Global Emergency Map (GEM)
            </h1>

            <p className="text-zinc-200 leading-relaxed text-xl mt-4">
              <strong className="text-xl">GEM</strong> es una aplicación
              diseñada para la recopilación de datos en casos de emergencias
              medioambientales y crisis humanitarias.
            </p>

            <p className="text-zinc-200 leading-relaxed mt-4 text-xl">
              GEM permite a investigadores, familiares y periodistas comprender
              el alcance de las crisis existentes en cualquier parte del mundo.
            </p>

            <h2 className="mb-3 text-2xl font-bold text-white mt-6">
              Quiénes Somos
            </h2>

            <p className="text-zinc-200 leading-relaxed mt-2 text-xl">
              Somos <strong className="text-xl">Ángel Lizarzado</strong>,{" "}
              <strong className="text-xl">Alba Panato</strong> y{" "}
              <strong className="text-xl">Martha Arrázola</strong>, estudiantes
              del Máster en Desarrollo de Apps y Programación Web en el{" "}
              <strong className="text-xl">Immune Technology Institute</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
