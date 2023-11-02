// Schema
const ProductInfo = require("../../database_schema/products/productsSchema");
require("dotenv").config();

const sellProducts = async (req, res) => {
  const { title, sellerId, price, history, province, category } = req.body;
  const imagename = req.file.filename;
  if (req.file.size > 5 * 1024 * 1024) {
    res.json(400).json({ error: "image size is too large" });
  }
  try {
    const product = await ProductInfo.offer(
      title,
      sellerId,
      price,
      history,
      province,
      category,
      imagename
    );
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await ProductInfo.findById(id);
    const finalProduct = {
      ...product,
      image: `http://localhost:${process.env.PORT}/images/${product.image}`,
    };
    if (finalProduct) {
      res.status(200).json(finalProduct);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const product = await ProductInfo.find({}).sort({ createAt: -1 }); // newest one at the top
    const finalProduct = product.map((item) => {
      return {
        ...item,
        image: `http://localhost:${process.env.PORT}/images/${item.image}`,
      };
    });
    res.status(200).json(finalProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProducts = async (req, res) => {
  const product = await ProductInfo.deleteMany({});
  res.status(200).json(product);
};

module.exports = { sellProducts, getProducts, deleteProducts, getProductById };
