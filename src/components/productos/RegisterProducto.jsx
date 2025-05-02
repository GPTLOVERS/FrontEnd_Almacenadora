import React, { useState } from "react";
import {
    validateName,
    validateNameMessage,
    validatePrice,
    validatePriceMessage,
    validateStock,
    validateStockMessage,
    validateCategory,
    validateCategoryMessage,
} from "@/shared/validators";

// Nuevos validadores agregados temporalmente
const validateDescription = (val) => val.trim().length > 0;
const validateDescriptionMessage = "La descripción es obligatoria.";
const validateBrand = (val) => val.trim().length > 0;
const validateBrandMessage = "La marca es obligatoria.";

import Input from "@/components/settings/Input";
import { useRegisterProducto } from "@/shared/hooks/useRegisterProducto";
import { useUpdateProducto } from "@/shared/hooks/useUpdateProducto";
import { useLocation } from "react-router-dom";
import { Flex, Box, Stack, Button, Text } from "@chakra-ui/react";
import Navbar from "@/components/navs/Navbar";
import "@/pages/productos/dashboardProductos.css";

const initialFormState = {
    name: { value: "", isValid: false, showError: false },
    price: { value: "", isValid: false, showError: false },
    stock: { value: "", isValid: false, showError: false },
    category: { value: "", isValid: false, showError: false },
    description: { value: "", isValid: false, showError: false },
    brand: { value: "", isValid: false, showError: false },
};

export const RegisterProducto = () => {
    const location = useLocation();
    const producto = location.state;
    const esEdicion = Boolean(producto);

    const { register, isLoading } = useRegisterProducto();
    const { update, isLoadingUpdate } = useUpdateProducto();

    const [formState, setFormState] = useState(() => {
        if (esEdicion) {
            return {
                name: { value: producto.name || "", isValid: true, showError: false },
                price: { value: producto.price || "", isValid: true, showError: false },
                stock: { value: producto.stock || "", isValid: true, showError: false },
                category: { value: producto.category || "", isValid: true, showError: false },
                description: { value: producto.description || "", isValid: true, showError: false },
                brand: { value: producto.brand || "", isValid: true, showError: false },
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
            case "name":
                isValid = validateName(value);
                break;
            case "price":
                isValid = validatePrice(value);
                break;
            case "stock":
                isValid = validateStock(value);
                break;
            case "category":
                isValid = validateCategory(value);
                break;
            case "description":
                isValid = validateDescription(value);
                break;
            case "brand":
                isValid = validateBrand(value);
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
                await update(
                    formState.name.value,
                    formState.price.value,
                    formState.stock.value,
                    formState.category.value,
                    formState.description.value,
                    formState.brand.value,
                    producto.uid
                );
            } else {
                await register(
                    formState.name.value,
                    formState.price.value,
                    formState.stock.value,
                    formState.category.value,
                    formState.description.value,
                    formState.brand.value
                );
                setFormState(initialFormState);
            }
        } catch (error) {
            console.error("Error al guardar producto:", error);
        }
    };

    const isSubmitDisabled =
        isLoading || isLoadingUpdate ||
        !formState.name.isValid ||
        !formState.price.isValid ||
        !formState.stock.isValid ||
        !formState.category.isValid ||
        !formState.description.isValid ||
        !formState.brand.isValid;

    return (
        <>
            <Navbar />
            <Flex className="flex-container">
                <Stack className="stack-container">
                    <Stack className="heading-container">
                        <Text className="heading-title">
                            {esEdicion ? "Editar Producto" : "Registrar Producto"}
                        </Text>
                    </Stack>
                    <Box className="box-container">
                        <Stack className="form-stack">
                            <form onSubmit={handleSubmit}>
                                {Object.entries(formState).map(([field, state]) => (
                                    <Input
                                        key={field}
                                        field={field}
                                        label={field.charAt(0).toUpperCase() + field.slice(1)}
                                        value={state.value}
                                        onChangeHandler={handleInputValueChange}
                                        type={field === 'price' || field === 'stock' ? 'number' : 'text'}
                                        onBlurHandler={handleInputValidationOnBlur}
                                        showErrorMessage={state.showError}
                                        validationMessage={eval(`validate${field.charAt(0).toUpperCase() + field.slice(1)}Message`)}
                                        className="input-field"
                                    />
                                ))}
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
export default RegisterProducto;