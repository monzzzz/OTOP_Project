// import the schema save the purchased product

const getOrderHistory = (req, res) => {
  const userId = req.params;
  try {
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getOrderHistory };
