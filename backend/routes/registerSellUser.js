// controllers
const {
  signupUser_sell,
  loginUser_sell,
} = require("../controllers/registerSellController");

// library
const express = require("express");
const router = express.Router();

router.get("/login", loginUser_sell);
router.get("/signup", signupUser_sell);

module.exports = router;
