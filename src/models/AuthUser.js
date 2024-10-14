const mongoose = require("mongoose");

const userAuthSchema = new mongoose.Schema({
    
    userName: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    imfaActive: {
        type: Boolean,
        required: false,
    },

    twoFactorSecret: {
        type: String,
    },

    timeStaps: true,
});

////////// We will create for Collection  data based Schema  for Models.///////////
const user2FaModel = new mongoose.model("UsersAuth", userAuthSchema);

module.exports = user2FaModel;
