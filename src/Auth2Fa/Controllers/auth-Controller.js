require("dotenv").config();
const User = require("../Models/Auth2fa_Models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const speakeasy = require("speakeasy");
const QRCode = require("qrcode");
const dotenvFlow = require("dotenv-flow");
dotenvFlow.config();


const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hasPassword = await bcrypt.hash(password, 10);
    const newUser = new User({username,password: hasPassword,isMfaActive: false});
    console.log("New User", newUser,"hasPassword", hasPassword);
    await newUser.save();
    res.status(201).json({ message: "User Created Succefuuly" });
  } 
  catch (error) {
    res.status(501).send({
      message: "Internal Server Error ",
      error: error,
    });
  }
}

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    res.status(200).json({
      message: "User Logged in Successfuly",
      username: req.user.username,
      isMfaActive: req.user.isMfaActive,
    });
  } catch (error) {
    res.status(501).send({
      message: "Internal Server Error",
      error: error,
    });
  }
}

const logout = async (req, res) => {
  try {
    if (!req.user) res.status(401).json({ message: "Unautozized User" });
    req.logout((err) => {
      if (err) return res.status(400).json({ message: " User is Not Login" });
      res.status(200).json({ message: " Logout Successfull" });
    });
  } catch (error) {
    res.status(501).send({
      message: "Server Error",
      error: error,
    });
  }
}

const authStatus = async (req, res) => {
  try {
    if (req.user) {
      res.status(200).json({
        message: "User Logged in Successfuly",
        username: req.user.username,
        isMfaActive: req.user.isMfaActive,
      });
    } else {
      res.status(401).json({ message: "Unautozized User" });
    }
  } catch (error) {
    res.status(501).send({
      message: "Server Error",
      error: error,
    });
  }
}

const stup2FaAuth = async (req, res) => {
  try {
    const {user} = req.user;
    let secret = speakeasy.generateSecret();
    console.log("Seecret gen..", secret, "& user", user);
    user.twoFactorSecret = secret.base32;
    user.isMfaActive = true;
    await user.save();
    const baseurl = speakeasy.otpauthURL({
      secret: secret,
      label: `${req.user.username}`,
      issuer: "https://sani.pythonanywhere.com/",
      encoding: "base32",
    });
    const qrImageUrl = await QRCode.toDataURL(baseurl);
    console.log("Qr image genatrate ", qrImageUrl);
    res.status(200).json({
      secret: secret.base32,
      qrCodeUrl: qrImageUrl,
    });
  } catch (error) {
    res.status(501).send({
      message: " 2Fa Auth Server Error",
      error: error,
    });
  }
}

const verfyAuth = async (req, res) => {
  try {
    const { token } = req.body;
    const user = req.user;
    const verifyUser = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: "base32",
      token,
    });

    if (verifyUser) {
      const jwtToken = jwt.sign(
        { username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "2hr" }
      );
      res.status(200).json({ message: "Verify 2Fa Successfuly", token: jwtToken });
    } 
    else {
      res.status(400).json({ message: "Invalid 2Fa token" });
    }
  } catch (error) {
    res.status(501).send({
      message: "Verifiy Auth Server Error",
      error: error,
    });
  }
}


const reset2Fa = async (req, res) => {
  try {
    const user = req.user;
    user.twoFactorSecret = " ";
    user.isMfaActive = false;
    // await user.save();
    res.status(200).json({ message: "2Fa Reset Successfuly" });
  } catch (error) {
    res.status(501).send({
      message: "Reset Auth Server Error",
      error: error
    });
  }
}


module.exports = {register,login, logout,authStatus,reset2Fa,verfyAuth,stup2FaAuth}
