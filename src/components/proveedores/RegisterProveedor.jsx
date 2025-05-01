import PropTypes from "prop-types";
import React, { useState } from "react";
import {
    validateName,
    validateNameMessage,
    validateEmail,
    validateEmailMessage,
    validatePhone,
    validatePhoneMessage,
    validateAdress,
    validateAdressMessage,
    validateCompany,
    validateCompanyMessage,
} from "../../shared/validators";
import Input from "../settings/Input";
import { useRegisterProveedor } from "../../shared/hooks/useRegisterProveedor";
import { Flex, Box, Stack, Button, Text } from "@chakra-ui/react";
import Navbar from "../navs/Navbar";
import "../../pages/proveedores/dashboardProveedores.css";

const initialFormState = {
    name: { value: "", isValid: false, showError: false },
    company: { value: "", isValid: false, showError: false },
    email: { value: "", isValid: false, showError: false },
    address: { value: "", isValid: false, showError: false },
    phone: { value: "", isValid: false, showError: false },
};

export const RegisterProveedor = () => {
    const { register, isLoading } = useRegisterProveedor();

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
            case "company":
                isValid = validateCompany(value);
                break;
            case "email":
                isValid = validateEmail(value);
                break;
            case "address":
                isValid = validateAdress(value);
                break;
            case "phone":
                isValid = validatePhone(value);
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
                formState.company.value,
                formState.email.value,
                formState.address.value,
                formState.phone.value
            );
            setFormState(initialFormState);
        } catch (error) {
            console.error("Error al registrar proveedor:", error);
        }
    };

    const isSubmitDisabled =
        isLoading ||
        !formState.name.isValid ||
        !formState.company.isValid ||
        !formState.address.isValid ||
        !formState.email.isValid ||
        !formState.phone.isValid;

    return (
        <>
        <Navbar/>
        <Flex className="flex-container">
            <Stack className="stack-container">
                <Stack className="heading-container">
                    <Text className="heading-title">Registrar Proveedor</Text>
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
                                field="company"
                                label="Compañía"
                                value={formState.company.value}
                                onChangeHandler={handleInputValueChange}
                                type="text"
                                onBlurHandler={handleInputValidationOnBlur}
                                showErrorMessage={formState.company.showError}
                                validationMessage={validateCompanyMessage}
                                className="input-field"
                            />
                            <Input
                                field="email"
                                label="Correo Electrónico"
                                value={formState.email.value}
                                onChangeHandler={handleInputValueChange}
                                type="email"
                                onBlurHandler={handleInputValidationOnBlur}
                                showErrorMessage={formState.email.showError}
                                validationMessage={validateEmailMessage}
                                className="input-field"
                            />
                            <Input
                                field="phone"
                                label="Teléfono"
                                value={formState.phone.value}
                                onChangeHandler={handleInputValueChange}
                                type="text"
                                onBlurHandler={handleInputValidationOnBlur}
                                showErrorMessage={formState.phone.showError}
                                validationMessage={validatePhoneMessage}
                                className="input-field"
                            />
                            <Input
                                field="address"
                                label="Dirección"
                                value={formState.address.value}
                                onChangeHandler={handleInputValueChange}
                                type="text"
                                onBlurHandler={handleInputValidationOnBlur}
                                showErrorMessage={formState.address.showError}
                                validationMessage={validateAdressMessage}
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

export default RegisterProveedor;
