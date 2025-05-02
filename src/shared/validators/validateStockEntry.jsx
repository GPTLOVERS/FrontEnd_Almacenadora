export const validateStockEntry = (stockEntry) => {
    const regex = /^[0-9]+$/;
    
    return regex.test(stockEntry);
};

export const validateStockEntryMessage = 'La entrada de stock debe contener solo números';