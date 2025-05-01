import React, { useState } from "react";
import Navbar from "../../components/navs/Navbar";
import { useReportImage } from "../../shared/hooks/useReportImage";

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
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
                <fieldset>
                    <legend>Tipo de reporte (elige uno):</legend>
                    <label>
                        <input
                            type="radio"
                            name="reportType"
                            value="productosMasVendidos"
                            checked={option === "productosMasVendidos"}
                            onChange={() => setOption("productosMasVendidos")}
                        />
                        Productos Más Vendidos
                    </label>
                    <br />
                    <label>
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

                <div style={{ marginTop: "1rem" }}>
                    <button onClick={handleGenerate} disabled={!option || loading}>
                        {imgsv ? "Actualizar" : "Generar"}
                    </button>
                </div>

                {loading && <p>Cargando gráfico...</p>}

                {errorMsg && (
                    <p style={{ color: "red", marginTop: "1rem" }}>{errorMsg}</p>
                )}

                {imgsv && !loading && (
                    <div style={{ marginTop: "1rem" }}>
                        <img
                            src={imgsv}
                            alt="Reporte dinámico"
                            style={{ maxWidth: "100%", height: "auto" }}
                        />
                    </div>
                )}
            </div>
        </>
    );
    
};

export default ImageOfReport;
