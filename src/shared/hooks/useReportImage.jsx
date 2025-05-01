import { useState, useCallback } from "react";
import { reports } from "../../services";

export const useReportImage = () => {
    const [imgsv, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const fetchReport = useCallback(async (option) => {
        setLoading(true);
        setErrorMsg(null);
        try {
            const response = await reports(option);
            if (response.error) throw response.e;

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            setImageUrl(`${response.data.imgsv}`);
        } catch (e) {
            setErrorMsg(e.message || "Error desconocido");
            setImageUrl(null);
        } finally {
            setLoading(false);
        }
    }, []);

    return { imgsv, loading, errorMsg, fetchReport };
};
