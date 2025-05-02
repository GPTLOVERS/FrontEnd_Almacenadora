import { useNavigate } from 'react-router-dom'
import useGetBatch from '../../shared/hooks/useGetBatch'

const DashboardBat = () => {
    const { batch, loading, error } = useGetBatch()
    const navigate = useNavigate()

    if (loading) return <p>Cargando lotes...</p>
    if (error) return <p>{error}</p>

    if (!batch) {
        return <p>No se pudo cargar la lista de lotes.</p>
    }

    return (
        <div>
            <h1>Lotes</h1>
            <div className="batch-list">
                {batch.length === 0 ? (
                    <p>No hay lotes disponibles.</p>
                ) : (
                    batch.map((batch, index) => (
                        <div className="batch" key={index}>
                            <h3>{batch.noBatch}</h3>
                            <p>{batch.type}</p>
                            <button onClick={() => navigate(`/batch/${batch.uid}`)}>
                            Ver detalles
                        </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default DashboardBat