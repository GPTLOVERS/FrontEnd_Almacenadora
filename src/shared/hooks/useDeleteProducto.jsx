import { useState } from "react";
import { deleteProducto as deleteProductoAPI } from "../../services/api"; // Importa el método de la API

const useDeleteProducto = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const deleteProducto = async (id, onSuccess) => {
    setIsDeleting(true);
    setError(null);

    try {
      const result = await deleteProductoAPI(id); // Llama al método de la API
      if (result.error) {
        setError(result.message || "Error al eliminar el producto.");
        console.error("Error al eliminar el producto:", result.message);
      } else {
        console.log(`Producto con ID ${id} eliminado exitosamente.`);
        if (onSuccess) onSuccess(); // Ejecuta la función de éxito si se proporciona
      }
    } catch (error) {
      setError("Error en la solicitud de eliminación.");
      console.error("Error en la solicitud de eliminación:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteProducto, isDeleting, error };
};

export default useDeleteProducto;
