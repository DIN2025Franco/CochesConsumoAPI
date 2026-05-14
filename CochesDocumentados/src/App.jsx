import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import Admin from "./pages/Admin.jsx";
import ContenidoPrincipal from './pages/ContenidoPrincipal.jsx';
import CatalogoCoches from './pages/CatalogoCoches.jsx';
import ContenedorGlobal from "./components/ContenedorGlobal.jsx";
import CocheDetalles from "./pages/CocheDetalles.jsx";
import Login from "./pages/Login.jsx";
import Registro from "./pages/Registro.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route element={<ContenidoPrincipal />}>
          <Route path="/" element={<Home />} />
          <Route path="inicio" element={<Navigate to="/" />} />
          <Route path="catalogo" element={<CatalogoCoches />} />
          <Route path="login" element={<Login />} />
          <Route path="registro" element={<Registro />} />
          
          {/* Rutas Protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="admin" element={<Admin />} />
          </Route>

          <Route path="/coches/:index" element={<CocheDetalles />} />
        </Route>

        {/* Pagina 404 */}
        <Route
          path="*"
          element={
            <ContenedorGlobal titulo="404">
              <p>Ruta no encontrada</p>
            </ContenedorGlobal>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
