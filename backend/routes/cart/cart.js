// controllers
const {
  addItem,
  getItem,
  deleteItem,
  getItemByID,
} = require("../../controllers/cart/cartController");

const express = require("express");
const router = express.Router();

router.post("/:id", addItem);
router.get("/", getItem);
router.get("/:id", getItemByID);
router.delete("/", deleteItem);

module.exports = router;
