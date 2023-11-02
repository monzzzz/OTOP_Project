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
  const items = await CartSchema.find({}).sort({ createAt: -1 });
  res.status(200).json(items);
};

// get item (cart page)
const getItemByID = async (req, res) => {
  const ownerID = req.params.id;
  try {
    const cart = await CartSchema.find({ owner: ownerID });

    const result = [];
    await Promise.all(
      cart[0].items.map(async (item) => {
        const eachItemId = item.itemId;
        const productInfo = await ProductInfo.findById(eachItemId);

        result.push({
          ...item,
          productInfo,
          image: `http://localhost:${process.env.PORT}/images/${productInfo.image}`,
        });
      })
    );
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
// update item (update quantity (cart page))

module.exports = { addItem, getItem, deleteItem, getItemByID };
