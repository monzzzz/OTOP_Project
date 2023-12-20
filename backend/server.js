// route
const userSellRoute = require("./routes/register/registerSellUser");
const userBuyRoute = require("./routes/register/registerBuyUser");
const marketProductsRoute = require("./routes/products/products");
const paymentRoute = require("./routes/payment/promptpay");
const productCommentRoute = require("./routes/productComment/productComment");
const cartRoute = require("./routes/cart/cart");
const profileRoute = require("./routes/profile/profile");
// library
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use("/api/user/sell", userSellRoute);
app.use("/api/user/buy", userBuyRoute);
app.use("/api/market", marketProductsRoute);
app.use("/api/cart", cartRoute);
app.use("/images", express.static(__dirname + "/images"));
app.use("/api/payment", paymentRoute);
app.use("/api/comment", productCommentRoute);
app.use("/api/profile", profileRoute);

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
