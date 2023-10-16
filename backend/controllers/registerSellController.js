const SellUser = require("../database_schema/sellUserSchema");

const loginUser_sell = async (req, res) => {
  res.status(200).json({ mssg: "login" });
};
const signupUser_sell = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await SellUser.signup(email, password); // use the static function created in the database schema
    res.status(200).json({ email, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser_sell, loginUser_sell };
