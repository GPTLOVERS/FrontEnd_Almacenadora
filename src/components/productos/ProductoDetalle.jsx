import React from "react";
import { useParams } from "react-router-dom";
import useGetProducto from "../../shared/hooks/useGetProducto.jsx";
import "./producto.css";
import Navbar from "../navs/Navbar";

const ProductoDetalle = () => {
    const { id } = useParams();
    const { product, loading, error } = useGetProducto(id);

    if (loading) return <p className="loading-text">Cargando detalles del producto...</p>;
    if (error) return <p className="error-text">{error}</p>;
    if (!product) return <p className="error-text">No se encontró el producto.</p>;

    return (
        <>  
        <Navbar/>
        <div className="producto-detalle-container">
            <h1 className="producto-title">Detalles del Producto</h1>
            <div className="producto-info">
                <h2 className="producto-name">{product.name}</h2>
                <p><strong>Precio:</strong> ${product.price}</p>
                <p><strong>Categoría:</strong> {product.category}</p>
                <p><strong>Stock:</strong> {product.stock}</p>
            </div>
        </div>
        </>
    );
};
export default ProductoDetalle;