const router = require("express").Router();
const profiledata = require("../db/portfolio_data");
const {
  Intro,
  Project,
  Education,
  Expereince,
  Skill,
} = require("../models/portFolio");
const User = require("../models/registers");
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });
const cacheKey = "myData";
const upload = require("../utils/multer"); // your production multer
const cloudinary = require("../utils/cloudinary");
const streamifier = require("streamifier");
const mongoose = require("mongoose");

/////////////////////////// get all Portfoliod Data//////////////////

router.get("/get-portfolio", async (req, res) => {
  try {
    const [Intros, Projects, Educations, Experiences, Skills] =
      await Promise.all([
        Intro.find(),
        Project.find(),
        Education.find(),
        Expereince.find(),
        Skill.find(),
      ]);
    const userProfile = {
      intro: Intros[0],
      projects: Projects,
      education: Educations,
      experience: Experiences,
      skills: Skills,
    };
    // console.log("Fetched get all user profile data:", userProfile);
    // cache.set(cacheKey, userProfile);
    res.status(200).send({
      data: userProfile,
      success: true,
      message: "All Portfolio get Data Succefully",
    });
  } catch (error) {
    res.status(500).send({
      error: "Internal Server Error",
      message: error.message,
      stack: error.stack,
    });
  }
});


router.post("/add-intro", async (req, res) => {
  try {
     const intros = new Intro({
      ...req.body,
      userId: req.body.userId  // ✅ Save userId
    });
    await Intros.save();
    res.status(200).send({
      data: Intros,
      success: true,
      message: "Intro added Succefully",
    });
    // console.log("Intro added Succefully", Intros);
  } catch (error) {
    // console.log("Error adding intro:", error);
    res.status(500).send(error);
  }
});

