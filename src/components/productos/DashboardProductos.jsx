import React from 'react';
import { useNavigate } from 'react-router-dom';
import useProductos from '../../shared/hooks/useProductos';
import Navbar from '../navs/Navbar';
const DashboardProductos = () => {
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
            <div className="productos-container">
                <h1 className="productos-title">Productos</h1>
                <div className="productos-list">
                    {productos.length === 0 ? (
                        <p className="empty-text">No hay productos disponibles.</p>
                    ) : (
                        productos.map((producto, index) => (
                            <div className="producto" key={index}>
                                <h3 className="producto-name">{producto.name}</h3>
                                <p className="producto-price">${producto.price}</p>
                                <p className="producto-category">{producto.category}</p>
                                <button 
                                    className="producto-button" 
                                    onClick={() => navigate(`/productos/${producto.uid}`)}
                                >
                                    Ver detalles
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );    
};

export default DashboardProductos;
