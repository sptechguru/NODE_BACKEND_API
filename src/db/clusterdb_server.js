const mongoose = require("mongoose");
require("dotenv").config();
const dotenvFlow = require("dotenv-flow");
dotenvFlow.config();

exports.connectDB = async () => {
  try {
    // const DBURL = process.env.LIVEDB;
    const DBURL = 'mongodb+srv://santoshpal61437:pal883910@cluster0.dziy7.mongodb.net/NEW_MEANDB';

    const res = await mongoose.connect(DBURL);
    console.log(
      "Good Job Your Cluster Data Base connection is Successfully  Connected.? " + DBURL
    );
  } catch (error) {
    console.log(
      "............. No  Data Base connection ..............." + error
    );
  }
};
