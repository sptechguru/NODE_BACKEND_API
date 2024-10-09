const mongoose = require("mongoose");

const mernPort = process.env.LIVEDB;

mongoose
  .connect(mernPort, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex:true,
  })

  .then(() => {
    console.log(
      `Good Job Your Cluster Live Data Base connection is  Successfully.${mernPort}`
    );
  })
  .catch((err) => {
    console.log("............. No connection ..............." + err);
  });
