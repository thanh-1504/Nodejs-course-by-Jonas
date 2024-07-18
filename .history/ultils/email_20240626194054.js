const nodemailer = require("nodemailer");
const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.USERNAME_EMAIL,
      pass: process.env.USER_PASSWORD,
    },
  });
  await transporter.sendEmail({
    from: "duongnhatthanh@testmail.com",
    to: options.email,
    sub
  });
};
module.exports = sendEmail;
