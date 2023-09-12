const jwt = require("jsonwebtoken");
const RegisterSchema = require("../models/registers");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const verifyuser = jwt.verify(token, env.process.SECRET_KEY);
    console.log("verifyuser..", verifyuser);
    const user = await RegisterSchema.findOne({id:verifyuser._id});
    console.log("user..", user);
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.log("Error for Auth services for 401");
    res.status(401).send(error);
  }
};

module.exports = auth;
