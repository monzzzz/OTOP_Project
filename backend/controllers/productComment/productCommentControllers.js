const productCommentSchema = require("../../database_schema/productComment/productCommentSchema");

const postComment = (req, res) => {
  const { userId, text, productId } = req.body;
  console.log("HI");
  try {
    productCommentSchema.postComment(userId, productId, text);
    res.status(200).json({ mssg: "created successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const fetchComment = async (req, res) => {
  const { productId } = req.params;
  try {
    const comment = await productCommentSchema.find({ productId: productId });
    res.status(200).json({ comment: comment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { postComment, fetchComment };
