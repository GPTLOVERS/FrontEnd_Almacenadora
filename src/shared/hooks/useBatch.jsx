import { useEffect, useState } from "react";
import { getBatch } from "../../services/api";

const useBatch = () => {
    const [batch, setBatch] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
        const fetchBatch = async () => {
            try {
                const response = await getBatch();
                if (response.error) {
                    throw new Error(response.message);
                }
                setBatch(response.batch);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBatch();

        const interval = setInterval(fetchBatch, 5000);

        return () => clearInterval(interval);
    }, []);

    return { batch, loading, error };
}

export default useBatch;