require("dotenv").config();
const express = require("express");
const router = new express.Router();
const RegisterSchema = require("../models/registers");
const checkAuth = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


router.post("/register", async (req, res) => {
  try {
    const pass = req.body.password;
    const cpass = req.body.confirm_password;
    if (pass === cpass) {
      const userRegistion = new RegisterSchema({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        gender: req.body.gender,
        phone_Number: req.body.phone_Number,
        password: pass,
        confirm_password: cpass,
      });
      const savedb = await userRegistion.save();
      console.log("Register data ", savedb);
      res.status(201).send(userRegistion);
    } else {
      res.send("Your passwword are Not matching").status(404);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error", error });
  }
});


router.post("/login", async (req, res) => {
  try {
    console.log("Data Login", req.body);
    const email_Id = req.body.email;
    const pass = req.body.password;
    console.log(`Email id is ${email_Id} and password is ${pass}`);
    const user = await RegisterSchema.findOne({ email: email_Id });
    console.log("user datas", user);
    if (!user) {
      res.status(401)
        .json({ message: "Auth failed Invalid User Name & Password" });
    }
    const isPassEqual = await bcrypt.compare(pass, user.password);
    console.log("paswword changes", isPassEqual);
    if (!isPassEqual) {
      res
        .status(401)
        .json({ message: "Auth failed Invalid User Name & Password" });
    }
    const data = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      gender: user.gender,
      phone_Number: user.phone_Number,
      password: pass,
    };
    const token = jwt.sign(data, process.env.SECRET);
    console.log("Modify Data", token);

    return res.status(400).json({
      success: true,
      message: "Login Successfully",
      userData: {
        data,
        token,
      },
    });
  } catch (error) {
    console.log("login error", error);
    res.status(400).send({
      success: false,
      message: "Invalid Login Details",
      Error: error,
      data: [],
    });
  }
});


router.get("/user-details", checkAuth, async (req, res) => {
  try {
    const users = await RegisterSchema.find(
      {},
      { password: 0, confirm_password: 0 }
    );
    console.log("All users", users);
    res.status(200).send({
      success: true,
      message: "get users Deatils",
      data: users,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "users Deatils not Found",
      data: [],
    });
  }
});

router.get("/reset-password", async (req, res) => {
  console.log("required",req)
  try {
    const users = await RegisterSchema.find();
    // console.log("get", users);
    res.status(200).send({
      success: true,
      message: "password update Succefully",
      data: users,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "password is not matching",
      data: [],
    });
  }
});

module.exports = router;
