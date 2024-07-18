const nodemailer = require("nodemailer");
const pug = require("pug");
const htmlToText = require("html-to-text");
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
  send(template, subject) {
    // 1. Render HTML based on a pug template
    const filePug = pug.renderFile(
      `${__dirname}/..views/emails/${template}.pug`, {}
    );
    // 2. Define mail options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      filePug,
      text: htmlToText.fromString(filePug),
    };
    // 3. Create a transport and send mail
  }

  sendWelcome() {
    this.send("welcome", "Welcome to the Natours family");
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
