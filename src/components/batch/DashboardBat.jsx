import { useNavigate } from 'react-router-dom'
import { useBatch } from '../../shared/hooks/useBatch'

const DashboardBat = () => {
    const { batch, loading, error } = useBatch()
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
                    batch.map((bat, index) => (
                        <div className="batch" key={index}>
                            <h3>{bat.name}</h3>
                            <p>{bat.description}</p>
                            <button onClick={() => navigate(`/batch/${bat_id}`)}>
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