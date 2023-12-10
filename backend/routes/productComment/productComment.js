const express = require("express");
const router = express.Router();

const {
  postComment,
  fetchComment,
  deleteComment,
} = require("../../controllers/productComment/productCommentControllers");

router.get("/products/:productId", fetchComment);
router.post("/products", postComment);
router.delete("/products", deleteComment);

module.exports = router;
