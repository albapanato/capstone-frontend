import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

export default function RootLayout({ children }) {
  const isLoggedIn = true;
  return (
    <div className="min-h-screen flex justify-between flex-col">
      {/* Header fijo en la parte superior */}
      {isLoggedIn && <Header />}

      {/* Contenido principal */}
      <div className="flex-grow flex flex-col items-center p-6  mt-16">
        {children}
      </div>
      {/* Footer fijo en la parte inferior */}
      {isLoggedIn && <Footer />}
    </div>
  );
}
