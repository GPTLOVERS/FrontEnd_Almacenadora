import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useProductos from "../../shared/hooks/useProductos";
import useDeleteProduct from "../../shared/hooks/useDeleteProduct";
import Navbar from "../navs/Navbar";
import "../productos/producto.css"

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
      <div className="form-container">
        <h1 className="form-title">Eliminar Producto</h1>
        {productosActivos.length === 0 ? (
          <p className="form-empty">No hay productos disponibles para eliminar.</p>
        ) : (
          <div className="form-content">
            <label htmlFor="producto-select" className="form-label">
              Selecciona un producto:
            </label>
            <select
              id="producto-select"
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="form-select"
            >
              <option value="">-- Selecciona --</option>
              {productosActivos.map((producto) => (
                <option key={producto.uid} value={producto.uid}>
                  {producto.name} - ${producto.price}
                </option>
              ))}
            </select>
            <button
              onClick={handleDelete}
              disabled={isLoadingDelete || !selectedProductId}
              className="form-button"
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
