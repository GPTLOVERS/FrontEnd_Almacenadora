import { useState } from "react";
import toast from "react-hot-toast";
import { buyProduct as buyProductRequest } from "../../services/api";

export const useBuyProduct = () => {
    const [isLoadingBuy, setIsLoading] = useState(false);

    const buyProduct = async (issueNum, id) => {
        setIsLoading(true);
        try {
            const response = await buyProductRequest(
                { issueNum },
                id 
            );

            setIsLoading(false); 

            if (response?.status >= 200 && response?.status < 300) {
                const msg = response.data?.msg || "Emisión exitosa.";
                toast.success(msg);
            } else if (response?.error) {
                toast.error(response?.e?.message || "Error inesperado al emitir el producto.");
            } else {
                toast.error("Error inesperado al emitir el producto.");
            }
        } catch (error) {
            setIsLoading(false);
            toast.error("Ocurrió un error inesperado.");
            console.error("Error al emitir producto:", error);
        }
    };

    return {
        buy: buyProduct,
        isLoadingBuy,
    };
};

export default useBuyProduct;
