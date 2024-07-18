const nodemailer = require("nodemailer");
const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST;
    port: process.env.EMAIL_PORT
  })
}
module.exports = sendEmail;
