const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkAuth = async (req, res, next) => {
  // console.log(req.header);
  if (!req.headers["authorization"]) {
    return res.status(401).json({ messge: "Token is Required." });
  }
  try {
    const decoded = jwt.verify(req.headers["authorization"],process.env.JWT_SECRET);
    return next();
  } catch (error) {
    res.status(401).send({ error: "Token is Not Valid or it's Expired" });
  }
};

module.exports = checkAuth;
