import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/authService';
import ContenedorGlobal from '../components/ContenedorGlobal';

const Registro = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData.username, formData.email, formData.password);
      alert('Registro completado con éxito');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <ContenedorGlobal titulo="Nuevo Administrador" subtitulo="Crea una cuenta para gestionar vehículos">
      <section className="flex justify-center py-10">
        <form 
          onSubmit={handleSubmit} 
          className="bg-gray-100 custom-shadow p-8 rounded-lg w-full max-w-md border-t-4 border-[#d4af37]"
        >
          
          <section className="mb-4 text-left">
            <label className="body-medium-bold block mb-2 text-black">Nombre de Usuario</label>
            <input 
              type="text" 
              className="w-full p-3 rounded border border-gray-300 focus:border-[#d4af37] outline-none transition-all"
              placeholder="Nombre completo"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              required
            />
          </section>

          <section className="mb-4 text-left">
            <label className="body-medium-bold block mb-2 text-black">Correo Electrónico</label>
            <input 
              type="email" 
              className="w-full p-3 rounded border border-gray-300 focus:border-[#d4af37] outline-none transition-all"
              placeholder="ejemplo@valiormotors.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </section>
          
          <section className="mb-6 text-left">
            <label className="body-medium-bold block mb-2 text-black">Contraseña</label>
            <input 
              type="password" 
              className="w-full p-3 rounded border border-gray-300 focus:border-[#d4af37] outline-none transition-all"
              placeholder="Mínimo 6 caracteres"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </section>

          {error && <p className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm font-bold border-l-4 border-red-500 mt-5">{error}</p>}
          
          <button 
            type="submit" 
            className="w-full primary-bg text-white py-3 rounded body-normal-bold hover-primary-color transition-all cursor-pointer"
          >
            <span className="mr-2">+</span> Crear Cuenta
          </button>
          
          <p className="mt-6 text-center text-gray-600 body-small">
            ¿Ya tienes cuenta? <Link to="/login" className="text-[#d4af37] font-bold hover:underline">Inicia sesión</Link>
          </p>
        </form>
      </section>
    </ContenedorGlobal>
  );
};

export default Registro;
