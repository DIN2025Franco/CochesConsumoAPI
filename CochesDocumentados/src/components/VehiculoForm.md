# Formulario de Vehículos (`VehiculoForm`)

## Descripción General

`VehiculoForm` es un **formulario controlado** diseñado para agregar vehículos a un listado de venta.  
Incluye validación de campos, previsualización de imagen, manejo de estado de envío y ayuda sensible al contexto.

Este formulario es útil para:

- Concesionarios online.
- Administradores de inventarios de vehículos.
- Aplicaciones de gestión.

---

## Campos del formulario

El formulario solicita la siguiente información:

| Campo            | Tipo      | Obligatorio | Descripción                                      |
|-----------------|-----------|------------|------------------------------------------------|
| Marca del vehículo | Texto     | Sí         | Marca o modelo del vehículo                     |
| Descripción      | Texto     | Sí         | Detalles y estado del vehículo                  |
| Precio (€)       | Número    | Sí         | Precio en euros, mayor que 0                    |
| Imagen           | Archivo   | Sí         | Imagen del vehículo, con vista previa           |
| Detalles extra   | Texto     | Sí         | Información adicional como color o extras       |

---

## Ayuda al usuario

El componente guía al usuario mediante:

- Placeholders explicativos en cada campo.
- Mensajes de error debajo de cada input cuando los datos son inválidos.
- Vista previa de la imagen seleccionada antes de enviar.
- Form vaceado tras el envío exitoso para evitar reenvíos accidentales.

