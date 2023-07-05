const { sign, verify } = require("jsonwebtoken");
const { compare } = require("bcryptjs");

const { NotAuthError } = require("./errors");

const KEY = "I_like_to_play_soccer";

const createJsonToken = (email) => {
  return sign({ email }, KEY, { expiresIn: "1h" });
};

const validateToken = (token) => {
  return verify(token, KEY);
};
const isValidPassword = (password, storedPw) => {
  return compare(password, storedPw);
};

module.exports = {
  createJsonToken,
  validateToken,
  isValidPassword,
};
