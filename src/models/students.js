const mongoose = require("mongoose");
const validator = require("validator");

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },

  email_Id: {
    type: String,
    required: true,
    minlength: 3,
    unique: [true, "Email id already present"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email Id");
      }
    },
  },

  phone_Number: {
    type: Number,
    required: true,
    minlength: 10,
    maxlength: 10,
    unique: true,
  },

  address: {
    type: String,
    required: true,
    minlength: 8,
  },

  profile_pic: { 
    type: String
    // required: true 
  }
});

////////// We will create for Collection  data based Schema  for Models.///////////

const Student = new mongoose.model("Student", StudentSchema);

module.exports = Student;
