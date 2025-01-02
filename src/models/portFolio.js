const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const introSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  roles: [String],

  description: {
    type: String,
    required: true,
  },

  github: {
    type: String,
    required: true,
  },

  resume: {
    type: String,
    required: true,
  },

  linkedin: {
    type: String,
    required: true,
  },

  twitter: {
    type: String,
    required: true,
  },

  insta: {
    type: String,
    required: true,
  },

  facebook: {
    type: String,
    required: true,
  },
});

const skillSchema = new Schema({
  title: { type: String, required: true },
  skills: [
    {
      name: { type: String, required: true },
      image: { type: String, required: true },
    },
  ],
});

const experienceSchema = new Schema({
  id: { type: Number },
  img: { type: String },
  role: { type: String },
  company: { type: String },
  date: { type: String },
  desc: { type: String },
  skills: { type: [String] },
  doc: { type: String },
});

const educationSchema = new Schema({
  id: { type: Number },
  img: { type: String },
  school: { type: String },
  date: { type: String },
  grade: { type: String },
  desc: { type: String },
  degree: { type: String },
});

//  Project Schema for

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  img: {
    type: String,
    // required: true,
  },
  linkedin: {
    type: String,
    // required: true,
  },
  github: {
    type: String,
    // required: true,
  },
});

const projectSchema = new mongoose.Schema({
  id: {
    type: Number,
    // unique: true
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    // required: true
  },
  image: {
    type: String,
    // required: true
  },
  tags: {
    type: [String],
    required: true,
  },
  category: {
    type: String,
  },
  github: {
    type: String,
    required: true,
  },
  webapp: {
    type: String,
    // required: true
  },
  member: [memberSchema], // Array of members
});

//  All models Exports
module.exports = {
  Intro: mongoose.model("Intros", introSchema),
  Education: mongoose.model("Educations", educationSchema),
  Expereince: mongoose.model("Expereinces", experienceSchema),
  Skill: mongoose.model("Skills", skillSchema),
  Project: mongoose.model("Projects", projectSchema),
};
