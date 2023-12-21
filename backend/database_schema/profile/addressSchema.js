const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserAddressSchema = new Schema({
  userId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String },
  province: { type: String },
  postalCode: { type: String },
});

module.exports = mongoose.model("AdressSchema", UserAddressSchema);
