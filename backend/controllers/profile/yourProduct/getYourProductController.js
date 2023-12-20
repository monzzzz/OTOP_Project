const ProductInfo = require("../../../database_schema/products/productsSchema");

const getYourProduct = async (req, res) => {
  const { userId } = req.params;
  try {
    const yourProducts = await ProductInfo.find({ sellerId: userId }); //  yourProducts is a list if map
    const result = [];
    for (const item of yourProducts) {
      result.push({
        ...item,
        imageUrl: `http://localhost:${process.env.PORT}/images/${item.image}`,
      });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getYourProduct };
