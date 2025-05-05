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
import useGetBatch from "../../shared/hooks/useGetBatch";
// import "../../pages/proveedores/dashboardProveedores.css";
import { useNavigate } from "react-router-dom";
import "../../assets/style.css"


export const FindBatch = () => {
    const [selectedBatchId, setSelectedBatchId] = useState("");
    const navigate = useNavigate();
    const { batch: batches, loading, error } = useGetBatch();

    const handleBuscar = (e) => {
        e.preventDefault();

        if (!selectedBatchId || !/^[0-9a-fA-F]{24}$/.test(selectedBatchId)) {
            alert("Selecciona un lote válido.");
            return;
        }

        navigate(`/batch/${selectedBatchId}`);
    };

    return (
        <>
            <Navbar />
            <Flex className="flex-container">
                <Stack className="stack-container">
                    <Stack className="heading-container">
                        <Text className="form-title">Buscar Lote</Text>
                    </Stack>
                    <Box className="form-container">
                        <form onSubmit={handleBuscar}>
                            <Stack spacing={4} className="form-stack">
                                <Select
                                                                    className="form-select"

                                    placeholder="Selecciona un lote"
                                    value={selectedBatchId}
                                    onChange={(e) => setSelectedBatchId(e.target.value)}
                                    isDisabled={loading}
                                >
                                    {batches.map((batch) => (
                                        <option key={batch.uid} value={batch.uid}>
                                            Lote #{batch.noBatch} - {batch.dateOfEntry || "sin fecha"}
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

                        {error && (
                            <Box mt={4}>
                                <Text color="red.500">{error}</Text>
                            </Box>
                        )}
                    </Box>
                </Stack>
            </Flex>
        </>
    );
};

export default FindBatch;
