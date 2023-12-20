const ProductInfo = require("../../../database_schema/products/productsSchema");

const deleteYourProduct = (req, res) => {
  const { userId, productId } = req.body;
  try {
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
