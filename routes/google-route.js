const express = require('express');
const { sendVerificationMail, verifyCode, verifyIdToken } = require('../controllers/authentication/google');
const router = express.Router();

router.get("/send-code", sendVerificationMail);

router.get("/verify-id-token", verifyIdToken)

router.post("/verify-code", verifyCode);

module.exports = router;