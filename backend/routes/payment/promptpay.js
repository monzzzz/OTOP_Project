const { createPromptPay } = require("../../controllers/payment/promptpay");

const express = require("express");
const router = express.Router();

router.post("/promptpay", createPromptPay);

module.exports = router;
