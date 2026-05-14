import { useRef, useEffect, useState } from "react";
import { getCoches } from "../services/cochesService";

export const useCoches = () => {
  const fetched = useRef(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    const fetchCoches = async () => {
      try {
        const res = await getCoches();
        setData(res);
      } catch (err) {
        setError(err.message || "Error al cargar los coches");
      } finally {
        setLoading(false);
      }
    };

    fetchCoches();
  }, []);

  return { data, loading, error };
};
