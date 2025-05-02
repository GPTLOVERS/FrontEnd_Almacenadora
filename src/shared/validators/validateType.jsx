export const validateType = (value) => {
    const regex = /^\S{1,25}$/

    return regex.test(value)
}
export const validateTypeMessage = 'El tipo debe contener entre 1 y 25 caracteres sin espacios'