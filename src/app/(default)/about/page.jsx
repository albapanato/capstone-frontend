import LoadingSpinner from "@/components/form-components/LoadingSpinner";
import Image from "next/image";

export default function About() {
  return (
    <div className="flex flex-col justify-center lg:flex-row">
      {/* Imagen a la izquierda */}
      <Image
        src="/fondo-def.jpg"
        alt="Imagen de fondo"
        width={1280}
        height={720}
        className="lg:w-1/2 h-80 lg:h-auto object-cover"
        priority
      />

      {/* Texto a la derecha */}
      <div className="flex justify-center">
        <div className="lg:max-w-lg bg-black p-8">
          <h1 className="text-3xl font-bold text-white mb-6">
            Sobre Global Emergency Map (GEM)
          </h1>

          <p className="text-zinc-200 leading-relaxed text-xl mt-4">
            <strong className="text-xl">GEM</strong> es una aplicación diseñada
            para la recopilación de datos en casos de emergencias
            medioambientales y crisis humanitarias.
          </p>

          <p className="text-zinc-200 leading-relaxed mt-4 text-xl">
            GEM permite a investigadores, familiares y periodistas comprender el
            alcance de las crisis existentes en cualquier parte del mundo.
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
  );
}
