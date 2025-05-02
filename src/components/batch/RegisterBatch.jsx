import { Box, Button, Flex, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../../pages/batch/dashboardBatch.css';
import { useRegisterBatch } from '../../shared/hooks/useRegisterBatch';
import { useUpdateBatch } from '../../shared/hooks/useUpdateBatch';
import {
    validateDateOfEntry,
    validateDateOfEntryMessage,
    validateNoBatch,
    validateNoBatchMessage,
    validateStockEntry,
    validateStockEntryMessage,
    validateType,
    validateTypeMessage,
} from '../../shared/validators';
import Navbar from '../navs/Navbar';
import Input from '../settings/Input';
const initialFormState = {
    noBatch: { value: '', isValid: false, showError: false },
    type: { value: '', isValid: false, showError: false },
    dateOfEntry: { value: '', isValid: false, showError: false },
    stockEntry: { value: '', isValid: false, showError: false },
};

export const RegisterBatch = () => {
    const location = useLocation();
    const batch = location.state || {};
    const esEdicion = Boolean(location.state);

    const { register, isLoading } = useRegisterBatch();
    const { update, isLoadingUpdate } = useUpdateBatch();

    const [formState, setFormState] = useState(() => {
        if (esEdicion) {
            return {
                noBatch: { value: batch.noBatch || '', isValid: true, showError: false },
                type: { value: batch.type || '', isValid: true, showError: false },
                dateOfEntry: { value: batch.dateOfEntry || '', isValid: true, showError: false },
                stockEntry: { value: batch.stockEntry || '', isValid: true, showError: false },
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
            case 'dateOfEntry':
                isValid = validateDateOfEntry(value);
                break;
            case 'stockEntry':
                isValid = validateStockEntry(value);
                break;
            default:
                break;
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
            if (esEdicion) {
                console.log('actualizando lote:', {
                    id: batch.id,
                    noBatch: formState.noBatch.value,
                    type: formState.type.value,
                    dateOfEntry: formState.dateOfEntry.value,
                    stockEntry: formState.stockEntry.value,
                });
                await update(
                    formState.noBatch.value,
                    formState.type.value,
                    formState.dateOfEntry.value,
                    formState.stockEntry.value,
                    batch.id
                );
            } else {
                await register(
                    formState.noBatch.value,
                    formState.type.value,
                    formState.dateOfEntry.value,
                    formState.stockEntry.value
                );
                setFormState(initialFormState);
            }
        } catch (error) {
            console.error('Error al guardar el lote:', error);
        }
    }
    const isSubmitDisabled =
        (isLoading || isLoadingUpdate) ||
        !formState.noBatch.isValid ||
        !formState.type.isValid ||
        !formState.dateOfEntry.isValid ||
        !formState.stockEntry.isValid;

    return (
        <>
            <Navbar />
            <Flex className="flex-container">
                <Stack className="stack-container">
                    <Stack className="heading-container">
                        <Text className="heading-title">
                            {esEdicion ? "Editar Lote" : "Registrar Lote"}
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
                                <Input
                                    field="dateOfEntry"
                                    label="Fecha de Entrada"
                                    value={formState.dateOfEntry.value}
                                    onChangeHandler={handleInputValueChange}
                                    type="date"
                                    onBlurHandler={handleInputValidationOnBlur}
                                    showErrorMessage={formState.dateOfEntry.showError}
                                    validationMessage={validateDateOfEntryMessage}
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
                                <Stack className="button-stack">
                                    <Button
                                        className="sign-in-button"
                                        disabled={isSubmitDisabled}
                                        onClick={handleSubmit}
                                    >
                                        {esEdicion ? "Guardar Cambios" : "Registrar"}
                                    </Button>
                                </Stack>
                            </form>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </>
    );
};

export default RegisterBatch