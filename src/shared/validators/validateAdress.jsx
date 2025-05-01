export const validateAdress = (adress) => {
    const regex = /^.{3,45}$/;
    return regex.test(adress);
};

export const validateAdressMessage = 'La Dirección debe contener entre 3 y 45 caracteres';
