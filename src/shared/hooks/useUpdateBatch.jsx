import { useState } from "react";
import toast from "react-hot-toast";
import { updateBatch as updateBatchRequest } from "../../services/api";

export const useUpdateBatch = () => {
    const [isLoadingUpdate, setIsLoading] = useState(false);

    const updateBatch = async (noBatch, type, dateOfEntry, stockEntry, id) => {
        setIsLoading(true);
        try {
            const response = await updateBatchRequest(
                {
                    noBatch,
                    type,
                    dateOfEntry,
                    stockEntry
                },
                id
            );
            console.log(response);
            setIsLoading(false);

            if (response?.status >= 200 && response?.status < 300) {
                const { msg } = response.data || {};

                toast.success(msg || "Actualización exitosa.");
            } else {
                const errorMsg = response?.data?.message || "Error al actualizar el lote";
                toast.error(errorMsg);
            }

        } catch (error) {
            setIsLoading(false);
            toast.error("Ocurrió un error inesperado al actualizar.");
            console.error("Error al actualizar:", error);
        }
    };
    return {
        update: updateBatch,
        isLoadingUpdate
    };
}