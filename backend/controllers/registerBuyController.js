// Schema
const BuyUser = require("../database_schema/buyUserSchema");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_BUY, { expiresIn: "3d" });
};

const loginUser_buy = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await BuyUser.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
    console.log(req.method);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const signupUser_buy = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await BuyUser.signup(email, password);
    res.status(200).json({ email, user });
    console.log(req.method);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser_buy, signupUser_buy };
