const express = require("express");
const router = express.Router();

const {
  postComment,
  fetchComment,
} = require("../../controllers/productComment/productCommentControllers");

router.get("/products/:productId", fetchComment);
router.post("/products", postComment);

module.exports = router;
