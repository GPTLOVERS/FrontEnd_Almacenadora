import { useState } from "react";
import toast from "react-hot-toast";
import { registerBatch as registerRequest } from "../../services";

export const useRegisterBatch = () => {
    const [isLoading, setIsLoading] = useState(false);
    const registerBatch = async (noBatch, type, dateOfEntry, stockEntry) => {
        setIsLoading(true);
        try {
            const response = await registerRequest({
                noBatch,
                type,
                dateOfEntry,
                stockEntry
            });
            console.log(response);
            setIsLoading(false);
    
            if (response?.status >= 200 && response?.status < 300) {
                const { msg } = response.data || {};
    
                toast.success(msg || "Registro exitoso.");
            } else {
                const errorMsg = response?.data?.message || "Error al registrar el lote";
                toast.error(errorMsg);
            }
    
        } catch (error) {
            setIsLoading(false);
            toast.error("Ocurrió un error inesperado al registrar.");
            console.error("Error al registrar:", error);
        }
    }
    return{
        register: registerBatch,
        isLoading
    };
}