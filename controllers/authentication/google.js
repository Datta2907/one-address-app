const OTP = require("../../models/otp");
const generateOtp = require("../../utils/createOtp");
const mailSender = require('../../utils/mailSender');

exports.sendVerificationMail = async (req, res) => {
    try {
        const { email } = req.body;
        const otp = await generateOtp(email);
        const mailResponse = await mailSender(
            email,
            "OTP Verification Email",
            `<h1>Please confirm your OTP</h1>
           <p>Here is your OTP code: ${otp.otp}</p>`
        );
        console.log("Email sent successfully: ", mailResponse);
        return res.status(201).json(mailResponse);
    } catch (error) {
        console.log("Error occurred while sending email: ", error.message);
        return res.status(500).json({ success: false, error: error.message })
    }
}

exports.verifyCode = async (req, res) => {
    try {
        const { email, userOtp } = req.body;
        const otp = await OTP.findOne({ email }).lean();
        if (otp && otp.otp === userOtp) {
            return res.status(200).json({ success: true, message: "User Verified" });
        }
        else {
            return res.status(200).json({ success: false, message: "Code Invalid Or Expired, Please Try Again!" });
        }
    } catch (err) {
        console.log("Error occurred while verifying otp: ", err.message);
        return res.status(500).json({ success: false, error: err.message })
    }
}