const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");

const BuyUserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

BuyUserSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw Error("All field must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is invalid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already existed");
  }
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hash });
  return user;
};

BuyUserSchema.statics.login = async function (emil, password) {
  if (!email || !password) {
    throw Error("All field must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("email is invalid");
  }
  // check if the email is exist
  const user = statics.findOne({ email });
  if (!user) {
    throw Error("account doesn't exist");
  }
  const match = bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("The password is incorrect");
  }
  return user;
};

module.exports = mongoose.model("BuyUser", BuyUserSchema);
