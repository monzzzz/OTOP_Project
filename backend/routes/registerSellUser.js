// controllers
const {
  signupUser_sell,
  loginUser_sell,
} = require("../controllers/registerSellController");

// library
const express = require("express");
const router = express.Router();

router.post("/login", loginUser_sell);
router.post("/signup", signupUser_sell);

module.exports = router;
