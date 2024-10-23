
const router = require("express").Router()
const profiledata = require('../db/portfolio_data');
// const router = new express.Router();
const { Intro, About, Project, Education, Expereince, Skill } = require("../models/portFolio");
/////////////////////////// get all Portfoliod Data//////////////////

// router.get("/", (req, res) => {
//   res.send("My Portfolio get Route is Activated")
// });

// // router.get('/portfolio', (req, res) => {
// //   res.json(profiledata);  // Send JSON data as the response
// // });

router.get("/get-portfolio", async (req, res) => {
  try {
    const Intros = await Intro.find();
    const abouts = await About.find();
    const Projects = await Project.find();
    const Educations = await Education.find();
    const Expereinces = await Expereince.find();
    const Skills = await Skill.find();
    const usrerProfile = {
      intro: Intros[0],
      about: abouts[0],
      projects: Projects,
      education: Educations,
      experience: Expereinces,
      skills: Skills
    }
    // console.log('All user Profile data', usrerProfile)
    res.status(200).send(usrerProfile);
  }
  catch (error) {
    res.status(500).send(error);
  }
});



///////////////////////////  Update Intro Portfoliod Data//////////////////
// router.post
router.post("/update-intro", async (req, res) => {
  try {
    const intro = Intro.findOneAndUpdate(
      { _id: req.body._id }, req.body, { new: true }
    ); res.status(200).send({
      data: intro,
      success: true,
      meassage: "Intro Updated Succefully"
    })
  }
  catch (error) {
    res.status(500).send(error);
  }
})



///////////////////////////  about update Portfoliod Data//////////////////

router.post("/update-about", async (req, res) => {
  try {
    const about = Intro.findOneAndUpdate(
      { _id: req.body._id }, req.body, { new: true }
    );
    res.status(200).send({
      data: about,
      success: true,
      meassage: "About Updated Succefully"
    })
  }
  catch (error) {
    res.status(500).send(error);
  }
})


///////////////////////////  Add Expereince Portfoliod Data//////////////////

router.post("/add-experience", async (req, res) => {
  try {
    const experience = new Expereince(req.body);
    await experience.save();
    res.status(200).send({
      data: experience,
      success: true,
      meassage: "Experience added Succefully"
    })
  }
  catch (error) {
    res.status(500).send(error);
  }
})



///////////////////////////  update  Expereince Portfoliod Data//////////////////

router.post("/update-experience", async (req, res) => {
  try {
    const experience = await Expereince.findOneAndUpdate(
      { _id: req.body._id }, req.body, { new: true }
    );
    res.status(200).send({
      data: experience,
      success: true,
      meassage: "Experience updated Succefully"
    })
  }
  catch (error) {
    res.status(500).send(error);
  }
})



///////////////////////////   Expereince delete Portfoliod Data//////////////////

router.post("/delete-experience", async (req, res) => {
  try {
    const experience = await Expereince.findOneAndDelete(
      { _id: req.body._id }
    );
    res.status(200).send({
      data: experience,
      success: true,
      meassage: "Experience deleated Succefully"
    })
  }
  catch (error) {
    res.status(500).send(error);
  }
})




///////////////////////////  Add Project Portfoliod Data//////////////////

router.post("/add-project", async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(200).send({
      data: project,
      success: true,
      meassage: "Project added Succefully"
    })
  }
  catch (error) {
    res.status(500).send(error);
  }
})



///////////////////////////  update  Expereince Portfoliod Data//////////////////

router.post("/update-project", async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.body._id }, req.body, { new: true }
    );
    res.status(200).send({
      data: project,
      success: true,
      meassage: "Project updated Succefully"
    })
  }
  catch (error) {
    res.status(500).send(error);
  }
})



///////////////////////////   delete Project Portfoliod Data//////////////////

router.post("/delete-experience", async (req, res) => {
  try {
    const project = await Project.findOneAndDelete(
      { _id: req.body._id }
    );
    res.status(200).send({
      data: project,
      success: true,
      meassage: "Project deleated Succefully"
    })
  }
  catch (error) {
    res.status(500).send(error);
  }
})


module.exports = router;
