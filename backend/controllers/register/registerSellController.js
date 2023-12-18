const SellUser = require("../../database_schema/sellUserSchema");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_SELL, { expiresIn: "3d" });
};

const deleteAllUserAccount = async (req, res) => {
  try {
    await SellUser.deleteMany({});
    res.status(200).json({ mssg: "deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser_sell = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await SellUser.login(email, password);
    const token = createToken(user._id);
    const username = user.username;
    const id = user.id;
    res.status(200).json({ username: username, email, id, token });
    console.log(req.method);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const signupUser_sell = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await SellUser.signup(username, email, password);
    const id = user.id;
    const token = createToken(user._id);
    res.status(200).json({ username, email, id, token });
    console.log(req.method);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// request for the profile image username and email and make it able it be updated.

module.exports = { loginUser_sell, signupUser_sell, deleteAllUserAccount };
