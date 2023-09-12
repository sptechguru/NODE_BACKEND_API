const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({

  // _id: mongoose.Schema.Types.ObjectId,

  cloudnary_Pic_id: {
    type: String,
  },

  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true
  },

  email_Id: {
    type: String,
    required: true

  },

  phone_Number: {
    type: Number,
    required: true,
    minlength: 10,
    maxlength: 10,
    unique: true,
  },

  dob: {
    type: String,
    // required: true,
  },

  education: {
    type: String,
    // required: true,
  },

  company: {
    type: String,
    // required: true,
  },


  jobExperience: {
    type: Number,
    // required: true,
  },

  salary: {
    type: Number,
    required: true
  },

  photo: {
    type: String,
  },
});

let emp = new mongoose.model("employee", employeeSchema);

module.exports = emp;
