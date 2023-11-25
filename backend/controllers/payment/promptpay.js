const axios = require("axios");

// post method
const createPromptPay = async (req, res) => {
  const { sourceId, amount } = req.body;
  console.log(amount);
  try {
    const chargeResponse = await axios.post(
      "https://api.omise.co/charges",
      {
        amount: amount,
        currency: "THB",
        source: sourceId,
      },
      {
        auth: {
          username: "skey_test_5xo9s0jj60ybg4g6a81",
          password: "",
        },
      }
    );
    console.log(chargeResponse.data.source.scannable_code.image); //chargeResponse.source.scannable_code.image
    imageObject = chargeResponse.data.source.scannable_code.image;
    res.status(200).json({ imageObject });
  } catch (error) {
    console.error("Error creating charge:", error);
  }
};

module.exports = { createPromptPay };
