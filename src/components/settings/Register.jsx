import PropTypes from "prop-types";
import React, { useState } from "react";
import {
    validateName,
    validateNameMessage,
    validateSurname,
    validateSurnameMessage,
    validateConfirmPassword,
    validateConfirmPasswordMessage,
    validateEmail,
    validateEmailMessage,
    validatePhone,
    validatePhoneMessage,
    validatePassword,
    validatePasswordMessage,
    validateUsername,
    validateUsernameMessage,
} from "../../shared/validators"
import Input from "./Input"
import { useRegister } from "../../shared/hooks/useRegister";
import { Flex, Box, Stack, Button, Text} from "@chakra-ui/react";
import "../../pages/auth/loginPage.css";

export const Register = ({ switchAuthHandler }) => {
    const { register, isLoading } = useRegister();

    const [formState, setFormState] = useState({
        name: {
            value: "",
            isValid: false,
            showError: false,
        },
        surname: {
            value: "",
            isValid: false,
            showError: false,
        },
        userName: {
            value: "",
            isValid: false,
            showError: false,
        },
        email: {
            value: "",
            isValid: false,
            showError: false,
        },
        password: {
            value: "",
            isValid: false,
            showError: false,
        },
        passwordConfirm: {
            value: "",
            isValid: false,
            showError: false,
        },
        phone: {
            value: "",
            isValid: false,
            showError: false,
        },
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
            case "surname":
                isValid = validateSurname(value);
                break;
            case "email":
                isValid = validateEmail(value);
                break;
            case "password":
                isValid = validatePassword(value);
                break;
            case "userName":
                isValid = validateUsername(value);
                break;
            case "phone":
                isValid = validatePhone(value);
                break;
            case "passwordConfirm":
                isValid = validateConfirmPassword(formState.password.value, value);
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

    const handleRegister = (event) => {
        event.preventDefault();
        register(
            formState.name.value,
            formState.surname.value,
            formState.userName.value,
            formState.email.value,
            formState.password.value,
            formState.phone.value
        );
    }

    const isSubmitDisabled =
        isLoading ||
        !formState.name.isValid ||
        !formState.surname.isValid ||
        !formState.userName.isValid ||
        !formState.email.isValid ||
        !formState.password.isValid ||
        !formState.passwordConfirm.isValid ||
        !formState.phone.isValid;

    return (
        <Flex className="flex-container">
            <Stack className="stack-container">
                <Stack className="heading-container">
                    <Text className="heading-title">Inicio de sesión</Text>
                </Stack>
                <Box className="box-container">
                    <Stack className="form-stack">
                        <form onSubmit={handleRegister}>
                            <Input
                                field="surname"
                                label="Apellido"
                                value={formState.surname.value}
                                onChangeHandler={handleInputValueChange}
                                type="text"
                                onBlurHandler={handleInputValidationOnBlur}
                                showErrorMessage={formState.surname.showError}
                                validationMessage={validateSurnameMessage}
                                className="input-field"
                            />
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
                                field="userName"
                                label="Nombre de Usuario"
                                value={formState.userName.value}
                                onChangeHandler={handleInputValueChange}
                                type="text"
                                onBlurHandler={handleInputValidationOnBlur}
                                showErrorMessage={formState.userName.showError}
                                validationMessage={validateUsernameMessage}
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
                                label="Telefono"
                                value={formState.phone.value}
                                onChangeHandler={handleInputValueChange}
                                type="text"
                                onBlurHandler={handleInputValidationOnBlur}
                                showErrorMessage={formState.phone.showError}
                                validationMessage={validatePhoneMessage}
                                className="input-field"
                            />
                            <Input
                                field="password"
                                label="Contraseña"
                                value={formState.password.value}
                                onChangeHandler={handleInputValueChange}
                                type="password"
                                onBlurHandler={handleInputValidationOnBlur}
                                showErrorMessage={formState.password.showError}
                                validationMessage={validatePasswordMessage}
                                className="input-field"
                            />
                            <Input
                                field="passwordConfirm"
                                label="Re-Ingrese Contraseña"
                                value={formState.passwordConfirm.value}
                                onChangeHandler={handleInputValueChange}
                                type="password"
                                onBlurHandler={handleInputValidationOnBlur}
                                showErrorMessage={formState.passwordConfirm.showError}
                                validationMessage={validateConfirmPasswordMessage}
                                className="input-field"
                            />
                            <Stack className="button-stack">
                                <Button
                                    className="sign-in-button"
                                    disabled={isSubmitDisabled}
                                    onClick={handleRegister}
                                >
                                    Registrarme
                                </Button>
                            </Stack>
                        </form>
                        <Text className="create-account" onClick={switchAuthHandler}>
                            ¿Ya tienes una cuenta?, Inicia Sesión
                        </Text>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}