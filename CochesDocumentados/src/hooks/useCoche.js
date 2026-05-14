import { useState, useEffect, useRef } from "react";
import { getCocheById } from "../services/cochesService";

export const useCoche = (id) => {
  const fetched = useRef(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id || fetched.current) return;
    fetched.current = true;

    const fetchCoche = async () => {
      setLoading(true);
      try {
        const res = await getCocheById(id);
        setData(res);
      } catch (err) {
        setError(err.message || "Error al cargar el coche");
      } finally {
        setLoading(false);
      }
    };

    fetchCoche();
  }, [id]);

  return { data, loading, error };
};
