/**
 * I will keep the validation simple but we can add more constraints on how we want to validate our email entered
 */
const isValidText = (value, minLength = 1) => {
  return value && value.trim().length >= minLength;
};
const isValidEmail = (value) => {
  return value && value.includes("@");
};

module.exports = {
  isValidText,
  isValidEmail,
};
