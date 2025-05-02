import { useState, useEffect } from "react";
import { getProductoById } from "../../services/api";

const useGetProducto = (id) => {
    const [product, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const response = await getProductoById(id);

                if (response.error || !response.success || !response.product?.length) {
                    throw new Error("No se encontró el producto.");
                }

                setProducto(response.product[0]);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducto();
    }, [id]);

    return { product, loading, error };
};

export default useGetProducto;
