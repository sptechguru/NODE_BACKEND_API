const mongoose = require("mongoose");
const validator = require("validator");

const authTWoFASchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        // maxlength: 8,
    },

    isMfaActive: {
        type: Boolean,
        default: false
    },

    twoFactorSecret: {
        type: String,
    },


    timeStamps: {
        type: Date,
        default: Date.now
    }

});
 


const userAuthTwofRegistion = new mongoose.model("newUsers", authTWoFASchema);
// Register is colllection Name is only accepts singular form after that changes in Plural
module.exports = userAuthTwofRegistion;