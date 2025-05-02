import React from 'react';
import { useNavigate } from 'react-router-dom';
import useProductos from '../../shared/hooks/useProductos';
import Navbar from '../navs/Navbar';
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
        <Navbar/>
        <div>
            <h1>Productos</h1>
            <div className="productos-list">
                {productos.length === 0 ? (
                    <p>No hay productos disponibles.</p>
                ) : (
                    productos.map((producto, index) => (
                        <div className="producto" key={index}>
                            <h3>{producto.name}</h3>
                            <p>${producto.price}</p>
                            <button onClick={() => navigate(`/productos/update/${producto.uid}`, { state: producto })}>
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

export default UpdateProducto;
