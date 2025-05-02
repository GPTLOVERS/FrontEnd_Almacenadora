export const validateNoBatch = (value) => {
    const regex = /^[0-9]+$/;

    return regex.test(value);
}
export const validateNoBatchMessage = 'El número de lote solo puede contener números';