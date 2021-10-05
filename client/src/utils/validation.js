export const EmailValidation = (email) => {
  const reg = /^\S+@\S+\.\S+$/;
  return reg.test(email) ? true : false;
};

export const PasswordValidation = (password) => {
  const reg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  return reg.test(password) ? true : false;
};
