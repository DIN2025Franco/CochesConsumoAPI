import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login } from '../services/authService';
import ContenedorGlobal from '../components/ContenedorGlobal';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      loginUser(data.user, data.token);
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <ContenedorGlobal titulo="Acceso Administrador" subtitulo="Entra para gestionar el catálogo">
      <section className="flex justify-center py-10">
        <form 
          onSubmit={handleSubmit} 
          className="bg-gray-100 custom-shadow p-8 rounded-lg w-full max-w-md border-t-4 border-[#d4af37]"
        >
          
          <section className="mb-4 text-left">
            <label className="body-medium-bold block mb-2 text-black">Correo Electrónico</label>
            <input 
              type="email" 
              className="w-full p-3 rounded border border-gray-300 focus:border-[#d4af37] outline-none transition-all"
              placeholder="admin@valiormotors.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </section>
          
          <section className="mb-6 text-left">
            <label className="body-medium-bold block mb-2 text-black">Contraseña</label>
            <input 
              type="password" 
              className="w-full p-3 rounded border border-gray-300 focus:border-[#d4af37] outline-none transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </section>

          {error && <p className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm font-bold border-l-4 border-red-500">{error}</p>}

          <button 
            type="submit" 
            className="w-full primary-bg text-white py-3 rounded body-normal-bold hover-primary-color transition-all cursor-pointer"
          >
            Iniciar Sesión
          </button>
          
          <p className="mt-6 text-center text-gray-600 body-small">
            ¿No tienes una cuenta de empleado? <Link to="/registro" className="text-[#d4af37] font-bold hover:underline">Regístrate aquí</Link>
          </p>
        </form>
      </section>
    </ContenedorGlobal>
  );
};

export default Login;
