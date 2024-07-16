// Validación para nombres: solo permite letras
export const validateName = (name) => {
    const nameRegex = /^[a-zA-Z]+$/;
    return nameRegex.test(name);
};

// Validación para números de teléfono: debe tener exactamente 8 dígitos
export const validatePhone = (phone) => {
    const phoneRegex = /^\d{8}$/;
    return phoneRegex.test(phone);
};

// Validación para contraseñas: debe tener al menos 8 caracteres
export const validatePassword = (password) => {
    return password.length >= 8;
};
