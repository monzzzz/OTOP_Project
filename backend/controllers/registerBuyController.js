// Schema
const BuyUser = require("../database_schema/buyUserSchema");

const loginUser_buy = async (req, res) => {
  res.status(200).json({ mssg: "login" });
};
const signupUser_buy = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await BuyUser.signup(email, password);
    res.status(200).json({ email, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser_buy, signupUser_buy };
