    import { useState, useEffect } from 'react';
    import { getProveedor } from '../../services/api';

    const useProveedores = () => {
        const [proveedores, setProveedores] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);

        useEffect(() => {
            const fetchProveedores = async () => {
                try {
                    const response = await getProveedor();
                    if (response.error) {
                        throw new Error(response.message);
                    }
                    setProveedores(response.proveedores); 
                } catch (error) {
                    setError(error.message);
                } finally {
                    setLoading(false); 
                }
            };

            fetchProveedores();

            const interval = setInterval(fetchProveedores, 5000); 

            return () => clearInterval(interval);
        }, []);

        return { proveedores, loading, error };
    };

    export default useProveedores;
