const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({

  _id: mongoose.Schema.Types.ObjectId,

  username: {
    type: String,
    required: true,
    minlength: 3,
  },

  email: {
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

  phone: {
    type: Number,
    required: true,
    // minlength: 10,
    // maxlength: 12,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    // minlength: 8,
  },

  userType: {
    type: String,
    // required: true
  }
});


////////// We will create for Collection  data based Schema  for Models.///////////

const userModel = new mongoose.model("user", userSchema);

module.exports = userModel;

