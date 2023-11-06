// controllers
const {
  addItem,
  getItem,
  deleteItem,
  getItemByID,
  updateQuantity,
  deleteById,
} = require("../../controllers/cart/cartController");

const express = require("express");
const router = express.Router();

// router.post("/", updateQuantity);
router.post("/:id", addItem);
router.get("/", getItem);
router.get("/:id", getItemByID);
router.delete("/", deleteItem);
router.put("/", updateQuantity);
router.delete("/:id", deleteById);

module.exports = router;
