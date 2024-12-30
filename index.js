const express = require("express");
const session = require("express-session");
const passport = require("passport");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
require("./src/db/clusterdb_server.js").connectDB();
require("./src/Auth2Fa/Auth_Config/passportConfig.js");
const cutomerRouter = require("./src/routes/customer_view");
const studentRouter = require("./src/routes/student");
const portfolioRouter = require("./src/routes/myportfolio_View");
const RegisterRouter = require("./src/routes/Register");
const EmployeeRouter = require("./src/routes/employee_view");
const aut2FaRouter = require("./src/Auth2Fa/Routes/auth2fa_view");
const dotenvFlow = require("dotenv-flow");
dotenvFlow.config();
app.use(bodyParser.json());
const port = process.env.PORT || 5000;
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const csrf = require("csurf");
app.use("*", cors());
app.use(helmet());

app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "SptechDEVE", // Use a strong and unique secret key
    resave: false, // Don't save session if unmodified
    saveUninitialized: false, // Don't create a session until something is stored
    //cookie: { secure: false }  // If using HTTPS, set this to true
  })
);

// Initialize Passport middleware (if using Passport for authentication)
app.use(passport.initialize());
app.use(passport.session());

// app.use((req, res, next) => {
//   res.setHeader(
//     // "Access-Control-Allow-Origin",`${process.env.API_PROd_BASEURL}`
//     "Access-Control-Allow-Origin",`*`

//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
//   );
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   res.setHeader("Access-Control-Allow-Private-Network", true);
//   //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
//   res.setHeader("Access-Control-Max-Age", 7200);

//   next();
// });

const csrfProtection = csrf();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.json());

app.use(bodyParser.json());

// implemention Swagger Api Documetion
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
// app.use("/api/2f-auth", aut2FaRouter);
app.use("/api/v1",RegisterRouter,aut2FaRouter,cutomerRouter,EmployeeRouter,studentRouter);
app.use("/sptech/api", portfolioRouter);

const swagerOptions = {
  // explorer: false,
  // customCss: ".swagger-ui .topbar { display: none }",
  swaggerOptions: {
    validatorUrl: null,
  },
};

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument, swagerOptions));

app.listen(port, () => {
  console.log(
    `Your Connection  ${process.env.ENV} Server & Base Url is ${process.env.APIBASEURL} is Success & Port Number is:${port}`
  );
});
