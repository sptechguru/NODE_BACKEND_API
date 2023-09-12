const mongoose = require("mongoose");


const customerSchema = new mongoose.Schema({

firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  email_Id: {
    type: String,
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
    required: true,
  },

  department: {
    type: String,
    required: true,
  },

});



let customer = new mongoose.model('customer',customerSchema)
module.exports = customer


