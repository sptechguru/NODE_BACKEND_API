const express = require("express");
const router = new express.Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const Customer = require("../models/employee");
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const checkAuth = require('../middleware/check-auth');


router.post( "/employee",upload.single('photo'), async (req, res, next) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      console.log(result);
      const user = new Customer({
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email_Id: req.body.email_Id,
        phone_Number: req.body.phone_Number,
        dob: req.body.dob,
        education: req.body.education,
        company:req.body.company,
        jobExperience: req.body.jobExperience,
        salary: req.body.salary,
        photo: result.secure_url,
        cloudnary_Pic_id: result.public_id
      });
      // const user = new Customer(req.body);
      console.log(user);
      await user.save();
      res.status(201).send(user);
    } catch (error) {
      res.status(400).send(error);
      console.log("errrrrrrrrrr", error);
    }
  }
);

/////////////////////// get all Customer data//////////////// //

router.get("/employee", checkAuth,async (req, res) => {
  // console.log("required",req)
  try {
   const {page = 1,limit = 10} = req.query;
    const posts = await Customer.find()
        .limit(limit *1).skip((page -1) *limit);
    res.status(200).send({
    total:posts.length,
     data:posts
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

/////////////////////// get Customer By Id data//////////////// //

router.get("/employee/:id", checkAuth, async (req, res) => {
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

router.get("/employee-search/:key", checkAuth, async (req, res) => {
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
    console.log("gets", users);
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

/////////////////////// get Customer By search querry for multiple filelds Id data//////////////// //

router.get("/employee-query",checkAuth, async (req, res) => {
  try {
    let searchQuery = req.query;
    console.log("search? name=:", searchQuery);
    const users = await Customer.find(searchQuery);
    console.log("customers Query=:", users);
    // console.log("data Querry",users[0].email_Id);
    res.status(200).send(searchQuery);
  } catch (error) {
    res.status(500).send(error);
  }
});

////////////////// update Customer for patch value prefix filelds data/////////////////////////////////

router.patch("/employee/:id", checkAuth, async (req, res) => {
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

router.put("/employee/:id", checkAuth, async (req, res) => {
  try {
    const id = req.params.id;
    console.log(req.params);
    const update = await Customer.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    console.log(update);
    res.send(update).status(201);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.put("/employee/:id", upload.single("profile_pic"), async (req, res) => {
  try {
    let user = await Customer.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(user.cloudnary_Pic_id);
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log("update-Pic", result);
    const data = {
      firstName: req.body.firstName || user.firstName,
      lastName: req.body.lastName || user.lastName,
      phone_Number: req.body.phone_Number || user.phone_Number,
      dob: req.body.dob || user.dob,
      department: req.body.department || user.department,
      profile_pic: result.secure_url || user.profile_pic,
      cloudnary_Pic_id: result.public_id || user.cloudnary_Pic_id,
    };
    user = await User.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

////////////////// Delete Customer data/////////////////////////////////

router.delete("/employee/:id",checkAuth, async (req, res) => {
  //   console.log(req);
  try {
    const id = req.params.id;
    // console.log(id);
    const delteData = await Customer.findByIdAndDelete(req.params.id);
    await cloudinary.uploader.destroy(delteData.cloudnary_Pic_id);
    if (!req.params.id) {
      return res.status(500).send("server Error");
    }
    res.send(delteData).status(200);
  } catch (error) {
    res.send(error).status(400);
  }
});

module.exports = router;

