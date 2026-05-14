function Contenedor({ titulo, subtitulo, children }) {
  return (
    <section
      /* Contenedor principal de la sección, centrado y con padding */
      aria-labelledby="main-section-title"
      className="w-full text-center p-8"
    >

      {/* Título principal de la sección */}
      {titulo && (
        <h1
          id="main-section-title"
          className="text-3xl md:text-4xl text-shadow-custom text-left text-[#d4af37] font-bold secondary-bg md:w-140 p-5"
        >
          {titulo}
        </h1>
      )}

      {/* Subtítulo opcional */}
      {subtitulo && (
        <h2 className="text-[18px] md:text-[20px] text-left mt-1">
          {subtitulo}
        </h2>
      )}

      {/* Contenido interno de la sección */}
      {children}
    </section>
  );
}

export default Contenedor;
