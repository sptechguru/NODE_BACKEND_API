const swaggerAutogen = require("swagger-autogen")();
require("dotenv").config();

const docOptions = {
  info: {
    title: "Sptech Node Backend Crud API",
    description: "I Full Stack Developer",
  },
  host: `localhost:${process.env.PORT}/api/V1`,
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
// const multipleRoutes = [employee];
const routes = [
  "./src/routes/Register.js",
  "./src/routes/customer_view.js",
  "./src/routes/employee_view.js",
  "./src/routes/student.js",
  "./src/routes/myportfolio_View.js",

];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */
swaggerAutogen(outputFile, routes, docOptions);
