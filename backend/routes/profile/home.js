const express = require("express");
const router = express.Router();

const { changeName } = require("../../controllers/profile/home/changeName");

router.post("/home", changeName);

module.exports = router;
