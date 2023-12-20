const productCommentSchema = require("../../../database_schema/productComment/productCommentSchema");

const getCommentByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const commentList = await productCommentSchema.find({ userId: userId });
    console.log(commentList);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getCommentByUserId };
