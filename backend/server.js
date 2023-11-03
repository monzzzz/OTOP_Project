// route
const userSellRoute = require("./routes/register/registerSellUser");
const userBuyRoute = require("./routes/register/registerBuyUser");
const marketProducts = require("./routes/products/products");
const cart = require("./routes/cart/cart");
// library
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use("/api/user/sell", userSellRoute);
app.use("/api/user/buy", userBuyRoute);
app.use("/api/market", marketProducts);
app.use("/api/cart", cart);
app.use("/images", express.static(__dirname + "/images"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("server started");
    });
  })
  .catch((err) => {
    console.log(err);
  });
