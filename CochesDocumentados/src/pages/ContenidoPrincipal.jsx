import { Outlet } from "react-router-dom";
import Footer from "../components/Footer.jsx";

function ContenidoPrincipal() {
  return (
    <>
      {/* Contenedor principal del contenido, mínimo altura de pantalla y fondo degradado */}
      <main
        id="main-content"
        role="main"
        tabIndex="-1"
        className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center"
      >
        
        {/* Donde se renderizan las rutas hijas */}
        <Outlet />

      </main>
      {/* Footer fijo al final del contenido */}
        <Footer />
    </>
  )
}

export default ContenidoPrincipal;
