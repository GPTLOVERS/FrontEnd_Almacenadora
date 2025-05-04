import { useNavigate } from 'react-router-dom'
import useGetBatch from '../../shared/hooks/useGetBatch'
import Navbar from '../navs/Navbar';
import "../../assets/style.css"

const DashboardBat = () => {
    const { batch, loading, error } = useGetBatch()
    const navigate = useNavigate()

    if (loading) return <p>Cargando lotes...</p>
    if (error) return <p>{error}</p>

    if (!batch) {
        return <p>No se pudo cargar la lista de lotes.</p>
    }

    return (
        <>
            <Navbar />
            <div className="list-container">
                <h1 className="list-title">Lotes</h1>
                <div className="items-list">
                    {batch.length === 0 ? (
                        <p className="empty-text">No hay lotes disponibles.</p>
                    ) : (
                        batch.map((batch, index) => (
                            <div className="item"  key={index}>
                                <h3 className="item-name">{batch.noBatch}</h3>
                                <p className="item-category">{batch.type}</p>
                                <button 
                                className="item-button"
                                onClick={() => navigate(`/batch/${batch.uid}`)}>
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

export default DashboardBat