///////////////////////////  Update Intro Portfoliod Data//////////////////
router.post("/update-intro", upload.single("profile_url"), async (req, res) => {
  try {
    const { _id, ...updateData } = req.body;

    if (!_id) {
      return res.status(400).json({
        success: false,
        message: "Intro ID is required",
      });
    }

    // ✅ If new image uploaded
    if (req.file) {
      const streamUpload = () =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "portfolio_profile" },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            },
          );

          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });

      const result = await streamUpload();

      // Save image URL in update object
      updateData.profile_url = result.secure_url;
      // console.log("updates data url",updateData.profile_url)
    }

    // ✅ Update document
    const intro = await Intro.findByIdAndUpdate(_id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!intro) {
      return res.status(404).json({
        success: false,
        message: "Intro not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Intro Updated Successfully",
      data: intro,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


router.post("/delete-intro", async (req, res) => {
  try {
    const bio = await Intro.findOneAndDelete({ _id: req.body._id });
    res.status(200).send({
      data: bio,
      success: true,
      message: "intro deleated Succefully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});


router.post("/add-experience", async (req, res) => {
  try {
    const experience = new Expereince({
      ...req.body,
      userId: req.body.userId  // ✅ Save userId
    });
    await experience.save();
    res.status(200).send({
      data: experience,
      success: true,
      message: "Experience added Succefully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

///////////////////////////  update  Expereince Portfoliod Data//////////////////

router.post("/update-experience", async (req, res) => {
  try {
    const experience = await Expereince.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true },
    );
    res.status(200).send({
      data: experience,
      success: true,
      message: "Experience updated Succefully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

///////////////////////////   Expereince delete Portfoliod Data//////////////////

router.post("/delete-experience", async (req, res) => {
  try {
    const experience = await Expereince.findOneAndDelete({ _id: req.body._id });
    res.status(200).send({
      data: experience,
      success: true,
      message: "Experience deleated Succefully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

///////////////////////////  Add Project Portfoliod Data//////////////////

router.post("/add-project", async (req, res) => {
  try {
    const project = new Project({
      ...req.body,
      userId: req.body.userId  // ✅ Save userId
    });
    await project.save();
    res.status(200).send({
      data: project,
      success: true,
      message: "Project added Succefully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

///////////////////////////  update  Project Portfoliod Data//////////////////

router.post("/update-project", async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true },
    );
    res.status(200).send({
      data: project,
      success: true,
      message: "Project updated Succefully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

///////////////////////////   delete Project Portfoliod Data//////////////////

router.post("/delete-project", async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({ _id: req.body._id });
    res.status(200).send({
      data: project,
      success: true,
      message: "Project deleated Succefully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

///////////////////////////   Add Skills  Portfoliod Data//////////////////

router.post("/add-skills", async (req, res) => {
  try {
       // ✅ Validate userId
    if (!req.body.userId) {
      return res.status(400).send({
        data: null,
        success: false,
        message: "userId is required",
      });
    }
    
    const skill = new Skill({
      title: req.body.title,
      skills: req.body.skills,
      userId: req.body.userId, 
    });
    const newSkill = await skill.save();
    res.status(200).send({
      data: newSkill,
      success: true,
      message: "Skills added Succefully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

///////////////////////////  update  skills Portfoliod Data//////////////////

router.post("/update-skills", async (req, res) => {
  try {
    const { id, title, skills } = req.body;
    const updatedSkill = await Skill.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true },
    );
    res.status(200).send({
      data: updatedSkill,
      success: true,
      message: "Skills updated successfully.",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "An error occurred while updating skills.",
      error: error.message,
    });
  }
});

///////////////////////////   delete skills Portfoliod Data//////////////////

router.post("/delete-skills", async (req, res) => {
  try {
    const deletedSkill = await Skill.findOneAndDelete({ _id: req.body._id });
    res.status(200).send({
      data: deletedSkill,
      success: true,
      message: "Skills deleted successfully.",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "An error occurred while deleting skills.",
      error: error.message,
    });
  }
});

router.post("/add-education", async (req, res) => {
  try {
    const eduCation = new Education({
      ...req.body,
      userId: req.body.userId  // ✅ Save userId
    });
    await eduCation.save();
    res.status(200).send({
      data: eduCation,
      success: true,
      message: "Education added Succefully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

///////////////////////////  update  Education Portfoliod Data//////////////////

router.post("/update-education", async (req, res) => {
  try {
    const eduCation = await Education.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true },
    );
    res.status(200).send({
      data: eduCation,
      success: true,
      message: "Education updated Succefully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

///////////////////////////   delete Education Portfoliod Data//////////////////

router.post("/delete-education", async (req, res) => {
  try {
    const eduCation = await Education.findOneAndDelete({ _id: req.body._id });
    res.status(200).send({
      data: eduCation,
      success: true,
      message: "Education deleated Succefully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});



router.get("/get-portfolio/:name", async (req, res) => {
  try {
    const { name } = req.params;
    // console.log("Received name parameter:", name); // Debug log to check the received name
    // Step 1: Find user by first name (case-insensitive)
    const user = await User.findOne({
      firstName: { $regex: new RegExp(name, "i") },
    });
    // console.log("user found Found user ID:", user);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `No user found with name: ${name}`,
      });
    }
    const userId = new mongoose.Types.ObjectId(user._id);
    // const userId = user._id;
    // console.log("Found user ID:", userId); // Debug log to check the found user ID
    // // Step 2: Fetch all portfolio data linked to this user
    const [Intros, Projects, Educations, Experiences, Skills] =
      await Promise.all([
        Intro.find({ userId }),
        Project.find({ userId }),
        Education.find({ userId }),
        Expereince.find({ userId }),
        Skill.find({ userId }),
      ]);
    // Step 3: Build same response format as /get-portfolio
    const userProfile = {
      intro: Intros[0] || null,
      projects: Projects,
      education: Educations,
      experience: Experiences,
      skills: Skills,
    };
    // console.log("Fetched getby user profile data:", userProfile); // Debug log to check fetched data
    res.status(200).json({
      success: true,
      message: `Portfolio data fetched successfully for: ${name}`,
      data: userProfile,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
      stack: error.stack,
    });
  }
});

module.exports = router;
