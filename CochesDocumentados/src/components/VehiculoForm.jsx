import { useState } from "react";
import { useCreateCoche } from "../hooks/useCreateCoche.js";

export default function VehiculoForm() {
    const { performCreate, loading: creando, error: errorCrear } = useCreateCoche();
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

        if (errores[name]) {
            const nuevosErrores = { ...errores };
            delete nuevosErrores[name];
            setErrores(nuevosErrores);
        }

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

        if (!form.imagen)
            e.imagen = "Debes seleccionar una imagen";

        if (!form.extra.trim())
            e.extra = "Los detalles extra son obligatorios";

        setErrores(e);
        return Object.keys(e).length === 0;
    };

    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        const esValido = validar();

        if (!esValido) {
            if (!form.marca.trim()) {
                document.getElementById("marca").focus();
            } else if (!form.descripcion.trim()) {
                document.getElementById("descripcion").focus();
            } else if (!form.precio || Number(form.precio) <= 0) {
                document.getElementById("precio").focus();
            } else if (!form.imagen) {
                document.getElementById("imagen").focus();
            } else if (!form.extra.trim()) {
                document.getElementById("extra").focus();
            }
            return;
        }

        setEnviado(true);

        try {
            // Convertir imagen a Base64 para enviarla por JSON
            let imagenBase64 = "";
            if (form.imagen instanceof File) {
                const reader = new FileReader();
                imagenBase64 = await new Promise((resolve) => {
                    reader.onload = (e) => resolve(e.target.result);
                    reader.readAsDataURL(form.imagen);
                });
            }

            const dataToSend = {
                nombre: form.marca,
                descripcion: form.extra,
                descripcionLarga: form.descripcion,
                precio: form.precio.toString() + "€",
                categoria: "Vehículo",
                slogan: "Nuevo Vehículo Añadido",
                imagen: imagenBase64
            };

            await performCreate(dataToSend);

            alert("Vehículo añadido con éxito!");

            // Limpiar formulario
            setForm({ marca: "", descripcion: "", precio: "", imagen: null, extra: "" });
            setPreview(null);
        } catch (error) {
            console.error(error);
            alert("Hubo un error al guardar el vehículo.");
        } finally {
            setEnviado(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left mt-8 bg-gray-100 custom-shadow p-6 rounded" noValidate>
            <fieldset className="flex flex-col gap-6 border-none p-0 min-w-0">
                <legend className="sr-only">Detalles del Vehículo</legend>

                <section className="flex flex-col gap-1">
                    <label htmlFor="marca" className="body-medium-bold">Marca del Vehículo</label>
                    <input
                        id="marca"
                        name="marca"
                        value={form.marca}
                        onChange={handleChange}
                        required
                        tabIndex="1"
                        autoComplete="organization"
                        placeholder="Ej: Porsche 911"
                        aria-invalid={errores.marca ? "true" : "false"}
                        aria-describedby={errores.marca ? "marca-error" : undefined}
                        className="border border-primary rounded px-3 py-2"
                    />
                    {errores.marca && (
                        <span id="marca-error" className="body-small error-color" role="alert">{errores.marca}</span>
                    )}
                </section>

                <section className="flex flex-col gap-1">
                    <label htmlFor="descripcion" className="body-medium-bold">Descripción del Vehículo</label>
                    <textarea
                        id="descripcion"
                        name="descripcion"
                        value={form.descripcion}
                        onChange={handleChange}
                        required
                        tabIndex="2"
                        autoComplete="off"
                        placeholder="Ej: Vehículo en excelente estado, único dueño..."
                        aria-invalid={errores.descripcion ? "true" : "false"}
                        aria-describedby={errores.descripcion ? "descripcion-error" : undefined}
                        className="border border-primary rounded px-3 py-2 resize-none h-70"
                    />
                    {errores.descripcion && (
                        <span id="descripcion-error" className="body-small error-color" role="alert">
                            {errores.descripcion}
                        </span>
                    )}
                </section>
            </fieldset>

            <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4 border-none p-0 min-w-0">
                <legend className="sr-only">Precio y Multimedia</legend>

                <section className="flex flex-col gap-1">
                    <label htmlFor="precio" className="body-medium-bold">Precio (€)</label>
                    <input
                        id="precio"
                        type="number"
                        name="precio"
                        value={form.precio}
                        onChange={handleChange}
                        required
                        tabIndex="3"
                        autoComplete="off"
                        placeholder="Ej: 120000"
                        aria-invalid={errores.precio ? "true" : "false"}
                        aria-describedby={errores.precio ? "precio-error" : undefined}
                        className="border border-primary rounded px-3 py-2"
                    />
                    {errores.precio && (
                        <span id="precio-error" className="body-small error-color" role="alert">
                            {errores.precio}
                        </span>
                    )}
                </section>

                <section className="flex flex-col gap-1">
                    <label htmlFor="imagen" className="body-medium-bold">Imagen del vehículo</label>

                    <input
                        type="file"
                        name="imagen"
                        id="imagen"
                        accept="image/*"
                        onChange={handleChange}
                        className="hidden"
                        required
                        tabIndex="4"
                        aria-invalid={errores.imagen ? "true" : "false"}
                        aria-describedby={errores.imagen ? "imagen-error" : undefined}
                    />

                    <label
                        htmlFor="imagen"
                        tabIndex="5"
                        className="bg-black cursor-pointer text-white rounded px-4 py-2.5 text-center body-normal-bold hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                    >
                        {preview ? "Cambiar imagen" : "Seleccionar imagen"}
                    </label>

                    {errores.imagen && (
                        <span id="imagen-error" className="body-small error-color" role="alert">
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

            <fieldset className="flex flex-col gap-1 border-none p-0 min-w-0">
                <legend className="sr-only">Información Adicional</legend>
                <label htmlFor="extra" className="body-medium-bold">Detalles Extra</label>
                <textarea
                    id="extra"
                    name="extra"
                    value={form.extra}
                    onChange={handleChange}
                    required
                    tabIndex="6"
                    autoComplete="off"
                    placeholder="Ej: Color, extras, modificaciones..."
                    aria-invalid={errores.extra ? "true" : "false"}
                    aria-describedby={errores.extra ? "extra-error" : undefined}
                    className="border border-primary rounded px-3 py-2 resize-none h-50"
                />
                {errores.extra && (
                    <span id="extra-error" className="body-small error-color" role="alert">
                        {errores.extra}
                    </span>
                )}
            </fieldset>

            <button
                type="submit"
                tabIndex="7"
                disabled={enviado || Object.keys(errores).length > 0}
                className="primary-bg text-white py-2 rounded body-normal-bold hover-primary-color cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#d4af37] disabled:bg-gray-400"
            >
                <span className="mr-3">+</span>
                Poner a la venta
            </button>
        </form>
    );
}
