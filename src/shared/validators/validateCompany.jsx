export const validateCompany = (company) => {
    const regex = /^\S{3,15}$/

    return regex.test(company)
}

export const validateCompanyMessage = 'La Compañia debe contener entre 3 y 15 caracteres sin espacios'