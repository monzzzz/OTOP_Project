const BuyUser = require("../../../database_schema/buyUserSchema");
const SellUser = require("../../../database_schema/sellUserSchema");

const changeName = async (req, res) => {
  const { newName, method, userId } = req.body;
  try {
    if (!newName) {
      throw Error("please fill your new username");
    }
    if (method == "sell") {
      const usernameExists = await SellUser.findOne({ username: newName });
      if (usernameExists) {
        throw Error(`${newName} already in use`);
      }
      const user = await SellUser.findOne({ _id: userId });
      user.username = newName;
      user.save();
      res.status(200).json({ mssg: "changed successfully" });
    }
    if (method == "buy") {
      const usernameExists = await BuyUser.findOne({ username: newName });
      if (usernameExists) {
        throw Error(`${newName} already in use`);
      }
      const user = await BuyUser.findOne({ _id: userId });
      user.username = newName;
      user.save();
      res.status(200).json({ mssg: "changed successfully" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { changeName };
