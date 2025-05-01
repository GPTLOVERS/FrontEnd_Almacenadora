import { useState, useCallback } from 'react';
import { getDowloadMovments } from '../../services/api';

const useDownloadMovements = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const download = useCallback(async (date) => {
        setLoading(true);
        setError(null);

        try {
            if (!date) {
                throw new Error('Debes proporcionar una fecha válida.');
            }
            const data = await getDowloadMovments(date);

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

export default useDownloadMovements;
