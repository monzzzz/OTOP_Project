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

const {
  getUserAddress,
  addUserAddress,
  deleteAddress,
} = require("../../controllers/profile/home/userAddress");

router.get("/order-history", getOrderHistory);
router.get("/your-product/:userId", getYourProduct);
router.get("/comment/:userId", getCommentByUserId);
router.put("/home", changeName);
router.get("/home/address/:userId", getUserAddress);
router.post("/home/address", addUserAddress);
router.delete("/home/address/:userId", deleteAddress);

module.exports = router;
