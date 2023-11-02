const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  itemId: String,
  quantity: Number,
});

const CartSchema = new Schema({
  owner: {
    type: String,
    required: true,
  },
  items: [ItemSchema],
  total_price: {
    type: Number,
    default: 0,
  },
});

CartSchema.statics.addItem = async function (ownerID, item, quantity, price) {
  if (!ownerID) {
    throw Error("no ownerID");
  }
  if (!item) {
    throw Error("No item added");
  }
  if (!price) {
    throw Error("No price");
  }

  // find if the user already have a cart
  let cart = await this.findOne({ owner: ownerID });

  if (cart) {
    const newPrice = cart.total_price + quantity * price;
    const existingItem = cart.items.find(
      (cartItem) => cartItem.itemId === item
    );
    if (existingItem) {
      existingItem.quantity =
        parseInt(existingItem.quantity) + parseInt(quantity);
    } else {
      cart.items.push({
        itemId: item,
        quantity: quantity,
      });
    }
    cart.total_price = newPrice; // Update total_price
  } else {
    const newPrice = quantity * price;
    cart = await this.create({
      owner: ownerID,
      items: [{ itemId: item, quantity: quantity }],
      total_price: newPrice,
    });
  }

  await cart.save();
  return "Successfully saved";
};

// sum the price when the user clicking check out button

module.exports = mongoose.model("CartSchema", CartSchema);
