export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validateName = (name: string): boolean => {
  return name.trim().length >= 2 && !/\d/.test(name);
};

export const validatePassword = (password: string): boolean => {
  return (
    password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password)
  );
};
