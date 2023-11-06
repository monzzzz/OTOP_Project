const CartSchema = require("../../database_schema/cart/CartSchema");
const ProductInfo = require("../../database_schema/products/productsSchema");

const addItem = async (req, res) => {
  const quantity = req.query.quantity || 0;
  const id = req.params.id;
  const { ownerID, price } = req.body;
  try {
    await CartSchema.addItem(ownerID, id, quantity, price);
    res.status(200).json({ mssg: "succesfully saved" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// use in debugging with postman

const getItem = async (req, res) => {
  const items = await CartSchema.find({});
  res.status(200).json(items);
};

// get item (cart page)
const getItemByID = async (req, res) => {
  const ownerID = req.params.id;
  try {
    const cart = await CartSchema.find({ owner: ownerID });
    const result = [];
    for (const item of cart[0].items) {
      const eachItemId = item.itemId;
      const productInfo = await ProductInfo.findById(eachItemId);

      result.push({
        ...item,
        productInfo,
        image: `http://localhost:${process.env.PORT}/images/${productInfo.image}`,
      });
    }

    const total_price = cart[0].total_price;
    res.status(200).json({ result, total_price });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// delete item (cart page (cross sign))
const deleteItem = async (req, res) => {
  await CartSchema.deleteMany({});
  res.status(200).json({ message: "All items deleted successfully" });
};

const deleteById = async (req, res) => {
  const ownerID = req.params.id;
  const { itemId } = req.body;
  try {
    const cart = await CartSchema.findOne({ owner: ownerID });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // update price
    const product = cart.items.find((item) => item.itemId === itemId);
    const productInfo = await ProductInfo.findById(itemId);
    cart.total_price = cart.total_price - product.quantity * productInfo.price;

    // delete the elementn from the cart
    await CartSchema.updateOne(
      { owner: ownerID },
      { $pull: { items: { itemId } } }
    );

    await cart.save();
    res.status(200).json({ mssg: "deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};

// update item (update quantity (cart page))
const updateQuantity = async (req, res) => {
  const { quantity, ownerID, productID } = req.body;
  try {
    const cart = await CartSchema.findOne({ owner: ownerID });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const product = cart.items.find((item) => item.itemId === productID);
    // add price to the dictionary
    const productInfo = await ProductInfo.findById(productID);
    cart.total_price =
      cart.total_price + (quantity - product.quantity) * productInfo.price;

    if (!product) {
      return res.status(404).json({ error: "Product not found in the cart" });
    }
    product.quantity = quantity;
    await cart.save();
    res.status(200).json({ message: "Quantity updated" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addItem,
  getItem,
  deleteItem,
  getItemByID,
  updateQuantity,
  deleteById,
};
