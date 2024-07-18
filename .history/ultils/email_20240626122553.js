const nodemailer = require("nodemailer");
const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 25,
    auth: {
      user: process.env.USERNAME_EMAIL,
      pass: process.env.USER_PASSWORD,
    },
  });
  const info = await transporter.sendMail({
    from: options.email,
    to: options.email,
    subject: options.subject,
    text: options.message,
  });
};
module.exports = sendEmail;
