import React, { useState } from "react";
import PropTypes from "prop-types";
import Input from "../settings/Input";
import { useBuyProduct } from "../../shared/hooks/useBuyProduct";
import { Flex, Box, Stack, Button, Text } from "@chakra-ui/react";
import "../../pages/auth/loginPage.css";
import Navbar from "../navs/Navbar";

export const BuyProduct = ({ productId }) => {
    const { buy, isLoadingBuy } = useBuyProduct();

    const [formState, setFormState] = useState({
        issueNum: {
            value: "",
            isValid: false,
            showError: false,
        },
        productId: {
            value: productId || "",
            isValid: true,
            showError: false,
        },
    });

    const handleInputValueChange = (value, field) => {
        setFormState((prev) => ({
            ...prev,
            [field]: {
                ...prev[field],
                value,
            },
        }));
    };

    const handleInputValidationOnBlur = (value, field) => {
        const isValid = value.trim() !== "" && !isNaN(Number(value)) && Number(value) > 0;
        setFormState((prev) => ({
            ...prev,
            [field]: {
                ...prev[field],
                isValid,
                showError: !isValid,
            },
        }));
    };

    const handleBuy = async (e) => {
        e.preventDefault();
        await buy(formState.issueNum.value, formState.productId.value);
    };

    const isSubmitDisabled = isLoadingBuy || !formState.issueNum.isValid;

    return (
        <>
        <Navbar/>
        <Flex className="flex-container">
            <Stack className="stack-container">
                <Stack className="heading-container">
                    <Text className="heading-title">Comprar Producto</Text>
                </Stack>
                <Box className="box-container">
                    <Stack className="form-stack">
                        <form onSubmit={handleBuy}>
                            <Input
                                field="issueNum"
                                label="Cantidad a Comprar"
                                value={formState.issueNum.value}
                                onChangeHandler={handleInputValueChange}
                                type="number"
                                onBlurHandler={handleInputValidationOnBlur}
                                showErrorMessage={formState.issueNum.showError}
                                validationMessage="Ingrese una cantidad válida"
                                className="input-field"
                            />
                            <Input
                                field="productId"
                                label="ID del Producto"
                                value={formState.productId.value}
                                onChangeHandler={handleInputValueChange}
                                type="text"
                                disabled
                                className="input-field"
                            />
                            <Stack className="button-stack">
                                <Button
                                    className="sign-in-button"
                                    disabled={isSubmitDisabled}
                                    onClick={handleBuy}
                                >
                                    Confirmar Compra
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

BuyProduct.propTypes = {
    productId: PropTypes.string.isRequired,
};

export default BuyProduct;
