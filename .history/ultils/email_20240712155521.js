const nodemailer = require("nodemailer");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `Nhat Thanh Duong <${process.env.EMAIL_FROM}>`;
  }
  createTransport() {
    if (process.env.NODE_ENV === "production") return 1;
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.USERNAME_EMAIL,
        pass: process.env.USER_PASSWORD,
      },
    });
  }
  send(template,subject) {

  }

  sendWelcome() {
    this.send('welcome','Welcome to ')
  }
};
const sendEmail = async (options) => {
  await transporter.sendEmail({
    from: "duongnhatthanh@testmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
  });
};
module.exports = sendEmail;
