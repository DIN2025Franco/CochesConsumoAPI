import { useNavigate, useParams } from "react-router-dom";
import ContenedorGlobal from "../components/ContenedorGlobal.jsx";
import { useCoche } from "../hooks/useCoche.js";

function CocheDetalles() {
  const { index } = useParams();
  const { data: coche, loading, error } = useCoche(index);
  const navigate = useNavigate();

  if (loading) return <ContenedorGlobal titulo="Cargando..."><p className="text-center mt-10">Cargando detalles...</p></ContenedorGlobal>;
  if (error || !coche) return <ContenedorGlobal titulo="Error"><p className="text-center mt-10 text-red-500">{error || "No se encontró el coche"}</p></ContenedorGlobal>;

  return (
    <ContenedorGlobal titulo={coche.nombre}>
      <section className="w-full mt-2">

        {/* Sección de título y botón de volver */}
        <section className="flex justify-between items-center md:mb-2 p-2">
          <h2 className="md:text-3xl text-[20px] text-left font-bold">{coche.slogan}</h2>
          <button
            className="md:text-2xl secondary-bg text-white p-2 rounded-md cursor-pointer"
            onClick={() => navigate(-1)}
          >
            Volver
          </button>
        </section>

        {/* Sección principal: texto y foto */}
        <section className="flex flex-col xl:flex-row gap-8 p-2 text-justify">
          {/* Texto descriptivo */}
          <article className="order-2 xl:order-1 md:text-[20px] flex-1 flex flex-col justify-between">
            <p>{coche.descripcionLarga}</p>

            {/* Precio y botón de compra, pegados al final del contenedor */}
            <section className="md:flex justify-end items-center mt-5">
              <p className="text-[#d4af37] text-2xl md:text-4xl font-bold md:mr-10 mb-2 md:mb-0">{coche.precio}</p>
              <button className="text-white md:text-2xl primary-bg p-2 md:py-2 md:px-5 rounded-lg">
                <span className="md:mr-2">+</span> Comprar coche
              </button>
            </section>
          </article>

          {/* Imagen del coche */}
          <img src={coche.imagen} alt={coche.nombre} className="order-1 xl:order-2 xl:w-1/2 object-contain rounded-md"
          />
        </section>

        {/* Sección de detalles extra o características adicionales */}
        <section className="mt-10 text-left">
          <h2 className="md:text-4xl text-2xl font-bold mb-5">Detalles Extra</h2>
          <p className="md:text-[20px]">- {coche.descripcion}</p>
        </section>
      </section>
    </ContenedorGlobal>
  );
}

export default CocheDetalles;
