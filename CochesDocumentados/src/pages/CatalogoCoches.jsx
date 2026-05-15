import Tarjeta from "../components/Tarjeta.jsx";
import ContenedorGlobal from "../components/ContenedorGlobal.jsx";
import { useState, useMemo, useRef } from "react";
import SearchBar from "../components/SearchBar";
import { useCoches } from "../hooks/useCoches.js";
import useVoiceRecognition from "../hooks/useVoiceRecognition";
import { MdMic } from "react-icons/md";

function CatalogoCoches() {
    const { data: coches, loading, error } = useCoches();
    const [searchTerm, setSearchTerm] = useState("");

    const voice = useVoiceRecognition((text) => {
        // La API de voz a veces añade un punto final por defecto, se quita para que no rompa el filtro
        const textoLimpio = text.trim().replace(/\.$/, "");
        setSearchTerm(textoLimpio);
    });

    // Filtro por nombre del vehículo
    const filteredVehicles = useMemo(() => {
        return (coches || []).filter((coche) => {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            return (
                coche.nombre.toLowerCase().includes(lowerCaseSearchTerm) ||
                coche.descripcion.toLowerCase().includes(lowerCaseSearchTerm)
            );
        });
    }, [searchTerm, coches]);

    // Detectamos si es móvil
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);

    // Swipe horizontal en móvil
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return;
        const distance = touchEndX.current - touchStartX.current;

        if (distance > 20) {
            voice.startListening();
        }

        touchStartX.current = 0;
        touchEndX.current = 0;
    };

    return (
        <>
            <ContenedorGlobal titulo="Nuestros Vehículos" subtitulo="Prestigio, Calidad y Estetica">

                <section className="relative w-full max-w-lg mx-auto mb-6 z-10 mt-5">
                    {/* Texto de ayuda para el swipe */}
                    {isMobile && voice.isSupported && (
                        <p className="text-center text-sm font-medium text-gray-500 mb-2 transition-all">
                            {voice.isListening ? (
                                <span className="text-red-500 animate-pulse">🎤 Escuchando...</span>
                            ) : (
                                "Desliza → sobre la barra para buscar por voz"
                            )}
                        </p>
                    )}

                    {/* Buscador (con eventos touch) */}
                    <section
                        onTouchStart={isMobile ? handleTouchStart : undefined}
                        onTouchMove={isMobile ? handleTouchMove : undefined}
                        onTouchEnd={isMobile ? handleTouchEnd : undefined}
                        className="relative"
                    >
                        <SearchBar
                            searchTerm={searchTerm}
                            onSearchChange={setSearchTerm}
                            placeholder="Buscar vehículo por nombre..."
                            className={!isMobile ? "pr-12" : ""}
                        />
                    </section>

                    {/* Botón micro (solo PC) */}
                    {!isMobile && voice.isSupported && (
                        <button
                            onClick={voice.startListening}
                            className={`absolute right-3 bottom-4 transition mt-2
                                ${voice.isListening
                                    ? "text-red-500 animate-pulse"
                                    : "text-gray-400 hover:text-[#d4af37]"
                                }`}
                            title="Buscar por voz"
                        >
                            <MdMic size={24} />
                        </button>
                    )}
                </section>

                {loading && <p className="text-center mt-8">Cargando vehículos...</p>}
                {error && <p className="text-center text-red-500 mt-8">{error}</p>}

                {!loading && !error && (
                    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-8">
                        {filteredVehicles.length > 0 ? (
                            filteredVehicles.map((coche) => (
                                <section key={coche._id}>
                                    <Tarjeta
                                        nombre={coche.nombre}
                                        foto={coche.imagen}
                                        descripcion={coche.descripcion}
                                        precio={coche.precio}
                                        to={`/coches/${coche._id}`}
                                    />
                                </section>
                            ))
                        ) : (
                            <p className="col-span-full text-center text-gray-500 p-4">
                                No se encontraron vehículos con el término "{searchTerm}".
                            </p>
                        )}
                    </section>
                )}
            </ContenedorGlobal>
        </>
    );
}

export default CatalogoCoches;