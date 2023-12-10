const productCommentSchema = require("../../database_schema/productComment/productCommentSchema");

const postComment = (req, res) => {
  const { userId, text, productId, username } = req.body;
  try {
    productCommentSchema.postComment(userId, username, productId, text);
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

const deleteComment = async (req, res) => {
  const product = await productCommentSchema.deleteMany({});
  res.status(200).json({ mssg: "deleted successfully" });
};

module.exports = { postComment, fetchComment, deleteComment };
