import axios from 'axios';
import API_BASE_URL from '../config/api';

const API_URL = `${API_BASE_URL}/coches`;

export const createCoche = async (data) => {
  try {
    const res = await axios.post(API_URL, data);
    return res.data.data ?? res.data;
  } catch (error) {
    console.error("Error al crear el coche:", error);
    throw new Error(error.response?.data?.message || "No se pudo crear el coche.");
  }
};

export const getCoches = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data.data ?? [];
  } catch (error) {
    console.error("Error al obtener coches:", error);
    throw new Error(error.response?.data?.message || "No se pudo cargar la lista de coches.");
  }
};

export const getCocheById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    
    // Si la API devuelve el objeto directamente
    if (res.data && !res.data.data) {
        return res.data;
    }

    if (res.data.data && res.data.data.length > 0) {
      return res.data.data[0];
    }

    return null;
  } catch (error) {
    console.error(`Error al obtener el coche con id ${id}:`, error);
    throw new Error(error.response?.data?.message || "No se pudo obtener el coche.");
  }
};
