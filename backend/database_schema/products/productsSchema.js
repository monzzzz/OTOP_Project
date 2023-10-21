const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductInfo = new Schema({
  title: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  history: {
    type: String,
  },
  province: {
    type: String,
  },
  type: {
    type: String,
  },
});

ProductInfo.statics.offer = async function (
  title,
  price,
  history,
  province,
  type
) {
  if (!title || !price) {
    throw Error("Title and prince must be filled");
  }
  const user = await this.create({ title, price, history, province, type });
  return user;
};

module.exports = mongoose.model("ProductInfo", ProductInfo);
