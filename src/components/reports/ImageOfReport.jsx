import React, { useState } from "react";
import Navbar from "../../components/navs/Navbar";
import { useReportImage } from "../../shared/hooks/useReportImage";
import "../../assets/style.css";



const ImageOfReport = () => {
    const [option, setOption] = useState("");
    const { imgsv, loading, errorMsg, fetchReport } = useReportImage();

    const handleGenerate = () => {
        if (option) {
            const optionObj = { [option]: true };
            fetchReport(optionObj);
        }
    };
    
    return (
        <>
            <Navbar />
            <div className="report-container">
                <fieldset className="form-fieldset">
                    <legend className="form-legend">Tipo de reporte (elige uno):</legend>
                    <label className="form-label">
                        <input
                            type="radio"
                            name="reportType"
                            value="productosMasVendidos"
                            checked={option === "productosMasVendidos"}
                            onChange={() => setOption("productosMasVendidos")}
                        />
                        Productos Más Vendidos
                    </label>
                    <label className="form-label">
                        <input
                            type="radio"
                            name="reportType"
                            value="actividadPorFecha"
                            checked={option === "actividadPorFecha"}
                            onChange={() => setOption("actividadPorFecha")}
                        />
                        Actividad por Fecha
                    </label>
                </fieldset>
    
                <div className="button-stack">
                    <button
                        onClick={handleGenerate}
                        disabled={!option || loading}
                        className="form-button"
                    >
                        {imgsv ? "Actualizar" : "Generar"}
                    </button>
                </div>
    
                {loading && <p className="form-loading">Cargando gráfico...</p>}
    
                {errorMsg && (
                    <p className="error-message">{errorMsg}</p>
                )}
    
                {imgsv && !loading && (
                    <div className="report-image-container">
                        <img
                            src={imgsv}
                            alt="Reporte dinámico"
                            className="report-image"
                        />
                    </div>
                )}
            </div>
        </>
    );
};    
export default ImageOfReport;
