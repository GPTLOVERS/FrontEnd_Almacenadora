import React from "react";
import { useNavigate } from "react-router-dom";
import useProductos from "../../shared/hooks/useProductos";
import useDeleteProducto from "../../shared/hooks/useDeleteProducto";
import Navbar from "../navs/Navbar";

const DeleteProducto = () => {
  const { productos, loading, error, setProductos } = useProductos();
  const { deleteProducto } = useDeleteProducto();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    console.log("ID recibido para eliminar:", id);
    if (!id) {
      alert("Error: ID del producto no definido.");
      return;
    }

    const confirmDelete = window.confirm(
      "¿Estás seguro de eliminar este producto?"
    );
    if (!confirmDelete) return;

    await deleteProducto(id, () => {
      setProductos((prevProductos) =>
        prevProductos.map((producto) =>
          producto.uid === id ? { ...producto, status: false } : producto
        )
      );
      alert("Producto eliminado correctamente.");
    });
  };

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  if (!productos || productos.length === 0) {
    return (
      <>
        <Navbar />
        <div>
          <h1>No hay productos disponibles.</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div>
        <h1>Eliminar Productos</h1>
        <div className="productos-list">
          {productos.filter((p) => p.status !== false).length === 0 ? (
            <p>No hay productos disponibles.</p>
          ) : (
            productos
              .filter((producto) => producto.status !== false)
              .map((producto, index) => (
                <div className="producto" key={index}>
                  <h3>{producto.name}</h3>
                  <p>${producto.price}</p>
                  <button
                    onClick={() => {
                      console.log("Eliminando:", producto);
                      handleDelete(producto.uid);
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              ))
          )}
        </div>
      </div>
    </>
  );
};

export default DeleteProducto;
