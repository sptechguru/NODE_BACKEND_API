const mongoose = require("mongoose");
require("dotenv").config();
const dotenvFlow = require("dotenv-flow");
dotenvFlow.config();

exports.connectDB = async () => {
  try {
    const DBURL = process.env.LIVEDB;
    const res = await mongoose.connect(DBURL);
    console.log(
      "Good Job Your Data Base connection is Successfully Connected.? " + DBURL
    );
  } catch (error) {
    console.log(
      "............. No  Data Base connection ..............." + error
    );
  }
};
