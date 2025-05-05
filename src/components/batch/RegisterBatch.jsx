import { Box, Button, Flex, Stack, Text, Select } from '@chakra-ui/react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../../pages/batch/dashboardBatch.css';
import { useRegisterBatch } from '../../shared/hooks/useRegisterBatch';
import { useUpdateBatch } from '../../shared/hooks/useUpdateBatch';
import {
    validateNoBatch,
    validateNoBatchMessage,
    validateStockEntry,
    validateStockEntryMessage,
    validateType,
    validateTypeMessage,
} from '../../shared/validators';
import Navbar from '../navs/Navbar';
import Input from '../settings/Input';
import useProductos from '../../shared/hooks/useProductos';
import useProveedores from '../../shared/hooks/useProveedores';

const initialFormState = {
    noBatch: { value: '', isValid: false, showError: false },
    type: { value: '', isValid: false, showError: false },
    dateOfEntry: { value: '', isValid: true, showError: false },
    stockEntry: { value: '', isValid: false, showError: false },
    product: { value: '', isValid: false, showError: false },
    proveedor: { value: '', isValid: false, showError: false },
};

export const RegisterBatch = () => {
    const location = useLocation();
    const batch = location.state || {};
    const esEdicion = Boolean(location.state);

    const { register, isLoading } = useRegisterBatch();
    const { update, isLoadingUpdate } = useUpdateBatch();

    const { productos, loadingProductos } = useProductos();
    const { proveedores, loadingProveedores } = useProveedores();

    const [formState, setFormState] = useState(() => {
        if (esEdicion) {
            return {
                noBatch: { value: batch.noBatch || '', isValid: true, showError: false },
                type: { value: batch.type || '', isValid: true, showError: false },
                dateOfEntry: {
                    value: batch.dateOfEntry
                        ? new Date(batch.dateOfEntry).toISOString().slice(0, 10)
                        : '',
                    isValid: true,
                    showError: false,
                },
                stockEntry: { value: batch.stockEntry || '', isValid: true, showError: false },
                product: { value: batch.product?.id || '', isValid: true, showError: false },
                proveedor: { value: batch.proveedor?.id || '', isValid: true, showError: false },
            };
        }
        return initialFormState;
    });

    const handleInputValueChange = (value, field) => {
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                value,
            },
        }));
    };

    const handleInputValidationOnBlur = (value, field) => {
        let isValid = false;
        switch (field) {
            case 'noBatch':
                isValid = validateNoBatch(value);
                break;
            case 'type':
                isValid = validateType(value);
                break;
            case 'stockEntry':
                isValid = validateStockEntry(value);
                break;
            case 'product':
                isValid = !!value;
                break;
            default:
                isValid = true;
        }
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                isValid,
                showError: !isValid,
            },
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const noBatch = formState.noBatch.value;
            const type = formState.type.value;
            const stockEntry = formState.stockEntry.value;
            const product = formState.product.value;
            const proveedor = formState.proveedor.value;
            const dateOfEntry = formState.dateOfEntry.value;

            if (esEdicion) {
                await update(noBatch, type, stockEntry, product, proveedor, dateOfEntry, batch.id);
            } else {
                await register(noBatch, type, stockEntry, product, proveedor, dateOfEntry);
                setFormState(initialFormState);
            }
        } catch (error) {
            console.error('Error al guardar el lote:', error);
        }
    };

    return (
        <>
            <Navbar />
            <Flex className="flex-container">
                <Stack className="stack-container">
                    <Stack className="heading-container">
                        <Text className="heading-title">
                            {esEdicion ? 'Editar Lote' : 'Registrar Lote'}
                        </Text>
                    </Stack>
                    <Box className="box-container">
                        <Stack className="form-stack">
                            <form onSubmit={handleSubmit}>
                                <Input
                                    field="noBatch"
                                    label="Número de Lote"
                                    value={formState.noBatch.value}
                                    onChangeHandler={handleInputValueChange}
                                    type="text"
                                    onBlurHandler={handleInputValidationOnBlur}
                                    showErrorMessage={formState.noBatch.showError}
                                    validationMessage={validateNoBatchMessage}
                                    className="input-field"
                                />
                                <Input
                                    field="type"
                                    label="Tipo de Lote"
                                    value={formState.type.value}
                                    onChangeHandler={handleInputValueChange}
                                    type="text"
                                    onBlurHandler={handleInputValidationOnBlur}
                                    showErrorMessage={formState.type.showError}
                                    validationMessage={validateTypeMessage}
                                    className="input-field"
                                />
                                <Text mt={4} mb={1}>Ingresar producto:</Text>
                                <Select
                                    placeholder="Seleccionar producto"
                                    value={formState.product.value}
                                    onChange={(e) => handleInputValueChange(e.target.value, 'product')}
                                    onBlur={() => handleInputValidationOnBlur(formState.product.value, 'product')}
                                >
                                    {loadingProductos ? (
                                        <option disabled>Cargando productos...</option>
                                    ) : (
                                        productos.map((prod) => (
                                            <option key={prod.uid} value={prod.uid}>{prod.name}</option>
                                        ))
                                    )}
                                </Select>
                                <Text mt={4} mb={1}>Ingresar proveedor:</Text>
                                <Select
                                    placeholder="Seleccionar proveedor"
                                    value={formState.proveedor.value}
                                    onChange={(e) => handleInputValueChange(e.target.value, 'proveedor')}
                                    onBlur={() => handleInputValidationOnBlur(formState.proveedor.value, 'proveedor')}
                                >
                                    {loadingProveedores ? (
                                        <option disabled>Cargando proveedores...</option>
                                    ) : (
                                        proveedores.map((proveedor) => (
                                            <option key={proveedor.uid} value={proveedor.uid}>{proveedor.name}</option>
                                        ))
                                    )}
                                </Select>
                                <Input
                                    field="dateOfEntry"
                                    label="Fecha de Entrada"
                                    value={formState.dateOfEntry.value}
                                    onChangeHandler={handleInputValueChange}
                                    type="date"
                                    onBlurHandler={() => { }}
                                    showErrorMessage={false}
                                    className="input-field"
                                />
                                <Input
                                    field="stockEntry"
                                    label="Cantidad de Entrada"
                                    value={formState.stockEntry.value}
                                    onChangeHandler={handleInputValueChange}
                                    type="number"
                                    onBlurHandler={handleInputValidationOnBlur}
                                    showErrorMessage={formState.stockEntry.showError}
                                    validationMessage={validateStockEntryMessage}
                                    className="input-field"
                                />
                                <Flex justify="center" align="center">
                                    <Button
                                        type="submit"
                                        colorScheme="teal"
                                        size="lg"
                                        isLoading={isLoading || isLoadingUpdate}
                                        className="submit-button"
                                    >
                                        {esEdicion ? 'Actualizar Lote' : 'Registrar Lote'}
                                    </Button>
                                </Flex>
                            </form>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </>
    );
};

export default RegisterBatch;
