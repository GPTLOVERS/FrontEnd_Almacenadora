import React, { useState } from "react";
import PropTypes from "prop-types";
import { Flex, Box, Stack, Button, Text } from "@chakra-ui/react";
import useDownloadMovement from "../../shared/hooks/useDownloadMovements";
import "../../pages/auth/loginPage.css";
import Navbar from "../navs/Navbar";

export const Movements = () => {
    const { download, loading, error } = useDownloadMovement();
    const [selectedDate, setSelectedDate] = useState('');

    const formatDateToYYYYMMDD = (dateStr) => {
        const date = new Date(dateStr);
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        return `${yyyy}${mm}${dd}`;
    };

    const handleDownload = (event) => {
        event.preventDefault();
        if (selectedDate) {
            const formatted = formatDateToYYYYMMDD(selectedDate);
            download(formatted);
        }
    };

    return (
        <>
        <Navbar/>
        <Flex className="flex-container">
            <Stack className="stack-container">
                <Stack className="heading-container">
                    <Text className="heading-title">Generar Reporte de Movimientos</Text>
                </Stack>
                <Box className="box-container">
                    <Stack className="form-stack">
                        <form onSubmit={handleDownload}>
                            <label htmlFor="date">Selecciona una fecha:</label>
                            <input
                                type="date"
                                id="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="input-field"
                                required
                            />

                            <Stack className="button-stack" mt={4}>
                                <Button
                                    className="sign-in-button"
                                    type="submit"
                                    isDisabled={!selectedDate || loading}
                                >
                                    {loading ? 'Generando...' : 'Generar Reporte'}
                                </Button>
                                {error && <Text color="red.500">{error}</Text>}
                            </Stack>
                        </form>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
        </>
    );
};

