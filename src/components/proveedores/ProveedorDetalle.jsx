import React from "react";
import { useParams } from "react-router-dom";
import useGetProveedor from "../../shared/hooks/useGetProveedor";
import "../../assets/style.css"
import Navbar from "../navs/Navbar";

const ProveedorDetalle = () => {
    const { id } = useParams(); 
    const { proveedor, loading, error } = useGetProveedor(id);

    if (loading) return <p className="loading-text">Cargando detalles del proveedor...</p>;
    if (error) return <p className="error-text">{error}</p>;
    if (!proveedor) return <p className="error-text">No se encontró el proveedor.</p>;

    return (
        <>
            <Navbar />
            <div className="detail-container">
                <h1 className="detail-title">Detalles del Proveedor</h1>
                <div className="detail-info">
                    <h2 className="detail-name">{proveedor.name}</h2>
                    <p><strong>Compañía:</strong> {proveedor.company}</p>
                    <p><strong>Email:</strong> {proveedor.email}</p>
                    <p><strong>Teléfono:</strong> {proveedor.phone}</p>
                    <p><strong>Dirección:</strong> {proveedor.address}</p>
                </div>
    
                <h3 className="productos-title">Productos:</h3>
                <ul className="productos-list">
                    {proveedor.products.map((product, index) => (
                        <li className="producto" key={index}>{product}</li>
                    ))}
                </ul>
            </div>
        </>
    );
    
};

export default ProveedorDetalle;
