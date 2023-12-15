// controllers

const {
  loginUser_buy,
  signupUser_buy,
  deleteUserbyId,
} = require("../../controllers/register/registerBuyController");

const {
  emailVerification,
} = require("../../controllers/register/verify/emailVerificationController");

const express = require("express");
const router = express.Router();

router.post("/login", loginUser_buy);
router.post("/signup", signupUser_buy);
router.post("/verify", emailVerification);
router.delete("/account", deleteUserbyId);

module.exports = router;
