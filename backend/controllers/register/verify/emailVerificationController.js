const BuyUser = require("../../../database_schema/buyUserSchema");

const emailVerification = async (req, res) => {
  try {
    const { passcode, userId } = req.body;
    const user = await BuyUser.findOne({ _id: userId });
    if (user.sixDigits == passcode) {
      user.isVerified = true;
      await user.save();
      const userState = user.isVerified;
      res.status(200).json({ userState });
    } else {
      res.status(200).json({ mssg: "wrong passcode" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { emailVerification };
