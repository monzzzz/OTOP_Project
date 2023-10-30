const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductInfo = new Schema({
  title: {
    type: String,
    require: true,
  },
  sellerId: {
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
  category: {
    type: String,
  },
  image: {
    type: String,
  },
  quantity: {
    type: Number,
  },
});

ProductInfo.statics.offer = async function (
  title,
  sellerId,
  price,
  history,
  province,
  category,
  image
) {
  if (!title) {
    throw Error("Title must be filled");
  }
  if (!price) {
    throw Error("Price must be filled");
  }
  if (!sellerId) {
    throw Error("Seller ID must be filled");
  }
  if (price < 0) {
    throw Error("Price is incorrect");
  }
  const user = await this.create({
    title,
    sellerId,
    price,
    history,
    province,
    category,
    image,
  });
  return user;
};

module.exports = mongoose.model("ProductInfo", ProductInfo);
