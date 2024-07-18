const nodemailer = require("nodemailer");
const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 25,
    auth: {
      user: process.env.USERNAME_EMAIL,
      pass: process.env.USER_PASSWORD,
    },
  });
  const info = await transporter.sendMail({
    from: options.email,
    to: options.email,
    subject: options.subject
  })
};
module.exports = sendEmail;
