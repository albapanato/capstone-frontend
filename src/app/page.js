import Link from "next/link";
import { FileUser } from "lucide-react";
import InitialButtonsBlock from "./components/objetos-formulario/InitialButtonsBlock";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50">
      {/* Contenido principal */}
      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="max-w-2xl text-center space-y-8">
          <h1 className="text-5xl font-bold tracking-tight">
            Bienvenido a nuestra plataforma
          </h1>
          <p className="text-xl text-gray-600">
            Una plataforma segura para reportar sucesos y ayudar a la comunidad
          </p>
          <InitialButtonsBlock />
        </div>
      </div>

      {/* Footer estilizado */}
      <footer className="w-full bg-gray-100 py-4 text-center border-t border-gray-300">
        <Link
          href="/about"
          className="text-gray-600 hover:text-gray-800 transition flex items-center justify-center gap-2"
        >
          <FileUser size={20} />
          Sobre nosotros
        </Link>
      </footer>
    </div>
  );
}
