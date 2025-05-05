import React from "react";
import { useParams } from "react-router-dom";
import useGetBatchById from "../../shared/hooks/useGetBatchById";
import Navbar from "../navs/Navbar";
import "../../assets/style.css"

const BatchDetalle = () => {
    const { id } = useParams();
    const { batch, loading, error } = useGetBatchById(id);

    if (loading) return <p className="loading-text">Cargando detalles del Lote...</p>;
    if (error) return <p className="error-text">{error}</p>;
    if (!batch) return <p className="error-text">No se encontró el Lote.</p>;

    return (
        <>
            <Navbar />
            <div className="detail-container">
                <h1 className="detail-title">Detalles del Lote</h1>
                <div className="detail-info">
                    <h2 className="detail-name">{`Número de Lote: ${batch.noBatch}`}</h2>
                    <p><strong>Tipo:</strong> {batch.type}</p>
                    <p><strong>Entrada:</strong> {new Date(batch.dateOfEntry).toLocaleDateString()}</p>
                    <p><strong>Stock de entrada:</strong> {batch.stockEntry}</p>
                    <p><strong>Producto ID:</strong> {batch.product}</p>
                    <p><strong>Proveedor ID:</strong> {batch.proveedor}</p>
                </div>
            </div>

        </>
    );
};

export default BatchDetalle;
