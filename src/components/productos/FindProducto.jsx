import React, { useState } from "react";
import {
    Box,
    Button,
    Flex,
    Stack,
    Text,
} from "@chakra-ui/react";
import Navbar from "../navs/Navbar";
import useGetProducto from "../../shared/hooks/useGetProducto";
import Input from "../../components/settings/Input"; 
import { useNavigate } from "react-router-dom";
import "../../pages/productos/dashboardProductos.css";

export const BuscarProducto = () => {
    const [busqueda, setBusqueda] = useState("");
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const { product, loading } = useGetProducto(query);

    const handleBuscar = (e) => {
        e.preventDefault();
        if (!busqueda.trim()) return;
        setQuery(busqueda);
        navigate(`/productos/${busqueda}`);
    };

    return (
        <>
            <Navbar />
            <Flex className="flex-container">
                <Stack className="stack-container">
                    <Stack className="heading-container">
                        <Text className="heading-title">Buscar Producto</Text>
                    </Stack>
                    <Box className="box-container">
                        <form onSubmit={handleBuscar}>
                            <Stack spacing={4} className="form-stack">
                                <Input
                                    field="busqueda"
                                    label="Nombre o ID del producto"
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
                                    isLoading={loading}
                                >
                                    Buscar
                                </Button>
                            </Stack>
                        </form>
                        {product && (
                            <Box mt={4}>
                                <Text fontWeight="bold">Resultado:</Text>
                                <pre>{JSON.stringify(product, null, 2)}</pre>
                            </Box>
                        )}
                    </Box>
                </Stack>
            </Flex>
        </>
    );
};

export default BuscarProducto;
