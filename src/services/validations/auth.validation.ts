const authValidation = {
  validateUser: (username: string) => {
    if (username.length < 3) {
      return {
        success: false,
        message: 'El usuario debe tener al menos 3 caracteres',
      };
    }
    if (username.length > 20) {
      return {
        success: false,
        message: 'El usuario debe tener menos de 20 caracteres',
      };
    }
    return { success: true, message: '' };
  },

  validatePassword: (password: string) => {
    if (password.length < 8) {
      return {
        success: false,
        message: 'La contraseña debe tener al menos 8 caracteres',
      };
    }
    if (password.length > 80) {
      return {
        success: false,
        message: 'La contraseña debe tener menos de 80 caracteres',
      };
    }
    return { success: true, message: '' };
  },

  validatePasswordConfirmation: (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      return {
        success: false,
        message: 'Las contraseñas no coinciden',
      };
    }
    return { success: true, message: '' };
  },

  validateLogin: (username: string, password: string) => {
    const userValidation = authValidation.validateUser(username);
    if (!userValidation.success) {
      return userValidation;
    }

    const passwordValidation = authValidation.validatePassword(password);
    if (!passwordValidation.success) {
      return passwordValidation;
    }

    return { success: true, message: '' };
  },

  validateRegister: (
    username: string,
    password: string,
    confirmPassword: string,
  ) => {
    const userValidation = authValidation.validateUser(username);
    if (!userValidation.success) {
      return userValidation;
    }

    const passwordValidation = authValidation.validatePassword(password);
    if (!passwordValidation.success) {
      return passwordValidation;
    }

    const passwordConfirmationValidation =
      authValidation.validatePasswordConfirmation(password, confirmPassword);
    if (!passwordConfirmationValidation.success) {
      return passwordConfirmationValidation;
    }

    return { success: true, message: '' };
  },
};

export default authValidation;
