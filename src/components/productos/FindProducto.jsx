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
import useGetProducto from "../../shared/hooks/useGetProducto";
import useProductos from "../../shared/hooks/useProductos";
import { useNavigate } from "react-router-dom";
import "../../pages/productos/dashboardProductos.css";

export const BuscarProducto = () => {
    const [selectedId, setSelectedId] = useState("");
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const { product, loading } = useGetProducto(query);
    const { productos, loading: loadingProductos } = useProductos();

    const handleBuscar = (e) => {
        e.preventDefault();
        if (!selectedId.trim()) return;
        setQuery(selectedId);
        navigate(`/productos/${selectedId}`);
    };

    const productosDisponibles = productos?.filter(p => p.status !== false) || [];

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
                                <Select
                                    placeholder="Selecciona un producto"
                                    value={selectedId}
                                    onChange={(e) => setSelectedId(e.target.value)}
                                    isDisabled={loadingProductos}
                                >
                                    {productosDisponibles.map((producto) => (
                                        <option key={producto.uid} value={producto.uid}>
                                            {producto.name} - ${producto.price}
                                        </option>
                                    ))}
                                </Select>
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
