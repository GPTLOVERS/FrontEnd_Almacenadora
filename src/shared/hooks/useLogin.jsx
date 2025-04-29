import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { login as loginRequest } from "../../services";
import { useState } from "react";

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const login = async (email, password) => {
        setIsLoading(true);
        try {
            const response = await loginRequest({ email, password });
            setIsLoading(false);

            if (response.error) {
                const errorMsg = response.e?.response?.data?.msg || "Error al iniciar sesión"; 
                toast.error(errorMsg);
                return;
            }

            const successMsg = response.data?.msg || "Inicio de sesión exitoso";
            toast.success(successMsg);

            const { userDetails } = response.data;
            localStorage.setItem('user', JSON.stringify(userDetails));

            navigate("/");
        } catch (error) {
            setIsLoading(false);
            const catchErrorMsg = error.response?.data?.msg || "Error inesperado al iniciar sesión";
            toast.error(catchErrorMsg);
        }
    };

    return {
        login,
        isLoading,
    };
};
