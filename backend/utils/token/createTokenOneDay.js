const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_BUY, { expiresIn: "1d" });
};

module.exports = { createToken };
