const express = require('express');
const { login, register, getStatus } = require('../controllers/authentication/auth');
const { authenticateUser } = require('../middlewares/authenticateUser');
const router = express.Router();

router.get("/application-status", authenticateUser, getStatus);

router.post("/login", login);

router.post("/register", register);

module.exports = router;