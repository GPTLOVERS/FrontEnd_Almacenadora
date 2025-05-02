import { useState, useEffect } from "react";
import { getBatchById } from "../../services/api";

const useGetBatchById = (id) => {
    const [batch, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBatch = async () => {
            try {
                const response = await getBatchById(id);

                if (response.error || !response.success || !response.batch) {
                    throw new Error("No se encontró el Lote.");
                }

                setProducto(response.batch);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBatch();
    }, [id]);

    return { batch, loading, error };
};

export default useGetBatchById;
