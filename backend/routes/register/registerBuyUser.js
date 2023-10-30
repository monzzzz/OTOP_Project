// controllers
const {
  loginUser_buy,
  signupUser_buy,
} = require("../../controllers/register/registerBuyController");

const express = require("express");
const router = express.Router();

router.post("/login", loginUser_buy);
router.post("/signup", signupUser_buy);

module.exports = router;
