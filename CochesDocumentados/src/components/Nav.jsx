import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Nav() {
  const [open, setOpen] = useState(false);
  const { token } = useAuth();

  return (
    <section className="relative z-50 md:flex md:items-center">
      {/* Botón hamburguesa: solo visible en móvil, alterna menú */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden p-2 text-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] focus-visible:ring-offset-0 rounded-md z-50"
      >
        ☰
      </button>

      {/* Menú de navegación */}
      <nav
        className={`${open ? "flex" : "hidden"} flex-col absolute p-4 md:p-2 top-full right-0 secondary-bg md:bg-none rounded-md shadow-md md:static md:flex md:flex-row z-50`}
      >
        {/* Link a Inicio */}
        <NavLink
          to="inicio"
          className="p-5 md:p-0 md:hover:text-[#d4af37] hover:rounded-md md:mr-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] focus-visible:ring-offset-0 rounded-md"
          onClick={() => setOpen(false)} /* Cierra el menú al hacer click */
        >
          Inicio
        </NavLink>

        {/* Link a Catálogo */}
        <NavLink
          to="catalogo"
          className="p-5 md:p-0 md:hover:text-[#d4af37] hover:rounded-md md:mr-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] focus-visible:ring-offset-0 rounded-md"
          onClick={() => setOpen(false)}
        >
          Catálogo
        </NavLink>

        {/* Link a Admin o Login */}
        {token ? (
          <NavLink
            to="admin"
            className="p-5 md:p-0 md:hover:text-[#d4af37] hover:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] focus-visible:ring-offset-0 rounded-md"
            onClick={() => setOpen(false)}
          >
            Admin
          </NavLink>
        ) : (
          <NavLink
            to="login"
            className="p-5 md:p-0 md:hover:text-[#d4af37] hover:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] focus-visible:ring-offset-0 rounded-md"
            onClick={() => setOpen(false)}
          >
            Entrar
          </NavLink>
        )}
      </nav>
    </section>
  );
}

export default Nav;