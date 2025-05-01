import { useState, useCallback } from 'react';
import { getDowloadInventory } from '../../services/api';

const useDownloadInventory = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const download = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await getDowloadInventory();

            if (data.error) {
                throw new Error(data.message);
            }

            const url = data.data.url;

            if (url) {
                window.open(url, '_blank');
            } else {
                throw new Error('No se recibió una URL válida para la descarga.');
            }

        } catch (e) {
            setError(e.message || 'Error desconocido');
        } finally {
            setLoading(false);
        }
    }, []);

    return { loading, error, download };
};

export default useDownloadInventory;
