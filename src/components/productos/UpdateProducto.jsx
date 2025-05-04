import React from 'react';
import { useNavigate } from 'react-router-dom';
import useProductos from '../../shared/hooks/useProductos';
import Navbar from '../navs/Navbar';
import "../../assets/style.css"

const UpdateProducto = () => {
    const { productos, loading, error } = useProductos();
    const navigate = useNavigate();

    if (loading) return <p>Cargando productos...</p>;
    if (error) return <p>{error}</p>;

    if (!productos) {
        return <p>No se pudo cargar la lista de productos.</p>;
    }

    return (
        <>
          <Navbar />
          <div className="list-container">
            <h1 className="list-title">Productos</h1>
            <div className="items-list">
              {productos.length === 0 ? (
                <p className="empty-text">No hay productos disponibles.</p>
              ) : (
                productos.map((producto, index) => (
                  <div className="item" key={index}>
                    <h3 className="item-name">{producto.name}</h3>
                    <p className="item-price">${producto.price}</p>
                    <p className="item-category">{producto.category}</p>
                    <button 
                      onClick={() => navigate(`/productos/update/${producto.uid}`, { state: producto })} 
                      className="item-button">
                      Editar Producto
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      );         
};    

export default UpdateProducto;