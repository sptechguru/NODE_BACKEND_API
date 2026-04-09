const router = require("express").Router();
require("dotenv").config();
const dotenvFlow = require("dotenv-flow");
dotenvFlow.config();
const profiledata = require("../db/portfolio_data");
const { Intro, Project,Education,Expereince,Skill } = require("../models/portFolio");
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });
const cacheKey = "myData";
const upload = require("../utils/multer"); // your production multer
const cloudinary = require("../utils/cloudinary");
const streamifier = require("streamifier");
const fetch = require("node-fetch");

//////////////////Add Ai chatBoat Features///////////////////////

const SYSTEM_PROMPT = `You are an AI assistant embedded in Santosh Pal's developer portfolio website.
Santosh is a JavaScript Full Stack Developer skilled in React.js, Node.js, Express, MongoDB, and more.
Answer visitor questions about Santosh's work, skills, and projects in a friendly, concise tone.
If asked something unrelated, gently steer back to portfolio-related topics.
Keep responses short and readable — ideally 2-4 sentences unless a detailed list is requested.`;


router.post("/ai-chatBoat", async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "messages array is required" });
  }
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 600,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });
    const data = await response.json();
    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }
    const reply = data?.content?.[0]?.text || "No response.";
    res.json({ reply });
  } catch (err) {
    console.error("Claude API error:", err);
    res.status(500).json({ error: "Failed to reach Claude API" });
  }
});



/////////////////////////// get all Portfoliod Data//////////////////

router.get("/get-portfolio",async (req, res) => {
  try {
    const Intros = await Intro.find();
    const Projects = await Project.find();
    const Educations = await Education.find();
    const Expereinces = await Expereince.find();
    const Skills = await Skill.find();
    const userProfile = {
      intro: Intros[0],
      projects: Projects,
      education: Educations,
      experience: Expereinces,
      skills: Skills,
    };
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
            }
          );

          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });

      const result = await streamUpload();

      // Save image URL in update object
      updateData.profile_url = result.secure_url;
      // console.log("updates data url",updateData.profile_url)
    }

    // ✅ Update document
    const intro = await Intro.findByIdAndUpdate(
      _id,
      updateData,
      { new: true, runValidators: true }
    );

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


router.post("/add-experience", async (req, res) => {
  try {
    const experience = new Expereince(req.body);
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
      { new: true }
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
    const project = new Project(req.body);
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
      { new: true }
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
    const skill = new Skill({
      title: req.body.title,
      skills: req.body.skills,
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
      { new: true }
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
    const eduCation = new Education(req.body);
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
      { new: true }
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

// router.get("/", (req, res) => {
//   res.send("My Portfolio get Route is Activated")
// });

// router.get("/portfolio", (req, res) => {
//   res.json(profiledata);
// });

module.exports = router;
