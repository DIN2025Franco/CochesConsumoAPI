import mongoose from 'mongoose';

const cocheSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    descripcionLarga: { type: String, required: true },
    precio: { type: String, required: true },
    categoria: { type: String, required: true },
    slogan: { type: String, required: true },
    imagen: { type: String, required: false },
}, {
    timestamps: true
});

const Coche = mongoose.model('Coche', cocheSchema);

export default Coche;
