// Schema
const BuyUser = require("../../database_schema/buyUserSchema");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_BUY, { expiresIn: "1d" });
};

const loginUser_buy = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await BuyUser.login(email, password);
    const token = createToken(user._id);
    const username = user.username;
    const id = user._id;
    res.status(200).json({ username: username, email, id, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const signupUser_buy = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await BuyUser.signup(username, email, password);
    const id = user._id;
    const token = createToken(user._id);
    res.status(200).json({ username, email, id, token });
    console.log(req.method);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// request for the profile image username and email and make it able it be updated.

module.exports = { loginUser_buy, signupUser_buy };
