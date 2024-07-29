const mongoose = require("mongoose");

const username = "test123";
const password = "pal123";
const cluster = "cluster0.bjxrmbt";
const dbname = "demodb";
const base_Url = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`;
const clusterUrl ="mongodb+srv://test123:pal123@$cluster0.bjxrmbt.mongodb.net/demodb?retryWrites=true&w=majority";

mongoose
  .connect(clusterUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(
      `Good Job Your Cluster Live Data Base connection is  Successfully.${clusterUrl}`
    );
  })
  .catch((err) => {
    console.log("............. No connection ..............." + err);
  });
