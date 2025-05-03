import { useState } from "react";
import toast from "react-hot-toast";
import { deleteProduct as deleteProductRequest } from "../../services/api";

export const useDeleteProduct = () => {
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);

    const deleteProduct = async (id) => {
        setIsLoadingDelete(true);
        try {
            const response = await deleteProductRequest(id);

            if (response?.status >= 200 && response?.status < 300) {
                toast.success("Producto eliminado exitosamente.");
            } else if (response?.error) {
                const msg = response?.e?.message || "Error al eliminar el producto.";
                toast.error(msg);
            } else {
                toast.error("Error inesperado al eliminar el producto.");
            }
        } catch (error) {
            toast.error("Ocurrió un error inesperado.");
            console.error("Error al eliminar producto:", error);
        } finally {
            setIsLoadingDelete(false);
        }
    };

    return {
        deleteProduct,
        isLoadingDelete,
    };
};

export default useDeleteProduct;
