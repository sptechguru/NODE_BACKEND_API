const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "sptechpro",
  api_key: "569142431257534",
  api_secret: "63NM2H7zGdobZ9RYNqcL4HHycPE",
});
module.exports = cloudinary;