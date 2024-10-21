const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkAuthBeareToken = async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

  if (!token) {
      return res.status(401).json({ messge: "No Token, Authorization Denied." });
    }
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ error: "Token is Not Valid or it's Expired" });
  }
};

module.exports = checkAuthBeareToken;
