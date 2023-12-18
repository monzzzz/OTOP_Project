// controllers
const {
  signupUser_sell,
  loginUser_sell,
  deleteAllUserAccount,
} = require("../../controllers/register/registerSellController");

// library
const express = require("express");
const router = express.Router();

router.post("/login", loginUser_sell);
router.post("/signup", signupUser_sell);
router.delete("/", deleteAllUserAccount);

module.exports = router;
