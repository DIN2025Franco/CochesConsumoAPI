import { useState } from "react";
import { createCoche } from "../services/cochesService";

export const useCreateCoche = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const performCreate = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await createCoche(data);
      return res;
    } catch (err) {
      setError(err.message || "Error al crear el coche");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { performCreate, loading, error };
};
