// useFetchData.js
// hooks/useFetchData.js
import axios from "axios";
import { useEffect, useState } from "react";

/**
 * Generic data-fetching hook
 * @param {string} apiEndpoint - Full or relative API URL
 * @returns {{ data: Array, loading: boolean, error: any }}
 */
export default function useFetchData(apiEndpoint) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Reset state when endpoint changes
    setLoading(true);
    setError(null);
    setData([]);

    if (!apiEndpoint) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const res = await axios.get(apiEndpoint);
        setData(res.data || []);
      } catch (err) {
        console.error("useFetchData error:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiEndpoint]);

  return { data, loading, error };
}
