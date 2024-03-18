const otpGenerator = require('otp-generator');
const OTP = require('../models/otp');

const generateOtp = async (email) => {
    try {
        let otp = otpGenerator.generate(6, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false
        });
        return OTP.create({
            email,
            otp
        });
    } catch (err) {
        console.log(err.message);
    }
}

module.exports = generateOtp;