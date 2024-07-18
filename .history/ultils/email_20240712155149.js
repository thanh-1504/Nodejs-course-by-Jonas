const nodemailer = require("nodemailer");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `Nhat Thanh Duong <${process.env.EMAIL_FROM}>`;
  }
  createTransport() {
    if (process.env.NODE_ENV === 'production') return 1;
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
