const swaggerAutogen = require("swagger-autogen")();
require("dotenv").config();
const dotenvFlow = require("dotenv-flow");
dotenvFlow.config();

console.log(`${process.env.APIBASEURL}`)

const docOptions = {
  info: {
    title: "Sptech Node Backend Crud API",
    description: "Node.js API provides a secure authentication and authorization system, featuring user signup, login, and email verification. It supports role-based access control (RBAC) to manage user roles, ensuring granular permission management. The API leverages Bearer token authentication for secure session handling and token-based authorization, ensuring only verified users can access protected resources. Designed for scalability, it offers robust security, including JWT token issuance and validation.",
  },
  host: `${process.env.APIBASEURL}api/v1`,
};

const outputFile = "./swagger-output.json";
const routes = [
  "./src/routes/Register.js",
  "./src/Auth2Fa/Routes/auth2fa_view.js",
  "./src/routes/customer_view.js",
  "./src/routes/employee_view.js",
  "./src/routes/student.js",
];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */
swaggerAutogen(outputFile, routes, docOptions);
