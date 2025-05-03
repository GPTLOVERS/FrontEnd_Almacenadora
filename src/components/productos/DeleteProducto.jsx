import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useProductos from "../../shared/hooks/useProductos";
import useDeleteProduct from "../../shared/hooks/useDeleteProduct";
import Navbar from "../navs/Navbar";

const DeleteProducto = () => {
  const { productos, loading, error } = useProductos();
  const { deleteProduct, isLoadingDelete } = useDeleteProduct();
  const [selectedProductId, setSelectedProductId] = useState("");
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!selectedProductId) {
      alert("Selecciona un producto para eliminar.");
      return;
    }

    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este producto?"
    );
    if (!confirmDelete) return;

    await deleteProduct(selectedProductId);
    alert("Producto eliminado correctamente.");
    navigate(0); 
  };

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  const productosActivos = productos.filter((p) => p.status !== false);

  return (
    <>
      <Navbar />
      <div>
        <h1>Eliminar Producto</h1>
        {productosActivos.length === 0 ? (
          <p>No hay productos disponibles para eliminar.</p>
        ) : (
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="producto-select">Selecciona un producto:</label>
            <select
              id="producto-select"
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              style={{ marginLeft: "0.5rem" }}
            >
              <option value="">-- Selecciona --</option>
              {productosActivos.map((producto) => (
                <option key={producto.uid} value={producto.uid}>
                  {producto.name} - ${producto.price}
                </option>
              ))}
            </select>
            <br />
            <button
              onClick={handleDelete}
              disabled={isLoadingDelete || !selectedProductId}
              style={{ marginTop: "1rem" }}
            >
              {isLoadingDelete ? "Eliminando..." : "Eliminar Producto"}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default DeleteProducto;
