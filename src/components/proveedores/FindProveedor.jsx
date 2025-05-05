import React, { useState } from "react";
import {
    Box,
    Button,
    Flex,
    Stack,
    Text,
    Select,
} from "@chakra-ui/react";
import Navbar from "../navs/Navbar";
import useGetProveedor from "../../shared/hooks/useGetProveedor";
import useProveedores from "../../shared/hooks/useProveedores"; // hook para llenar combo
import { useNavigate } from "react-router-dom";
import "../../assets/style.css"

export const BuscarProveedor = () => {
    const [selectedId, setSelectedId] = useState("");
    const navigate = useNavigate();
    const { data: proveedor, loading, error } = useGetProveedor(selectedId);
    const { proveedores, loading: loadingProveedores } = useProveedores();

    const handleBuscar = (e) => {
        e.preventDefault();

        if (!selectedId || !/^[0-9a-fA-F]{24}$/.test(selectedId)) {
            alert("Selecciona un proveedor válido.");
            return;
        }

        navigate(`/proveedores/${selectedId}`);
    };

    return (
        <>
            <Navbar />
            <Flex className="flex-container">
                <Stack className="stack-container">
                    <Stack className="heading-container">
                        <Text className="form-title">Buscar Proveedor</Text>
                    </Stack>
                    <Box className="form-container">
                        <form onSubmit={handleBuscar} className="form">
                            <Stack className="form-stack">
                                <label className="form-label">Proveedor</label>
                                <select
                                    className="form-select"
                                    value={selectedId}
                                    onChange={(e) => setSelectedId(e.target.value)}
                                    disabled={loadingProveedores}
                                >
                                    <option value="">Selecciona un proveedor</option>
                                    {proveedores.map((prov) => (
                                        <option key={prov._id} value={prov._id}>
                                            {prov.name} - {prov.nit}
                                        </option>
                                    ))}
                                </select>
    
                                <Stack className="button-stack">
                                    <button
                                        type="submit"
                                        className="form-button"
                                        disabled={loading}
                                    >
                                        {loading ? "Buscando..." : "Buscar"}
                                    </button>
                                </Stack>
                            </Stack>
                        </form>
    
                        {proveedor && (
                            <Box mt={4}>
                                <Text fontWeight="bold">Resultado:</Text>
                                <pre >{JSON.stringify(proveedor, null, 2)}</pre>
                            </Box>
                        )}
                    </Box>
                </Stack>
            </Flex>
        </>
    );
};    

export default BuscarProveedor;
