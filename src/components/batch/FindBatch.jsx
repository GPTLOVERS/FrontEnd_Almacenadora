import React, { useState } from "react";
import {
    Box,
    Button,
    Flex,
    Stack,
    Text,
} from "@chakra-ui/react";
import Navbar from "../navs/Navbar";
import useGetBatchById from "../../shared/hooks/useGetBatchById";
import Input from "../settings/Input";
import "../../pages/proveedores/dashboardProveedores.css";
import { useNavigate } from "react-router-dom";

export const FindBatch = () => {
    const [busqueda, setBusqueda] = useState("");
    const [query, setQuery] = useState("");
    const { batch, loading, error } = useGetBatchById(query);
    const navigate = useNavigate()

    const handleBuscar = (e) => {
        e.preventDefault();
        if (!busqueda.trim()) return;
        setQuery(busqueda);
    };

    return (
        <>
            <Navbar />
            <Flex className="flex-container">
                <Stack className="stack-container">
                    <Stack className="heading-container">
                        <Text className="heading-title">Buscar Lote</Text>
                    </Stack>
                    <Box className="box-container">
                        <form onSubmit={handleBuscar}>
                            <Stack spacing={4} className="form-stack">
                                <Input
                                    field="busqueda"
                                    label="ID del Lote"
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

                        {error && (
                            <Box mt={4}>
                                <Text color="red.500">{error}</Text>
                            </Box>
                        )}

                        {batch && !loading && (
                            navigate(`/batch/${batch.uid}`)
                        )}
                    </Box>
                </Stack>
            </Flex>
        </>
    );
};

export default FindBatch;
