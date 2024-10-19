const express = require("express");
const router = new express.Router();
const Customer = require("../models/cutomer");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const checkAuth = require("../middleware/auth");
const genAI = new GoogleGenerativeAI(process.env.CHAT_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generte = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    res.status(501).send(error);
  }
};

router.post("/google-api-Gemini/your-query", checkAuth, async (req, res) => {
  try {
    const data = req.body.question;
    const result = await generte(data);
    res.status(201).send(result);
  } catch (error) {
    // console.log("error", error);
    res.status(501).send({
      message: "Server Error",
      error: error,
    });
  }
});

///////////// All http  method for using is async wait ///////////////////


router.post("/customer", checkAuth, async (req, res) => {
  try {
    const user = new Customer(req.body);
    const { firstName, lastName, email_id, phone_Number, department, dob } =
      req.body;
    // console.log(user);
    await user.save();

    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

/////////////////////// get all Customer data//////////////// //

router.get("/all-customer", async (req, res) => {
  // console.log("required",req)
  try {
    const users = await Customer.find();
    // console.log("get", users);
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

/////////////////////// get Customer By Id data//////////////// //

router.get("customer/:id", checkAuth, async (req, res) => {
  try {
    // console.log(req.params.id);
    const users = await Customer.findById(req.params.id);
    // console.log("get", users);
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

/////////////////////// get Customer By search by single Filelds key Id data//////////////// //

router.get("customer/search/:key", checkAuth, async (req, res) => {
  try {
    // console.log(`search?query=${req.params.key}`);
    const users = await Customer.find({
      $or: [
        {
          // email_Id :{$regex:req.params.key}, now using email for search
          name: { $regex: req.params.key },
        },
      ],
    });
    // console.log("gets", users);
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

/////////////////////// get Customer By search querry for multiple filelds Id data//////////////// //

router.get("customer/query", checkAuth, async (req, res) => {
  try {
    let searchQuery = req.query;
    // console.log("search? name=:", searchQuery);
    const users = await Customer.find(searchQuery);
    // console.log("customers Query=:", users);
    // console.log("data Querry",users[0].email_Id);
    res.status(200).send(searchQuery);
  } catch (error) {
    res.status(500).send(error);
  }
});

////////////////// update Customer for patch value prefix filelds data/////////////////////////////////

router.patch("customer/:id", checkAuth, async (req, res) => {
  try {
    const id = req.params.id;
    const update = await Customer.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    // console.log(update);
    res.send(update).status(201);
  } catch (error) {
    res.status(404).send(error);
  }
});

////////////////// update Customer for put value prefix filelds data/////////////////////////////////

router.put("customer/:id", checkAuth, async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(req.params);
    const update = await Customer.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    // console.log(update);
    res.send(update).status(201);
  } catch (error) {
    res.status(404).send(error);
  }
});

////////////////// Delete Customer data/////////////////////////////////

router.delete("customer/:id", checkAuth, async (req, res) => {
  //   console.log(req);
  try {
    const id = req.params.id;
    // console.log(id);
    const delteData = await Customer.findByIdAndDelete(req.params.id);
    if (!req.params.id) {
      return res.status(500).send("server Error");
    }
    res.send(delteData).status(200);
  } catch (error) {
    res.send(error).status(400);
  }
});


router.get("/live-test-Route", (req, res) => {
  res.send("live-test-Route is Activated is Running");
});


module.exports = router;
