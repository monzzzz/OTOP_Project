// controllers
const {
  addItem,
  getItem,
  deleteItem,
  getItemByID,
  updateQuantity,
} = require("../../controllers/cart/cartController");

const express = require("express");
const router = express.Router();

// router.post("/", updateQuantity);
router.post("/:id", addItem);
router.get("/", getItem);
router.get("/:id", getItemByID);
router.delete("/", deleteItem);
router.put("/", updateQuantity);

module.exports = router;
