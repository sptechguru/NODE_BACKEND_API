require('dotenv').config();
const express = require("express");
const port = process.env.PORT || 3000;
require("./src/db/dbLocal_conn");
// require("./db/server");
fs = require('fs');
const studentRouter = require("./src/routes/student");
const RegisterRouter = require("./src/routes/Register");
const EmployeeRouter = require("./src/routes/employee_view");
const UseRouter = require('./src/Auth/user');

const cookieParser = require("cookie-parser");
const app = express();
const cors = require('cors');
const csrf = require('csurf');
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, access_token");
    if ('OPTIONS' == req.method) {
        // res.send(200);
        res.sendStatus(200);
    }
    else {
        next();
    }
});
const bodyParser = require('body-parser');
const customer = require("./src/routes/customer_view");
// const csrfProtection = csrf()

// console.log("secrekKey",process.env.SECRET_KEY);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());

app.use('/user', UseRouter);

app.use(RegisterRouter, studentRouter ,customer,EmployeeRouter);


app.listen(port, () => {
  console.log(
    `Your Connection is Success And Port Number is: https://localhost:${port}`
  );
});
