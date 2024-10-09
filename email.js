var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'santosh.mightquite@gmail.com',
    pass: 'pal123@#'
  }
});

var mailOptions = {
  from: 'santosh.mightquite@gmail.com ',
  to: 'palsantosh1698@gmail.com',
  subject: 'Sending Email using Node.js',
  text: `Hi Smartherd, thank you for your nice Node.js tutorials.
          I will donate 50$ for this course. Please send me payment options.`
  // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    // console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});