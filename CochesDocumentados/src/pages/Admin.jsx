import VehiculoForm from "../components/VehiculoForm";
import ContenedorGlobal from "../components/ContenedorGlobal";
import { useStats } from "../hooks/useStats";
import { useAuth } from "../context/AuthContext";

function Admin() {
  const { stats, loading: loadingStats } = useStats();
  const { logoutUser, user } = useAuth();

  return (
    <section className="flex flex-col w-full">
      <ContenedorGlobal titulo="Panel de Administración" subtitulo={`Bienvenido, ${user?.username}`}>

        {/* Sección de Informe / Estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 mt-5">
          <div className="bg-gray-100 custom-shadow p-6 rounded-lg border-t-4 border-[#d4af37]">
            <h4 className="text-gray-600 text-xs uppercase font-bold mb-2">Total Vehículos</h4>
            <p className="text-lg md:text-2xl font-bold text-black">{loadingStats ? '...' : stats?.totalVehiculos}</p>
          </div>
          <div className="bg-gray-100 custom-shadow p-6 rounded-lg border-t-4 border-[#d4af37]">
            <h4 className="text-gray-600 text-xs uppercase font-bold mb-2">Valor Total del Stock</h4>
            <p className="text-lg md:text-2xl font-bold text-black">{loadingStats ? '...' : stats?.valorTotal}</p>
          </div>
          <div className="bg-gray-100 custom-shadow p-6 rounded-lg border-t-4 border-[#d4af37]">
            <h4 className="text-gray-600 text-xs uppercase font-bold mb-2">Precio Medio</h4>
            <p className="text-lg md:text-2xl font-bold text-black">{loadingStats ? '...' : stats?.precioMedio}</p>
          </div>
          <div className="bg-gray-100 custom-shadow p-6 rounded-lg border-t-4 border-[#d4af37]">
            <h4 className="text-gray-600 text-xs uppercase font-bold mb-2">Categorías</h4>
            <p className="text-lg md:text-2xl font-bold text-black">{loadingStats ? '...' : stats?.categorias}</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-5 gap-5 md:gap-10">
          <h3 className="text-3xl md:text-4xl text-shadow-custom text-left text-[#d4af37] font-bold secondary-bg md:w-100 p-5">Vender un Nuevo Vehículo</h3>
          <button
            onClick={logoutUser}
            className="text-white border border-red-800 bg-red-800 px-4 py-2 rounded-lg hover:bg-red-950 transition-all text-sm"
          >
            Cerrar Sesión
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1">
            <VehiculoForm />
          </div>
          <img src="src/assets/img/car.png" alt="Silueta de coche" className="hidden lg:block object-contain max-w-md self-center" />
        </div>
      </ContenedorGlobal>
    </section>
  );
}

export default Admin;
