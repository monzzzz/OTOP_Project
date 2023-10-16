// controllers
const {
  loginUser_buy,
  signupUser_buy,
} = require("../controllers/registerBuyController");

const express = require("express");
const router = express.Router();

router.get("/login", loginUser_buy);
router.get("/signup", signupUser_buy);

module.exports = router;
