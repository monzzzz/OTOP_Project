const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");


const sellUserSchema = new Schema({
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

// build the method signup to use before save the data
sellUserSchema.statics.signup = async function (email, password) {
  const exists = await this.findOne({ email }); // check if the email already exist
  if (exists) {
    throw Error("email already existed");
  }
  // if not
  // generate salt to combine with a password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hash });
  return user;
};

module.exports = mongoose.model("SellUser", sellUserSchema);
