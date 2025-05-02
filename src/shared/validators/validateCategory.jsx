export const validateCategory = (category) => {
    const regex = /^[a-zA-Z\s]{3,20}$/; // Solo letras y espacios, entre 3 y 20 caracteres
    return regex.test(category);
};

export const validateCategoryMessage = "La categoría debe contener entre 3 y 20 caracteres y solo letras.";