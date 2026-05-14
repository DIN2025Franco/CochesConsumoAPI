// Obtener todos los coches
export async function getAllCoches(req, res, next) {
    try {
        const Coche = req.context.models.Coche;
        const coches = await Coche.find();
        return res.status(200).json({ data: coches }); 
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Error al obtener los coches" });
    }
}
  
// Obtener un coche específico por ID
export async function getOneCoche(req, res, next) {
    const { cocheId } = req.params;
    try {
        const Coche = req.context.models.Coche;
        if (!req.context.ObjectId.isValid(cocheId)) {
            const error = new Error(`ID ${cocheId} no es válido`);
            error.status = 400;
            return next(error);
        }
  
        const myId = new req.context.ObjectId(cocheId);
        const coche = await Coche.findOne({
            _id: myId,
        });
  
        if (!coche) {
            const error = new Error(`Coche con ID ${cocheId} no encontrado`);
            error.status = 404;
            return next(error);
        }
  
        return res.status(200).json(coche); 
    } catch (er) {
        const error = new Error(
            `Error al obtener el coche con ID ${cocheId} desde la base de datos`
        );
        error.status = 500;
        return next(error);
    }
}
  
// Agregar un nuevo coche
export async function postOneCoche(req, res, next) {
    try {
        const Coche = req.context.models.Coche;
        const { nombre, descripcion, descripcionLarga, precio, categoria, slogan, imagen } = req.body;

        if (!nombre || !descripcion || !precio || !categoria || !slogan || !descripcionLarga) {
            const error = new Error(`Faltan propiedades obligatorias`);
            error.status = 400;
            return next(error);
        }
    
        // Crear el nuevo coche
        const newCoche = new Coche({ 
            nombre, 
            descripcion, 
            descripcionLarga,
            precio, 
            categoria, 
            slogan,
            imagen: imagen || '' 
        });
        
        const savedCoche = await newCoche.save();
  
        // Validar si la inserción fue exitosa
        if (!savedCoche) {
            const error = new Error('Error al guardar el coche');
            error.status = 500;
            return next(error);
        }
  
        return res.status(201).json({ message: "Coche creado", savedCoche });
    } catch (er) {
        const error = new Error('Error al agregar el coche a la base de datos');
        error.status = 500;
        return next(error);
    }
}
  
// Eliminar un coche por ID
export async function deleteOneCoche(req, res, next) {
    const { cocheId } = req.params;

    try {
        const Coche = req.context.models.Coche;
        if (!req.context.ObjectId.isValid(cocheId)) {
            const error = new Error(`ID ${cocheId} no es válido`);
            error.status = 400;
            return next(error);
        }
        const myId = new req.context.ObjectId(cocheId);
        
        // Buscar y eliminar el coche
        const deletedCoche = await Coche.deleteOne({
            _id: myId,
        });
  
        if (deletedCoche.deletedCount === 0) {
            const error = new Error(`Coche con ID ${cocheId} no encontrado`);
            error.status = 404;
            return next(error);
        } else {
            const coches = await Coche.find();
            return res.status(200).json({ message: `Coche con ID ${cocheId} eliminado.`, data: coches }); 
        }
  
    } catch (er) {
        const error = new Error(`Error al eliminar el coche de la base de datos con ID ${cocheId}`);
        error.status = 500;
        return next(error);
    }
}

// Informe para el dashboard
export async function getStats(req, res, next) {
    try {
        const Coche = req.context.models.Coche;
        const coches = await Coche.find();

        const totalVehiculos = coches.length;
        
        // Sumar todos los precios
        let sumaTotal = 0;
        coches.forEach(c => {
            const num = parseFloat(c.precio.replace(/[^\d.]/g, '')) || 0;
            sumaTotal += num;
        });

        const precioMedio = totalVehiculos > 0 ? (sumaTotal / totalVehiculos) : 0;

        res.status(200).json({
            totalVehiculos,
            valorTotal: sumaTotal.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }),
            precioMedio: precioMedio.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }),
            categorias: [...new Set(coches.map(c => c.categoria))].length
        });
    } catch (error) {
        next(error);
    }
}
