// route
const userSellRoute = require("./routes/registerSellUser");
const userBuyRoute = require("./routes/registerBuyUser");
const marketProducts = require("./routes/products/products");
// library
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.use("/api/user/sell", userSellRoute);
app.use("/api/user/buy", userBuyRoute);
app.use("/api/market", marketProducts);

// app.use("/api/register/");
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
