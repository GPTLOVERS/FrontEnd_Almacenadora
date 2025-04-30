import { useState, useEffect } from "react";
import { getProveedorById } from "../../services/api";

const useGetProveedor = (id) => {
    const [proveedor, setProveedor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProveedor = async () => {
            try {
                const response = await getProveedorById(id);

                if (response.error || !response.success) {
                    throw new Error(response.message || "Error al obtener proveedor");
                }

                setProveedor(response.proveedor);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProveedor();
    }, [id]);

    return { proveedor, loading, error };
};

export default useGetProveedor;
