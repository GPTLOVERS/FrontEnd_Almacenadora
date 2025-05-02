import { updateProducto as updateProductoRequest } from "../../services";
import toast from "react-hot-toast";
import { useState } from "react";

export const useUpdateProducto = () => {
    const [isLoadingUpdate, setIsLoading] = useState(false);

    const updateProducto = async ({ name, price, stock, description, brand, id }) => {
        setIsLoading(true);
        try {
            const response = await updateProductoRequest(
                {
                    name,
                    price,
                    stock,
                    description,
                    brand
                },
                id
            );

            console.log(response);
            setIsLoading(false);

            if (response?.status >= 200 && response?.status < 300) {
                const { msg } = response.data || {};
                toast.success(msg || "Actualización exitosa.");
            } else {
                const errorMsg = response?.data?.message || "Error al actualizar el producto";
                toast.error(errorMsg);
            }

        } catch (error) {
            setIsLoading(false);
            toast.error("Ocurrió un error inesperado al actualizar.");
            console.error("Error al actualizar:", error);
        }
    };

    return {
        update: updateProducto,
        isLoadingUpdate
    };
};
