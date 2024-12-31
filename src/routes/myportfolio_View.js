const router = require("express").Router();
const profiledata = require("../db/portfolio_data");
const {
  Intro,
  About,
  Project,
  Education,
  Expereince,
  Skill,
} = require("../models/portFolio");
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });
const cacheKey = "myData";

/////////////////////////// get all Portfoliod Data//////////////////

// router.get("/", (req, res) => {
//   res.send("My Portfolio get Route is Activated")
// });

// router.get("/portfolio", (req, res) => {
//   res.json(profiledata);
// });

router.get("/get-portfolio", async (req, res) => {
  // if (cache.has(cacheKey)) {
  //   console.log('Fetching data from cache..');
  //   return res.json(cache.get(cacheKey)); // Return cached data
  // }
  // else{
  //   console.log('fetch called......')
  // }
  try {
    const Intros = await Intro.find();
    // const abouts = await About.find();
    const Projects = await Project.find();
    const Educations = await Education.find();
    const Expereinces = await Expereince.find();
    const Skills = await Skill.find();
    const usrerProfile = {
      intro: Intros[0],
      // about: abouts[0],
      projects: Projects,
      education: Educations,
      experience: Expereinces,
      skills: Skills,
    };
    // cache.set(cacheKey, usrerProfile);
    res.status(200).send({
      data: usrerProfile,
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

router.post("/update-intro", async (req, res) => {
  try {
    const intro = await Intro.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: intro,
      success: true,
      message: "Intro Updated Succefully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

///////////////////////////  about update Portfoliod Data///////////////////

// router.post("/update-about", async (req, res) => {
//   try {
//     const about = Intro.findOneAndUpdate(
//       { _id: req.body._id }, req.body, { new: true }
//     );
//     res.status(200).send({
//       data: about,
//       success: true,
//        message: "About Updated Succefully"
//     })
//   }
//   catch (error) {
//     res.status(500).send(error);
//   }
// })

///////////////////////////  Add Expereince Portfoliod Data//////////////////

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
    const skills = new Skill(req.body);
    await skills.save();
    res.status(200).send({
      data: skills,
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
    const skills = await Skill.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: skills,
      success: true,
      message: "Skills updated Succefully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

///////////////////////////   delete skills Portfoliod Data//////////////////

router.post("/delete-skills", async (req, res) => {
  try {
    const skills = await Skill.findOneAndDelete({ _id: req.body._id });
    res.status(200).send({
      data: skills,
      success: true,
      message: "Skills deleated Succefully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
