import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="w-full secondary-bg text-white py-6">
      <section className="px-10 md:px-40 flex flex-col md:flex-row justify-between gap-6">
        {/* Columna 1: Conócenos */}
        <section>
          <h3 className="font-bold mb-2 primary-color text-[18px] md:text-[20px]">Conócenos</h3>
          <ul className="text-sm space-y-1">
            <li className="hover:text-[#d4af37] cursor-pointer">Quiénes somos</li>
            <li className="hover:text-[#d4af37] cursor-pointer">Nuestra misión</li>
            <li className="hover:text-[#d4af37] cursor-pointer">Nuestros valores</li>
          </ul>
        </section>

        {/* Columna 2: Contáctanos */}
        <section>
          <h3 className="font-bold mb-2 primary-color text-[18px] md:text-[20px]">Contáctanos</h3>
          <ul className="text-sm space-y-1">
            <li className="hover:text-[#d4af37] cursor-pointer">Email: info@valior.com</li>
            <li className="hover:text-[#d4af37] cursor-pointer">Tel: +34 600 000 000</li>
            <li className="hover:text-[#d4af37] cursor-pointer">Dirección: Calle Ejemplo 123, Madrid</li>
          </ul>
        </section>

        {/* Columna 3: Soporte */}
        <section>
          <h3 className="font-bold mb-2 primary-color text-[18px] md:text-[20px]">Soporte</h3>
          <ul className="text-sm space-y-1">
            <li className="hover:text-[#d4af37] cursor-pointer"><a href="/faq">FAQ</a></li>
            <li className="hover:text-[#d4af37] cursor-pointer"><a href="/ayuda">Ayuda</a></li>
            <li className="hover:text-[#d4af37] cursor-pointer"><a href="/terminos">Términos</a></li>
          </ul>
        </section>

        {/* Columna 4: Redes Sociales */}
        <section>
          <h3 className="font-bold mb-2 primary-color text-[18px] md:text-[20px]">Redes Sociales</h3>
          <ul className="text-sm space-y-1">
            <li className="hover:text-[#d4af37] flex items-center gap-2 cursor-pointer">
              <FaFacebookF />
              Facebook
            </li>
            <li className="hover:text-[#d4af37] flex items-center gap-2 cursor-pointer">
              <FaInstagram />
              Instagram
            </li>
            <li className="hover:text-[#d4af37] flex items-center gap-2 cursor-pointer">
              <FaTwitter />
              Twitter
            </li>
          </ul>
        </section>
      </section>

      {/* Línea inferior */}
      <section className="border-t border-white/20 mt-6 pt-4 text-center text-sm">
        <p>© 2025 Valior Motors — Todos los derechos reservados.</p>
      </section>
    </footer>
  );
}

export default Footer;
