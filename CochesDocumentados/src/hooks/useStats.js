import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export const useStats = () => {
  const fetched = useRef(false);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/coches/stats');
        setStats(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return { stats, loading, error };
};
