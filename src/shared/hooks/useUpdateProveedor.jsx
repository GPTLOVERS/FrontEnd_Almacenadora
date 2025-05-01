import { updateProveedor as updateProveedorRequest } from "../../services";
import toast from "react-hot-toast";
import { useState } from "react";

export const useUpdateProveedor = () => {
    const [isLoadingUpdate, setIsLoading] = useState(false);

    const updateProveedor = async (name, company, email, address, phone, id) => {
        setIsLoading(true);
        try {
            const response = await updateProveedorRequest(
                {
                    name,
                    company,
                    email,
                    address,
                    phone,
                },
                id
            );

            console.log(response);  
            setIsLoading(false);

            if (response?.status >= 200 && response?.status < 300) {
                const { msg } = response.data || {};
                toast.success(msg || "Actualización exitosa.");
            } else {
                const errorMsg = response?.data?.message || "Error al actualizar la cuenta";
                toast.error(errorMsg);
            }

        } catch (error) {
            setIsLoading(false);
            toast.error("Ocurrió un error inesperado al actualizar.");
            console.error("Error al actualizar:", error);
        }
    };

    return {
        update: updateProveedor,
        isLoadingUpdate
    };
};
