const BuyUser = require("../../../database_schema/buyUserSchema");
const { createToken } = require("../../../utils/token/createTokenOneDay");

const emailVerification = async (req, res) => {
  try {
    const { passcode, userId } = req.body;
    const user = await BuyUser.findOne({ _id: userId });
    const isVerified = user.isVerified;
    const username = user.username;
    const email = user.email;
    const id = user._id;
    const token = createToken(id);
    if (user.sixDigits == passcode) {
      user.isVerified = true;
      await user.save();
      res
        .status(200)
        .json({ username: username, email, id, token, isVerified });
    } else {
      res.status(400).json({ error: "Invalid verification code" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { emailVerification };
