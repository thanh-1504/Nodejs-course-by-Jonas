const nodemailer = require('nodemailer');
const sendEmail = options => {
    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        
    })
}