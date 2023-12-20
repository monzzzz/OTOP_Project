const express = require("express");
const router = express.Router();

const { changeName } = require("../../controllers/profile/home/changeName");
const {
  getOrderHistory,
} = require("../../controllers/profile/orderHistory/getOrderHistory");
const {
  getYourProduct,
} = require("../../controllers/profile/yourProduct/getYourProductController");

const {
  getCommentByUserId,
} = require("../../controllers/profile/comment/getCommentByUserController");

router.get("/order-history", getOrderHistory);
router.get("/your-product/:userId", getYourProduct);
router.get("/comment/:userId", getCommentByUserId);
router.put("/home", changeName);

module.exports = router;
