const {
  sellProducts,
  getProducts,
} = require("../../controllers/products/productsControllers");

const express = require("express");
const router = express.Router();

router.post("/products", sellProducts);
router.get("/products", getProducts);

module.exports = router;
