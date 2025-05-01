import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProveedores } from '../../shared/hooks';

const DashboardPro = () => {
    const { proveedores, loading, error } = useProveedores();
    const navigate = useNavigate();

    if (loading) return <p>Cargando proveedores...</p>;
    if (error) return <p>{error}</p>;

    if (!proveedores) {
        return <p>No se pudo cargar la lista de proveedores.</p>;
    }

    return (
        <div>
            <h1>Proveedores</h1>
            <div className="proveedores-list">
                {proveedores.length === 0 ? (
                    <p>No hay proveedores disponibles.</p>
                ) : (
                    proveedores.map((proveedor, index) => (
                        <div className="proveedor" key={index}>
                            <h3>{proveedor.name}</h3>
                            <p>{proveedor.company}</p> 
                            <button onClick={() => navigate(`/proveedores/${proveedor._id}`)}>
                            Ver detalles
                        </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default DashboardPro;
