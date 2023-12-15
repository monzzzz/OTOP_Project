const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");

const BuyUserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    sixDigits: { type: Number },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

BuyUserSchema.statics.signup = async function (
  username,
  email,
  password,
  sixDigits
) {
  if (!email || !password || !username) {
    throw Error("All field must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is invalid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }
  const emailExists = await this.findOne({ email });
  if (emailExists) {
    throw Error("Email already existed");
  }
  const usernameExists = await this.findOne({ username });
  if (usernameExists) {
    throw Error(`${username} already in use`);
  }

  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({
    username,
    email,
    password: hash,
    sixDigits,
  });
  return user;
};

BuyUserSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All field must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is invalid");
  }
  // check if the email is exist
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Account doesn't exist");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("The password is incorrect");
  }
  return user;
};

module.exports = mongoose.model("BuyUser", BuyUserSchema);
