export const validateDateOfEntry = (date) => {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    
    return regex.test(date);
}
export const validateDateOfEntryMessage = 'La fecha de entrada debe tener el formato dd/mm/yyyy';