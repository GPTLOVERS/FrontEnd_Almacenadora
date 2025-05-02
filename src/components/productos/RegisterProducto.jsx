import PropTypes from "prop-types";
import React, { useState } from "react";
import {
    validateName,
    validateNameMessage,
    validatePrice,
    validatePriceMessage,
    validateCategory,
    validateCategoryMessage,
    validateStock,
    validateStockMessage,
} from "../../shared/validators";
import Input from "../settings/Input";
import { useRegisterProducto } from "../../shared/hooks/useRegisterProducto.jsx";
import { Flex, Box, Stack, Button, Text } from "@chakra-ui/react";
import Navbar from "../navs/Navbar";
import "../../pages/productos/dashboardProductos.css";

const initialFormState = {
    name: { value: "", isValid: false, showError: false },
    price: { value: "", isValid: false, showError: false },
    category: { value: "", isValid: false, showError: false },
    stock: { value: "", isValid: false, showError: false },
};

export const RegisterProducto = () => {
    const { register, isLoading } = useRegisterProducto();

    const [formState, setFormState] = useState(initialFormState);

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
            case "category":
                isValid = validateCategory(value);
                break;
            case "stock":
                isValid = validateStock(value);
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

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            await register(
                formState.name.value,
                formState.price.value,
                formState.category.value,
                formState.stock.value
            );
            setFormState(initialFormState);
        } catch (error) {
            console.error("Error al registrar producto:", error);
        }
    };

    const isSubmitDisabled =
        isLoading ||
        !formState.name.isValid ||
        !formState.price.isValid ||
        !formState.category.isValid ||
        !formState.stock.isValid;

    return (
        <>
        <Navbar/>
        <Flex className="flex-container">
            <Stack className="stack-container">
                <Stack className="heading-container">
                    <Text className="heading-title">Registrar Producto</Text>
                </Stack>
                <Box className="box-container">
                    <Stack className="form-stack">
                        <form onSubmit={handleRegister}>
                            <Input
                                field="name"
                                label="Nombre"
                                value={formState.name.value}
                                onChangeHandler={handleInputValueChange}
                                type="text"
                                onBlurHandler={handleInputValidationOnBlur}
                                showErrorMessage={formState.name.showError}
                                validationMessage={validateNameMessage}
                                className="input-field"
                            />
                            <Input
                                field="price"
                                label="Precio"
                                value={formState.price.value}
                                onChangeHandler={handleInputValueChange}
                                type="number"
                                onBlurHandler={handleInputValidationOnBlur}
                                showErrorMessage={formState.price.showError}
                                validationMessage={validatePriceMessage}
                                className="input-field"
                            />
                            <Input
                                field="category"
                                label="Categoría"
                                value={formState.category.value}
                                onChangeHandler={handleInputValueChange}
                                type="text"
                                onBlurHandler={handleInputValidationOnBlur}
                                showErrorMessage={formState.category.showError}
                                validationMessage={validateCategoryMessage}
                                className="input-field"
                            />
                            <Input
                                field="stock"
                                label="Stock"
                                value={formState.stock.value}
                                onChangeHandler={handleInputValueChange}
                                type="number"
                                onBlurHandler={handleInputValidationOnBlur}
                                showErrorMessage={formState.stock.showError}
                                validationMessage={validateStockMessage}
                                className="input-field"
                            />
                            <Stack className="button-stack">
                                <Button
                                    className="sign-in-button"
                                    disabled={isSubmitDisabled}
                                    onClick={handleRegister}
                                >
                                    Registrar
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