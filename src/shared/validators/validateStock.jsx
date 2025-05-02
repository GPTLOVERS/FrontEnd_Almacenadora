export const validateStock = (stock) => {
    const regex = /^[0-9]+$/; // Permite solo números enteros positivos
    return regex.test(stock) && parseInt(stock, 10) >= 0; // Asegura que el stock sea mayor o igual a 0
};

export const validateStockMessage = "El stock debe ser un número entero mayor o igual a 0.";