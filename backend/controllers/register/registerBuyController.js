require("dotenv").config();
const BuyUser = require("../../database_schema/buyUserSchema");
const { createToken } = require("../../utils/token/createTokenOneDay");
const randomize = require("randomatic");
const {
  sendVerificationEmail,
} = require("../../utils/sendMail/sendVerificationEmail");

const loginUser_buy = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await BuyUser.login(email, password);
    const token = createToken(user._id);
    const username = user.username;
    const isVerified = user.isVerified;
    const id = user._id;
    res.status(200).json({ username: username, email, id, token, isVerified });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signupUser_buy = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const sixDigits = randomize("0", 6);
    const user = await BuyUser.signup(username, email, password, sixDigits);
    sendVerificationEmail(user, sixDigits);
    const id = user._id;
    console.log(sixDigits);
    const token = createToken(user._id);
    const isVerified = user.isVerified;
    res.status(200).json({ username, email, id, token, isVerified });
    console.log(req.method);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

const deleteAllUserAccount = async (req, res) => {
  try {
    await BuyUser.deleteMany({});
    res.status(200).json({ mssg: "deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserInfo = async (req, res) => {
  const userId = req.params;
  try {
    const user = await BuyUser.fineOne({ _id: userId });
    const username = user.username;
    const email = user.email;
    const id = user._id;

    res.status(200).json({ username, email, id, token, isVerified });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUserbyId = async (req, res) => {
  const { userId } = req.body;
  try {
    await BuyUser.findByIdAndDelete(userId);
    res.status(200).json({ mssg: "delete successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// request for the profile image username and email and make it able it be updated.

module.exports = {
  loginUser_buy,
  signupUser_buy,
  deleteUserbyId,
  deleteAllUserAccount,
};
