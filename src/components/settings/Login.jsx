import React, { useState } from "react";
import PropTypes from "prop-types";
import {
    validateEmail,
    validatePassword,
    validateEmailMessage,
    validatePasswordMessage,
} from "../../shared/validators";
import Input from "./Input";
import { useLogin } from "../../shared/hooks/useLogin";
import { Flex, Box, Stack, Button, Text, Checkbox } from "@chakra-ui/react";
import "../../pages/auth/loginPage.css";

export const Login = ({ switchAuthHandler }) => {
    const { login, isLoading } = useLogin();
    const [formState, setFormState] = useState({
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
            case "email":
                isValid = validateEmail(value);
                break;
            case "password":
                isValid = validatePassword(value);
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

    const handleLogin = (event) => {
        event.preventDefault();
        login(formState.email.value, formState.password.value);
    };

    const isSubmitDisabled =
        isLoading || !formState.email.isValid || !formState.password.isValid;

    return (
        <Flex className="flex-container">
            <Stack className="stack-container">
                <Stack className="heading-container">
                    <Text className="heading-title">Inicio de sesión</Text>
                </Stack>
                <Box className="box-container">
                    <Stack className="form-stack">
                        <form onSubmit={handleLogin}>
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
                            <Stack className="button-stack">
                                <Stack className="checkbox-container">
                                    <Checkbox className="checkbox">Recordarme</Checkbox>
                                    <Text className="forgot-password">Olvidé la contraseña</Text>
                                </Stack>
                                <Button
                                    className="sign-in-button"
                                    disabled={isSubmitDisabled}
                                    onClick={handleLogin}
                                >
                                    Iniciar Sesión
                                </Button>
                            </Stack>
                        </form>
                        <Text className="create-account" onClick={switchAuthHandler}>
                            ¿No tienes cuenta?, créala
                        </Text>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
};

Login.propTypes = {
    switchAuthHandler: PropTypes.func.isRequired,
};
