// this middleware is used to check if the user is login through sell method
// we also need to provide the user token in the headers to check in frontend

const jwt = requiere("jsonwebtoken");
const SellUser = require("../database_schema/sellUserSchema");

export const requireAuthBuy = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw Error("haven't been authorized");
  }
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.SECRET_SELL);
    req.user = await SellUser.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    res.status(401).json({ error: "request is not authorized" });
  }
};
