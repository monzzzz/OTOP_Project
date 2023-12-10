const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productCommentSchema = new Schema(
  {
    productId: { type: String, required: true },
    userId: { type: String, required: true },
    username: { type: String, required: true },
    text: { type: String },
  },
  { timestamps: true }
);

productCommentSchema.statics.postComment = async function (
  userId,
  username,
  productId,
  text
) {
  if (!userId) {
    throw Error("userId must be filled");
  }
  if (!productId) {
    throw Error("productId must be filled");
  }
  if (!text) {
    throw Error("text must be filled");
  }
  await this.create({ productId, username, userId, text });
};

module.exports = mongoose.model("productCommentSchema", productCommentSchema);
