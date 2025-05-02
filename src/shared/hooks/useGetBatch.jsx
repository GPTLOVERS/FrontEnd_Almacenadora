import { useState, useEffect } from "react";
import { getBatches } from "../../services/api";

const useGetBatch = () => {
    const [batch, setBatch] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBatch = async () => {
            try {
                const response = await getBatches();

                if (!response.success) {
                    throw new Error(response.message || "Error al obtener los lotes");
                }

                setBatch(response.batch);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchBatch();
    }, []);

    return { batch, loading, error };
};

export default useGetBatch;
