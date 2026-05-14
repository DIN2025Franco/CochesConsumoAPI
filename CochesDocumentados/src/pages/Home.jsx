import Tarjeta from "../components/Tarjeta.jsx";
import ContenedorGlobal from "../components/ContenedorGlobal.jsx";
import { useCoches } from "../hooks/useCoches.js";
import bmwI7 from "../assets/img/2022-bmw-i7.jpg";

function Home() {
  const { data: coches, loading, error } = useCoches();

  return (
    <>
      <ContenedorGlobal>
        {/* Sección del Carrusel: solo visible en desktop */}
        <section className="hidden mb-10 md:flex justify-center">
          <article aria-label="Lo mejor por lo mejor" className="relative md:w-[80%] rounded-lg overflow-hidden">

            {/* Imagen principal del carrusel */}
            <img className="w-full h-full object-cover" src={bmwI7} alt="Lo mejor por lo mejor" />

            {/* Overlay negro semitransparente para mejorar contraste del texto */}
            <div className="absolute inset-0 bg-black/85"></div>

            {/* Texto encima de la imagen */}
            <figcaption className="absolute inset-0 flex flex-col justify-center items-start p-4 sm:p-6 md:p-10 text-white max-w-4xl mx-auto">
              <h2 className="text-left text-2xl md:text-4xl font-bold mb-3">
                Lo mejor por lo mejor
              </h2>
              <p className="text-[14px] md:text-[18px] text-left mb-5">
                Valior Motors nace como una empresa en busca de vender y comprar
                automóviles de alta gama y estética. Siente uno con tu automóvil y
                sal a desprender lo mejor de sí.
              </p>

              {/* Botón de contacto: contenido dentro de un article para no ocupar todo el ancho */}
              <article>
                <button tabIndex="0" className="p-5 primary-bg rounded-lg font-bold focus:outline-none focus-visible:ring-3 focus-visible:ring-[#d4af37]">
                  Contacta con nosotros
                </button>
              </article>
            </figcaption>
          </article>
        </section>

        {/* Sección de vehículos */}
        <section className="md:mt-10">
          <h2 className="text-3xl md:text-4xl text-shadow-custom text-left text-[#d4af37] font-bold secondary-bg md:w-100 p-5">
            Nuestros Vehículos
          </h2>
          <h3 className="text-[18px] md:text-[20px] text-left mt-1 font-bold">
            Los automóviles son un gran signo de prestigio:
          </h3>
          <p className="text-left mb-5">
            Es por ello que buscamos que eso sea lo que resalte en cada uno de
            ellos
          </p>

          {loading && <p className="text-left mt-5">Cargando vehículos...</p>}
          {error && <p className="text-left text-red-500 mt-5">{error}</p>}

          {!loading && !error && (
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 w-full">
              {coches.slice(0, 4).map((coche) => (
                <Tarjeta
                  key={coche._id}
                  nombre={coche.nombre}
                  foto={coche.imagen}
                  descripcion={coche.descripcion}
                  precio={coche.precio}
                  to={`/coches/${coche._id}`} // Ruta hacia la página de detalle usando ID de MongoDB
                />
              ))}
            </section>
          )}
        </section>
      </ContenedorGlobal>
    </>
  );
}

export default Home;