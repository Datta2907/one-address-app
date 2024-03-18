const nodeMailer = require("nodemailer");

module.exports = async (email, title, message) => {
    try {
        let transporter = nodeMailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_ADDRESS,
                pass: process.env.MAIL_APP_PASSWORD,
            }
        });
        const mailOptions = {
            from: process.env.MAIL_ADDRESS,
            to: email,
            subject: title,
            html: message,
        }
        let sentMail = await transporter.sendMail(mailOptions)
        console.log("Email info:", sentMail);
        return sentMail;
    } catch (err) {
        console.log(err.message);
    }
}
