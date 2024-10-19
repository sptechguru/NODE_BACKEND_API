const express = require("express");
const router = new express.Router();
const Student = require("../models/students");
const multer = require('multer');
const checkAuth = require("../middleware/auth");
const checkAuthBeareToken = require("../middleware/authBearer_token");

// // now using profile pic uploads ///////////////////
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

// // now using profile pic uploads ///////////////////

// router.get("/", (req, res) => {
//   res.send("My Student get Route is Activated")
// });


///////////// All http  method for using is async wait ///////////////////

router.post("/students-pic",upload.single('profile_pic'),checkAuthBeareToken,async (req, res) => {
  console.log('files',req.file);
  try {
    const user = new Student({
      _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email_Id:req.body.email_Id,
        phone_Number: req.body.phone_Number,
        address: req.body.address,
        profile_pic:req.file.path 
    });
    console.log(user);
    await user.save();
    res.status(201).send({
      success:true,
      message:"students created succefully",
      data:user,
      profile_pic: {
          name: req.name,
          email_Id: req.email_Id,
          phone_Number: req.phone_Number,
          address: req.address,
          _id: req._id,
        request: {
            type: 'GET',
            url: "http://localhost:3000/students/" + req._id
        },
      },
    });
  } catch (error) {
    res.status(400).send({
      success:false,
      message:error,
      data:[]
    });
  }
});



router.post("/students" ,checkAuth,async (req, res) => {
  try {
    const user = new Student(req.body);
    // console.log(user);
    await user.save();
    res.status(201).send({
      success:true,
      message:"students created succefully",
      data:user
    });
  } catch (error) {
    res.status(400).send({
      success:false,
      message:error,
      data:[]
    });
  }
});

/////////////////////// get all students data//////////////// //

router.get("/students", checkAuthBeareToken, async (req, res) => {
  // console.log("required",req)
  try {
    const users = await Student.find();
    console.log("get All Students data", users);
    res.status(201).send({
      success:true,
      message:"students details found.",
      data:users
    });
  } catch (error) {
    res.status(500).send({
      success:false,
      message:"students details not Found ",
      data:user
    });
  }
});

/////////////////////// get students By Id data//////////////// //

router.get("/students/:id", checkAuth,async (req, res) => {
  try {
    // console.log(req.params.id);
    const users = await Student.findById(req.params.id);
    // console.log("get", users);
    res.status(200).send({
      success:true,
      message:"Students details found.",
      data:users
    });
  } catch (error) {
    res.status(500).send({
      success:false,
      message:"students details not Found ",
      data:[]
    });
  }
});

/////////////////////// get students By search by single Filelds key Id data//////////////// //

router.get("/students-search/:key", checkAuth, async (req, res) => {
  try {
    // console.log(`search?query=${req.params.key}`);
    const users = await Student.find({
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

/////////////////////// get students By search querry for multiple filelds Id data//////////////// //

router.get("/students-query", checkAuth, async (req, res) => {
  try {
    let searchQuery = req.query;
    console.log("search? name=:", searchQuery);
    const users = await Student.find(searchQuery);
    console.log("students Query=:", users);
    // console.log("data Querry",users[0].email_Id);
    res.status(200).send(searchQuery);
  } catch (error) {
    res.status(500).send(error);
  }
});

////////////////// update students for patch value prefix filelds data/////////////////////////////////

router.patch("/students/:id", checkAuth, async (req, res) => {
  try {
    const id = req.params.id;
    const update = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    // console.log(update);
    res.status(201).send({
      success:true,
      message:"students Details update succefully",
      data:update
    });
  } catch (error) {
    res.status(404).send(error);
  }
});

////////////////// update students for put value prefix filelds data/////////////////////////////////

router.put("/students/:id", checkAuth, async (req, res) => {
  try {
    const id = req.params.id;
    console.log(req.params);
    const update = await Student.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    console.log(update);
    res.status(201).send({
      success:true,
      message:"students Details update succefully",
      data:update
    });;
  } catch (error) {
    res.status(404).send(error);
  }
});

////////////////// Delete students data/////////////////////////////////

router.delete("/students/:id", checkAuth, async (req, res) => {
  //   console.log(req);
  try {
    const id = req.params.id;
    // console.log(id);
    const delteData = await Student.findByIdAndDelete(req.params.id);
    if (!req.params.id) {
      return res.status(500).send("server Error");
    }
    res.send({
      success:true,
      message:"students deleted succefully",
      data:delteData
    }).status(200);
  } catch (error) {
    res.send({
      success:false,
      message:"students Id is Not matched",
      data:[]
    }).status(400);
  }
});

module.exports = router;
