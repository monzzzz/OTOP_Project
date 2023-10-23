// Schema
const ProductInfo = require("../../database_schema/products/productsSchema");

const sellProducts = async (req, res) => {
  const { title, sellerId, price, history, province, category } = req.body;
  try {
    const product = await ProductInfo.offer(
      title,
      sellerId,
      price,
      history,
      province,
      category
    );
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProducts = async (req, res) => {
  const product = await ProductInfo.find({}).sort({ createAt: -1 }); // newest one at the top
  res.status(200).json(product);
};

module.exports = { sellProducts, getProducts };
