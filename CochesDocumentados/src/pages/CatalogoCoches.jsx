import Tarjeta from "../components/Tarjeta.jsx";
import ContenedorGlobal from "../components/ContenedorGlobal.jsx";
import { useState, useMemo } from "react";
import SearchBar from "../components/SearchBar";
import { useCoches } from "../hooks/useCoches.js";

function CatalogoCoches() {
    const { data: coches, loading, error } = useCoches();
    const [searchTerm, setSearchTerm] = useState("");

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

    return (
        <>
            <ContenedorGlobal titulo="Nuestros Vehículos" subtitulo="Prestigio, Calidad y Estetica">

                <SearchBar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    placeholder="Buscar vehículo por nombre..."
                />

                {loading && <p className="text-center mt-8">Cargando vehículos...</p>}
                {error && <p className="text-center text-red-500 mt-8">{error}</p>}

                {!loading && !error && (
                    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 w-full mt-8">
                        {filteredVehicles.length > 0 ? (
                            filteredVehicles.map((coche) => (
                                <Tarjeta
                                    key={coche._id}
                                    nombre={coche.nombre}
                                    foto={coche.imagen}
                                    descripcion={coche.descripcion}
                                    precio={coche.precio}
                                    to={`/coches/${coche._id}`}
                                >
                                </Tarjeta>
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