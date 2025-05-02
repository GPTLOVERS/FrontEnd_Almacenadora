import { useState, useEffect } from "react";
import { getProductos } from "../../services/api";

const useProductos = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await getProductos();

                if (!response.success) {
                    throw new Error(response.message || "Error al obtener productos");
                }

                setProductos(response.product); // ✅ CORREGIDO
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProductos();
    }, []);

    return { productos, loading, error }; // ✅ usa 'productos'
};

export default useProductos;
