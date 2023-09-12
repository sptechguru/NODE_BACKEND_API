const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,   
    secureConnection: false,             // true for 465, false for other ports
    // service:"hotmail",
    tls: {
      ciphers:'SSLv3'  // TLS requires secureConnection to be f
   },
    auth: {
        user: 'outlook_91AC005BECE74A45@outlook.com',
        pass: 'pal123@#'
    },
    // secure: true
});


const options = {
    from: 'outlook_91AC005BECE74A45@outlook.com',  // sender address
    // to: 'akanksha.mightquite@gmail.com',
    to: 'palsantosh1698@gmail.com',   // list of receivers
       // list of receivers
    subject: 'Sending Email using Node.js',
    text: 'That was easy!',
    html: `<b>Hey there! </b>
                 <br> This is our first message sent with Nodemailer<br/>`,
}


transporter.sendMail(options, function (err, info) {
    if(err)
      console.log('error show',err)
    else
      console.log('info',info);
 });
