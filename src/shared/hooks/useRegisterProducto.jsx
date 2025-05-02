import { registerProducto as registerRequest } from "../../services/api";
import toast from "react-hot-toast";
import { useState } from "react";

export const useRegisterProducto = () => {
    const [isLoading, setIsLoading] = useState(false);

    const registerProducto = async (name, price, stock, category, description, brand) => {
        setIsLoading(true);
        try {
            const response = await registerRequest({
                name,
                price,
                stock,
                category,
                description,
                brand,
            });
            console.log(response);
            setIsLoading(false);

            if (response?.status >= 200 && response?.status < 300) {
                const { msg } = response.data || {};
                toast.success(msg || "Producto registrado exitosamente.");
            } else {
                const errorMsg = response?.data?.message || "Error al registrar el producto.";
                toast.error(errorMsg);
            }
        } catch (error) {
            setIsLoading(false);
            toast.error("Ocurrió un error inesperado al registrar el producto.");
            console.error("Error al registrar producto:", error);
        }
    };

    return {
        register: registerProducto,
        isLoading,
    };
};

export default useRegisterProducto;
