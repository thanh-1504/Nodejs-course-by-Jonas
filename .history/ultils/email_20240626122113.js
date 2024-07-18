const nodemailer = require('nodemailer');
const sendEmail = options => {
    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 25,
        auth: {
            user: process.env.USERNAME_EMAIL,
            pass
        }
    })
}