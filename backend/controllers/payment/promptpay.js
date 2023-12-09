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
    const data = chargeResponse.data; //.scannable_code.image'
    console.log(data);
    res.status(200).json({ data });
  } catch (error) {
    console.error("Error creating charge:", error);
  }
};

module.exports = { createPromptPay };
