const express = require('express');
const { sendVerificationMail, test, verifyCode } = require('../controllers/authentication/google');
const router = express.Router();

router.post("/send-code", sendVerificationMail);

router.post("/verify-code", verifyCode);

module.exports = router;