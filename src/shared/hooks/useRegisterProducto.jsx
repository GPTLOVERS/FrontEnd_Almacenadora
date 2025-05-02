import { registerProducto as registerRequest } from "../../services";
import toast from "react-hot-toast";
import { useState } from "react";

export const useRegister = () => {
    const [isLoading, setIsLoading] = useState(false);

    const register = async (name, description, price, brand) => {
        setIsLoading(true);
        try {
            const response = await registerRequest({
                name,
                description,
                price,
                brand
            });
            console.log(response);  
            setIsLoading(false);
            if (response?.status >= 200 && response?.status < 300) {
                const { msg } = response.data || {};
    
                toast.success(msg || "Registro exitoso.");
            } else {
                const errorMsg = response?.data?.message || "Error al registrar el producto";
                toast.error(errorMsg);
            }
        } catch (error) {
            setIsLoading(false);
            toast.error("OcurriÃ³ un error inesperado al registrar.");
            console.error("Error al registrar:", error);
        }
    };

    return {
        register,
        isLoading
    };
};
export default useRegister;