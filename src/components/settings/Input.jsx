import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormLabel, Input as ChakraInput, Textarea, Text } from '@chakra-ui/react';

const Input = ({
    field,
    label,
    value,
    onChangeHandler,
    type,
    showErrorMessage,
    validationMessage,
    onBlurHandler,
    className, 
    textArea = false
}) => {
    const handleValueChange = (event) => {
        onChangeHandler(event.target.value, field);
    };

    const handleOnBlur = (event) => {
        onBlurHandler(event.target.value, field);
    };

    return (
        <FormControl id={field} isRequired>
            <FormLabel>{label}</FormLabel>
            {textArea ? (
                <Textarea
                    value={value}
                    onChange={handleValueChange}
                    onBlur={handleOnBlur}
                    rows={5}
                    className={className} // Cambiado de classname a className
                />
            ) : (
                <ChakraInput
                    type={type}
                    value={value}
                    onChange={handleValueChange}
                    onBlur={handleOnBlur}
                    className={className} // Cambiado de classname a className
                />
            )}
            {showErrorMessage && (
                <Text color="red.500" fontSize="sm" mt={1}>
                    {validationMessage}
                </Text>
            )}
        </FormControl>
    );
};

Input.propTypes = {
    field: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChangeHandler: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    showErrorMessage: PropTypes.bool.isRequired,
    validationMessage: PropTypes.string.isRequired,
    onBlurHandler: PropTypes.func.isRequired,
    className: PropTypes.string, 
    textArea: PropTypes.bool,
};

export default Input;
