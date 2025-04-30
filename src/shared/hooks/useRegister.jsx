import { useNavigate } from "react-router-dom";
import { register as registerRequest } from "../../services";
import toast from "react-hot-toast";
import { useState } from "react";

export const useRegister = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const register = async (name, surname, userName, email, password, phone) => {
        setIsLoading(true);
        try {
            const response = await registerRequest({
                name,
                surname,
                userName,
                email,
                password,
                phone
            });
            console.log(response);  
            setIsLoading(false);
    
            if (response?.status >= 200 && response?.status < 300) {
                const { userDetails, msg } = response.data || {};
    
                if (!userDetails) {
                    toast.error("Registro fallido: datos incompletos.");
                    return;
                }
    
                toast.success(msg || "Registro exitoso.");
                localStorage.setItem("user", JSON.stringify(userDetails));
                navigate('/');
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
        register,
        isLoading
    };
};
