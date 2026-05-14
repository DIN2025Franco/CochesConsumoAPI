import { Link } from "react-router-dom";

function TarjetaCoche(props) {
    const { nombre, foto, descripcion, precio, to } = props;

    return (
        <Link
            to={to} // Enlace a la página de detalle del coche
            tabIndex="0"
            aria-label={nombre} // Mejora accesibilidad, describe el coche
            className="flex flex-col items-start gap-3 p-4 rounded-lg secondary-bg shadow-md hover:shadow-lg transition-shadow duration-300 outline-none focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#d4af37] focus-visible:ring-offset-0 w-full max-w-xs mx-auto sm:max-w-full"
        >
            {/* Imagen del coche con relación de aspecto 16:9 */}
            <figure className="w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
                <img className="w-full h-full object-cover" src={foto} alt={nombre} />
                {/* Figcaption accesible para screen readers */}
                <figcaption className="sr-only">{props.children}</figcaption>
            </figure>

            {/* Título del coche */}
            <header className="relative w-full bg-secondary-bg">
                <h2 className="text-[#d4af37] text-left text-2xl font-bold">{nombre}</h2>
            </header>

            {/* Sección de descripción y precio */}
            <section>
                <article>
                    <p className="text-white text-left">{descripcion}</p>
                    <p className="text-[#d4af37] text-left font-bold">{precio}</p>
                </article>
            </section>
        </Link>
    );
}

export default TarjetaCoche;
