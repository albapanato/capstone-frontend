import Header from "../components/header/Header";

export default function RootLayout({ children }) {
  return (
    <div className="min-h-screen flex justify-between flex-col">
      {/* Header fijo en la parte superior */}
      <Header />

      {/* Contenido principal con margen superior para evitar solapamiento */}
      <div className="flex-grow flex flex-col items-center justify-center p-6 mt-[72px]">
        {children}
      </div>
    </div>
  );
}
