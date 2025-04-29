export const validatePassword = (password) => {
    const regex = /^\S{6,20}$/

    return regex.test(password)
}

export const validatePasswordMessage = 'El password debe contener entre 6 y 12 caracteres sin espacios'

