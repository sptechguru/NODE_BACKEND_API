const mongoose = require("mongoose");

const username = "test123";
const password = "pal123";
const cluster = "cluster0.bjxrmbt";
const dbname = "demodb";
const mernPort = 'mongodb+srv://santoshpal9816:sRvZfG8e21LKwFNN@cluster0.cnvo4ov.mongodb.net/mern-portfolio-db?ssl=true';
const base_Url = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`;
const clusterUrl = "mongodb+srv://test123:pal123@$cluster0.bjxrmbt.mongodb.net/demodb?retryWrites=true&w=majority";

mongoose.connect(mernPort);

// console.log(mernPort)

const connection = mongoose.connection

connection.on('error', () => {
  console.log("Error has been failed");
});


connection.on('connected', () => {
  console.log("Data Base connected Succefully", mernPort);
});


module.exports = connection;


// mongoose
// .connect(mernPort, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   // useCreateIndex:true,
// });

// .then(() => {
//   console.log(
//     `Good Job Your Cluster Live Data Base connection is  Successfully.${mernPort}`
//   );
// })
// .catch((err) => {
//   console.log("............. No connection ..............." + err);
// });
