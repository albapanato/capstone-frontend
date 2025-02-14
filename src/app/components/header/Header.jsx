"use client";

import Link from "next/link";

const Header = () => {
  return (
    <>
      {/* Header visible en todas las páginas */}
      <header className="bg-gray-900 text-white py-4 shadow-md">
        <nav className="max-w-6xl mx-auto flex justify-between items-center px-6">
          {/* Sección de formularios alineados a la izquierda */}
          <ul className="flex space-x-6">
            <li>
              <Link
                href="/gemapp-home/agregar-suceso"
                className="hover:underline"
              >
                Caso
              </Link>
            </li>
            <li>
              <Link
                href="/gemapp-home/agregar-testigo"
                className="hover:underline"
              >
                Testigo
              </Link>
            </li>
            <li>
              <Link
                href="/gemapp-home/agregar-victima"
                className="hover:underline"
              >
                Víctima
              </Link>
            </li>
            <li>
              <Link
                href="/gemapp-home/agregar-verificador"
                className="hover:underline"
              >
                Verificador
              </Link>
            </li>
            <li>
              <Link
                href="/gemapp-home/agregar-fuente-documental"
                className="hover:underline"
              >
                Fuente Documental
              </Link>
            </li>
          </ul>

          {/* Botón de salida alineado a la derecha */}
          <Link
            href="/gemapp-home"
            className="hover:underline flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-log-out"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" x2="9" y1="12" y2="12" />
            </svg>
            <span>Salir</span>
          </Link>
        </nav>
      </header>
    </>
  );
};

export default Header;
