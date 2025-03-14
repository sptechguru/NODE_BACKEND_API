const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const RegiStationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim:true
  },

  lastName: {
    type: String,
    required: true,
    trim:true
  },

  email: {
    type: String,
    required: true,
    minlength: 3,
    trim:true,
    unique: [true, "Email id already present"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email Id");
      }
    },
  },

  gender: {
    type: String,
    required: true,
    trim:true
  },

  phone_Number: {
    type: Number,
    required: true,
    minlength: 10,
    maxlength: 10,
    unique: true,
    trim:true
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
    trim:true
    // maxlength: 8,
  },

  roles: {
    type: String,
    enum:['USER',"ADMIN","EMPLOYEE"]
  },


  isVerified: {
    type: Boolean,
    default: false
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  
});



const userRegistion = new mongoose.model("Users", RegiStationSchema);
// Register is colllection Name is only accepts singular form after that changes in Plural
module.exports = userRegistion;



// // Now creating middleware using jwt token authrizations
// // RegiStationSchema.methods.AuthGenerateToken = async function () {
// //   try {
// //     const token = jwt.sign({ id: this._id.toString() }, process.env.SECRET_KEY);
// //     this.tokens = this.tokens.concat({ token: token });
// //     await this.save();
// //     console.log("Your Generate Token", token);
// //     return token;
// //   } catch (error) {
// //     console.log("token error from", error);
// //   }
// // };

// // Now using of Middleware for schema  before save method  calling method in pre()

// RegiStationSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     console.log(`Current password is ${this.password}`);
//     this.password = await bcrypt.hash(this.password, 10);
//     console.log(`Hash password is ${this.password}`);
//     this.confirm_password = await bcrypt.hash(this.password, 10);
//     this.email = this.email;
//     console.log("eeeeeeeeeeeeeeeeeeee", this.email);
//   }
//   next();
// });

