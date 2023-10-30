const CartSchema = require("../../database_schema/cart/CartSchema");
const productsSchema = require("../../database_schema/products/productsSchema");

const addItem = async (req, res) => {
  const quantity = req.query.quantity || 0;
  const id = req.params.id;
  const { ownerID } = req.body;
  try {
    await CartSchema.addItem(ownerID, id, quantity);
    res.status(200).json({ mssg: "succesfully saved" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get item (cart page)

const getItem = async (req, res) => {
  // const {ownerID} = req.body
  const items = await CartSchema.find({}).sort({ createAt: -1 });
  res.status(200).json({ items });
};

// delete item (cart page (cross sign))
const deleteItem = async (req, res) => {
  await CartSchema.deleteMany({});
  res.status(200).json({ message: "All items deleted successfully" });
};
// update item (update quantity (cart page))

module.exports = { addItem, getItem, deleteItem };
