const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
  return regex.test(password);
};

module.exports = {
  validateEmail,
  validatePassword,
};
