const productCommentSchema = require("../../../database_schema/productComment/productCommentSchema");

const getCommentByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const commentList = await productCommentSchema.find({ userId: userId });
    res.status(200).json(commentList);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteComment = async (req, res) => {
  const { userId } = req.params;
  const { commentId } = req.query;
  try {
    const comment = await productCommentSchema.findOne({ _id: commentId });
    if (comment.userId == userId) {
      await productCommentSchema.deleteOne({ _id: commentId });
      res.status(200).json({ mssg: "deleted successfully" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getCommentByUserId, deleteComment };
