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
                        <Text className="heading-title">Buscar Proveedor</Text>
                    </Stack>
                    <Box className="box-container">
                        <form onSubmit={handleBuscar}>
                            <Stack spacing={4} className="form-stack">
                                <Select
                                    placeholder="Selecciona un proveedor"
                                    value={selectedId}
                                    onChange={(e) => setSelectedId(e.target.value)}
                                    isDisabled={loadingProveedores}
                                >
                                    {proveedores.map((prov) => (
                                        <option key={prov._id} value={prov._id}>
                                            {prov.name} - {prov.nit}
                                        </option>
                                    ))}
                                </Select>
                                <Button
                                    type="submit"
                                    colorScheme="blue"
                                    isLoading={loading}
                                >
                                    Buscar
                                </Button>
                            </Stack>
                        </form>

                        {proveedor && (
                            <Box mt={4}>
                                <Text fontWeight="bold">Resultado:</Text>
                                <pre>{JSON.stringify(proveedor, null, 2)}</pre>
                            </Box>
                        )}

                        {error && (
                            <Text color="red.500" mt={2}>
                                {error}
                            </Text>
                        )}
                    </Box>
                </Stack>
            </Flex>
        </>
    );
};

export default BuscarProveedor;
