//import { useNavigate } from "react-router-dom";
import { registerProveedor as registerRequest } from "../../services";
import toast from "react-hot-toast";
import { useState } from "react";

export const useRegisterProveedor = () => {
    const [isLoading, setIsLoading] = useState(false);
    //const navigate = useNavigate();

    const registerProveedor = async (name, company, email, address, phone) => {
        setIsLoading(true);
        try {
            const response = await registerRequest({
                name,
                company,
                email,
                address,
                phone
            });
            console.log(response);  
            setIsLoading(false);
    
            if (response?.status >= 200 && response?.status < 300) {
                const { msg } = response.data || {};
    
                toast.success(msg || "Registro exitoso.");
                //navigate('/');
            } else {
                const errorMsg = response?.data?.message || "Error al registrar la cuenta";
                toast.error(errorMsg);
            }
    
        } catch (error) {
            setIsLoading(false);
            toast.error("Ocurrió un error inesperado al registrar.");
            console.error("Error al registrar:", error);
        }
    };

    return {
        register: registerProveedor,
        isLoading
    };
    
};
