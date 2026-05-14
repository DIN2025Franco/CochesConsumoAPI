

/**
 * VehiculoForm - Controlled form component for vehicle listing
 * 
 * A React component that manages a controlled form for adding vehicles to a sales listing.
 * Handles form validation, image preview, and submission state management.
 * 
 * @component
 * @returns {React.ReactElement} A form with fields for vehicle brand, description, price, and image
 * 
 * @example
 * return (
 *   <VehiculoForm />
 * )
 * 
 * @state {Object} form - Form data object
 * @state {string} form.marca - Vehicle brand/model name
 * @state {string} form.descripcion - Vehicle description
 * @state {string} form.precio - Vehicle price in euros
 * @state {File|null} form.imagen - Selected image file
 * @state {string} form.extra - Additional vehicle details
 * 
 * @state {Object} errores - Validation errors object mapping field names to error messages
 * @state {string|null} preview - Image preview URL created from selected file
 * @state {boolean} enviado - Flag indicating if form has been submitted successfully
 * 
 * @function handleChange - Updates form state on input change, handles file input specially
 * @param {Event} e - Change event from input/textarea/file element
 * 
 * @function validar - Validates form fields and updates error state
 * @returns {boolean} True if all validations pass, false otherwise
 * 
 * @function handleSubmit - Handles form submission after validation
 * @param {Event} e - Form submit event
 */

import { useState } from "react";

export default function VehiculoForm() {
    const [form, setForm] = useState({
        marca: "",
        descripcion: "",
        precio: "",
        imagen: null,
        extra: "",
    });

    // Estado para errores de validación
    const [errores, setErrores] = useState({});
    const [preview, setPreview] = useState(null);
    const [enviado, setEnviado] = useState(false);

    // Maneja cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "imagen") {
            const file = files[0];
            setForm({ ...form, imagen: file });
            setPreview(file ? URL.createObjectURL(file) : null);
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    // Función de validación
    const validar = () => {
        const e = {};

        if (!form.marca.trim()) e.marca = "La marca es obligatoria";

        if (!form.descripcion.trim())
            e.descripcion = "La descripción es obligatoria";

        if (!form.precio) e.precio = "El precio es obligatorio";
        else if (Number(form.precio) <= 0)
            e.precio = "Debe ser mayor que 0";

        if (!form.imagen) e.imagen = "Debes seleccionar una imagen";

        if (!form.extra.trim())
            e.extra = "Los detalles extra son obligatorios";

        setErrores(e);
        return Object.keys(e).length === 0;
    };

    // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validar()) return;
        setEnviado(true);
        setForm({ marca: "", descripcion: "", precio: "", imagen: null, extra: "" });
        setPreview(null);
    };

    return (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left mt-8 bg-gray-100 custom-shadow p-6 rounded">
                <fieldset className="flex flex-col gap-1">
                    <label className="body-medium-bold">Marca del Vehículo</label>
                    <input
                        name="marca"
                        value={form.marca}
                        onChange={handleChange}
                        disabled={enviado}
                        placeholder="Ej: Porsche 911"
                        className="border border-primary rounded px-3 py-2"
                    />
                    {errores.marca && (
                        <span className="body-small error-color">{errores.marca}</span>
                    )}
                </fieldset>

                <fieldset className="flex flex-col gap-1">
                    <label className="body-medium-bold">Descripción del Vehículo</label>
                    <textarea
                        name="descripcion"
                        value={form.descripcion}
                        onChange={handleChange}
                        disabled={enviado}
                        placeholder="Ej: Vehículo en excelente estado, único dueño..."
                        className="border border-primary rounded px-3 py-2 resize-none h-70"
                    />
                    {errores.descripcion && (
                        <span className="body-small error-color">
                            {errores.descripcion}
                        </span>
                    )}
                </fieldset>

                <fieldset className="grid grid-cols-2 gap-4">
                    <section className="flex flex-col gap-1">
                        <label className="body-medium-bold">Precio (€)</label>
                        <input
                            type="number"
                            name="precio"
                            value={form.precio}
                            onChange={handleChange}
                            disabled={enviado}
                            placeholder="Ej: 120000"
                            className="border border-primary rounded px-3 py-2"
                        />
                        {errores.precio && (
                            <span className="body-small error-color">
                                {errores.precio}
                            </span>
                        )}
                    </section>

                    <section className="flex flex-col gap-1">
                        <label className="body-medium-bold">Imagen del vehículo</label>

                        <input
                            type="file"
                            name="imagen"
                            id="imagen"
                            accept="image/*"
                            onChange={handleChange}
                            className="hidden"
                            disabled={enviado}
                        />

                        <label
                            htmlFor="imagen"
                            className="bg-black cursor-pointer text-white rounded px-4 py-2.5 text-center body-normal-bold hover:opacity-90"
                        >
                            {preview ? "Cambiar imagen" : "Seleccionar imagen"}
                        </label>

                        {errores.imagen && (
                            <span className="body-small error-color">
                                {errores.imagen}
                            </span>
                        )}

                        {preview && (
                            <img
                                src={preview}
                                alt="Vista previa del vehículo"
                                className="w-full max-h-50 md:min-h-80 md:max-h-80 rounded border object-cover"
                            />
                        )}
                    </section>
                </fieldset>

                <fieldset className="flex flex-col gap-1">
                    <label className="body-medium-bold">Detalles Extra</label>
                    <textarea
                        name="extra"
                        value={form.extra}
                        onChange={handleChange}
                        disabled={enviado}
                        placeholder="Ej: Color, extras, modificaciones..."
                        className="border border-primary rounded px-3 py-2 resize-none h-50"
                    />
                    {errores.extra && (
                        <span className="body-small error-color">
                            {errores.extra}
                        </span>
                    )}
                </fieldset>

                <button
                    type="submit"
                    disabled={enviado}
                    className="primary-bg text-white py-2 rounded body-normal-bold hover-primary-color cursor-pointer"
                >
                    <span className="mr-3">+</span>
                    Poner a la venta
                </button>
            </form>
    );
}
