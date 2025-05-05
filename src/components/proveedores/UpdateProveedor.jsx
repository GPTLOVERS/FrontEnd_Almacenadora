import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProveedores } from '../../shared/hooks';
import Navbar from '../navs/Navbar';
import "../../assets/style.css"

const UpdateProveedor = () => {
    const { proveedores, loading, error } = useProveedores();
    const navigate = useNavigate();

    if (loading) return <p>Cargando proveedores...</p>;
    if (error) return <p>{error}</p>;

    if (!proveedores) {
        return <p>No se pudo cargar la lista de proveedores.</p>;
    }

    return (
        <>
            <Navbar />
            <div className="list-container">
                <h1 className="list-title">Proveedores</h1>
                <div className="items-list">
                    {proveedores.length === 0 ? (
                        <p className="empty-text">No hay proveedores disponibles.</p>
                    ) : (
                        proveedores.map((proveedor, index) => (
                            <div className="item" key={index}>
                                <h3 className="item-name">{proveedor.name}</h3>
                                <p className="item-category">{proveedor.company}</p>
                                <button
                                    className="item-button"
                                    onClick={() =>
                                        navigate(`/proveedores/update/${proveedor._id}`, {
                                            state: proveedor,
                                        })
                                    }
                                >
                                    Editar Proveedor
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default UpdateProveedor;
