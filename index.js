const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const cutomerRouter = require("./src/routes/customer_view");
const studentRouter = require("./src/routes/student");
const portfolioRouter = require("./src/routes/myportfolio_View");
const RegisterRouter = require("./src/routes/Register");
const EmployeeRouter = require("./src/routes/employee_view");
// const UseRouter = require("./src/Auth/user");
// require("./src/db/dbLocal_conn");
require("./src/db/clusterdb_server");

app.use(bodyParser.json());
const port = process.env.PORT || 5000;

const cors = require("cors");
const csrf = require("csurf");
app.use(cors("*"));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, access_token"
  );
  if ("OPTIONS" == req.method) {
    res.send(200);
    res.sendStatus(200);
  } else {
    next();
  }
});

// implemention Swagger Api Documetion

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
app.use("/api/v1/", RegisterRouter, cutomerRouter, EmployeeRouter, studentRouter,portfolioRouter);
// app.use("/user-auth", UseRouter);


const options = {
  // explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  swaggerOptions: {
    validatorUrl: null
  }
}

app.use("/swager-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

app.listen(port, () => {
  console.log(
    `Your Connection is Success And Port Number is: http://localhost:${port}`
  );
});
