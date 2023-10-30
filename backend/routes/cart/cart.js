// controllers
const {
  addItem,
  getItem,
  deleteItem,
} = require("../../controllers/cart/cartController");

const express = require("express");
const router = express.Router();

router.post("/:id", addItem);
router.get("/", getItem);
router.delete("/", deleteItem);

module.exports = router;
