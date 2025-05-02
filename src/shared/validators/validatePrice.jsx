export const validatePrice = (price) => {
    const regex = /^[0-9]+(\.[0-9]{1,2})?$/; // Permite números enteros o decimales con hasta 2 decimales
    return regex.test(price) && parseFloat(price) > 0; // Asegura que el precio sea mayor que 0
};

export const validatePriceMessage = "El precio debe ser un número mayor a 0 y puede tener hasta 2 decimales.";