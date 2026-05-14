import VehiculoForm from "./VehiculoForm.jsx";
import "../assets/styles/index.css";

export default {
  title: "Formularios/VehiculoForm",
  component: VehiculoForm,
  parameters: {
    docs: {
      description: {
        component:
          "Formulario controlado para dar de alta un vehículo en venta. Incluye validación, ayudas al usuario y selección de imagen.",
      },
    },
  },
};

/**
 * Historia base: formulario vacío
 * Representa el uso normal del componente
 */
export const Vacio = () => <VehiculoForm />;

/**
 * Historia de contexto real
 * Simula cómo se usaría dentro de un panel de administración
 */
export const EnPanelDeAdministracion = () => (
  <section>
    <VehiculoForm />
  </section>
);
