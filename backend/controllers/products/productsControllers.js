// Schema
const ProductInfo = require("../../database_schema/products/productsSchema");
const productCommentSchema = require("../../database_schema/productComment/productCommentSchema");
require("dotenv").config();

const sellProducts = async (req, res) => {
  const { title, sellerId, price, history, province, category } = req.body;
  console.log(req.file);
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

const updateProduct = async (req, res) => {
  const {
    newTitle,
    newPrice,
    newCategory,
    newProvince,
    newHistory,
    userId,
    productId,
  } = req.body;
  const imagename = req.file.filename;
  if (req.file.size > 5 * 1024 * 1024) {
    res.json(400).json({ error: "image size is too large" });
  }
  try {
    const updatedProduct = await ProductInfo.findOne({ _id: productId });
    if (updatedProduct.sellerId != userId) {
      throw Error("You are not the owner");
    }
    updatedProduct.title = newTitle;
    updatedProduct.price = newPrice;
    updatedProduct.history = newHistory;
    updatedProduct.province = newProvince;
    updatedProduct.category = newCategory;
    updatedProduct.image = imagename;
    updatedProduct.save();
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

// delete product by id
const deleteProductById = async (req, res) => {
  const { productId } = req.params;
  const { userId } = req.query;
  try {
    // delete product comment schema
    const product = await ProductInfo.findOne({ _id: productId });
    if (product.sellerId.toString() == userId) {
      await ProductInfo.deleteOne({ _id: productId });
      await productCommentSchema.deleteMany({ productId: productId });
      res.status(200).json({ mssg: "deleted successfully" });
    } else {
      throw Error("You are not the owner");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  deleteProductById,
  sellProducts,
  getProducts,
  deleteProducts,
  getProductById,
  updateProduct,
};
