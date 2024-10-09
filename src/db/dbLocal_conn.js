const mongoose = require("mongoose");

const DataBase = process.env.LIVEDB;
// const ServerDb = process.env.LIVEDB;

mongoose
  .connect(DataBase, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    ssl: false,
  })
  .then(() => {
    console.log(`Good Job Your Data Base connection is Success. ${DataBase}`);
  })
  .catch((err) => {
    console.log("............. No connection DataBase ..............." + err);
  });
