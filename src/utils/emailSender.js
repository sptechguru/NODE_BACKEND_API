const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");

const emailSendUser = async (toEmail, hed_Title,templateName,context = {}) => {
  try {
    const transporterEmail = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const templatePath = path.resolve(__dirname, "../templates",`${templateName}.ejs`);
    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template file not found: ${templatePath}`);
    }

    const htmlContent = await ejs.renderFile(templatePath, context);

    const mailOptions = {
      from: `"Your Company" <${process.env.EMAIL}>`,
      to: toEmail,
      subject: hed_Title,
      html: htmlContent,
    };

    const emailSend = await transporterEmail.sendMail(mailOptions);
    console.log("✅ Email sent:", emailSend.response);
    return emailSend;
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw error;
  }
};

module.exports = emailSendUser;
