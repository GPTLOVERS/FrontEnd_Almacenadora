import React, { useState } from "react";
import PropTypes from "prop-types";
import Input from "../settings/Input";
import { useBuyProduct } from "../../shared/hooks/useBuyProduct";
import useProductos from "../../shared/hooks/useProductos";
import "../productos/producto.css"

import {
    Flex,
    Box,
    Stack,
    Button,
    Text,
    Select,
    Spinner,
} from "@chakra-ui/react";
import "../../pages/auth/loginPage.css";
import Navbar from "../navs/Navbar";

export const BuyProduct = ({ productId }) => {
    const { buy, isLoadingBuy } = useBuyProduct();
    const { productos, loading, error } = useProductos();

    const [formState, setFormState] = useState({
        issueNum: {
            value: "",
            isValid: false,
            showError: false,
        },
        productId: {
            value: productId || "",
            isValid: !!productId,
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

    const handleSelectChange = (e) => {
        const value = e.target.value;
        const isValid = value !== "";
        setFormState((prev) => ({
            ...prev,
            productId: {
                value,
                isValid,
                showError: !isValid,
            },
        }));
    };

    const handleBuy = async (e) => {
        e.preventDefault();
        console.log("Product ID:", formState.productId.value); // Muestra el ID del producto
        console.log("Issue Num:", formState.issueNum.value);
        await buy(formState.issueNum.value, formState.productId.value);
    };

    const isSubmitDisabled =
        isLoadingBuy || !formState.issueNum.isValid || !formState.productId.isValid;

    return (
        <>
            <Navbar />
            <div className="form-container">
                <h1 className="form-title">Comprar Producto</h1>
                <div className="form-stack">
                    <form onSubmit={handleBuy} className="form">
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

                        {loading ? (
                            <Spinner />
                        ) : (
                            <>
                                <label htmlFor="producto" className="form-label">Selecciona un producto</label>
                                <Select
                                    id="producto"
                                    placeholder="Selecciona un producto"
                                    value={formState.productId.value}
                                    onChange={handleSelectChange}
                                    isInvalid={formState.productId.showError}
                                    className="form-select"
                                >
                                    {productos.map((producto) => (
                                        <option key={producto.uid} value={producto.uid}>
                                            {producto.name} ({producto.stock})
                                        </option>
                                    ))}
                                </Select>
                            </>
                        )}

                        {error && <p className="text-error">{error}</p>}

                        <button
                            type="submit"
                            className="form-button"
                            disabled={isSubmitDisabled}
                        >
                            Confirmar Compra
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

BuyProduct.propTypes = {
    productId: PropTypes.string,
};

export default BuyProduct;
