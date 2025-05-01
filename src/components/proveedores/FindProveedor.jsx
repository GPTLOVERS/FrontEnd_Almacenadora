import React, { useState } from "react";
import {
    Box,
    Button,
    Flex,
    Stack,
    Text,
} from "@chakra-ui/react";
import Navbar from "../navs/Navbar";
import useGetProveedor from "../../shared/hooks/useGetProveedor";
import Input from "../settings/Input"; 
import "../../pages/proveedores/dashboardProveedores.css";
import { useNavigate } from "react-router-dom";

export const BuscarProveedor = () => {
    const [busqueda, setBusqueda] = useState("");
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const { data: proveedor, isLoading } = useGetProveedor(query);

    const handleBuscar = (e) => {
        e.preventDefault();
        if (!busqueda.trim()) return;
        setQuery(busqueda);
        navigate(`/proveedores/${busqueda}`);
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
                                <Input
                                    field="busqueda"
                                    label="Nombre o ID del proveedor"
                                    value={busqueda}
                                    onChangeHandler={(val) => setBusqueda(val)}
                                    type="text"
                                    showErrorMessage={false}
                                    validationMessage=""
                                    className="input-field"
                                />
                                <Button
                                    type="submit"
                                    className="sign-in-button"
                                    colorScheme="blue"
                                    isLoading={isLoading}
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
                    </Box>
                </Stack>
            </Flex>
        </>
    );
};

export default BuscarProveedor;
