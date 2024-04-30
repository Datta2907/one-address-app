const express = require('express');
const { register, getRepresentatives, getStatus, verifyUser } = require('../controllers/user');
const { authenticateUser } = require('../middlewares/authenticateUser');
const router = express.Router();

router.get("/representatives", authenticateUser, getRepresentatives)

router.get("/application-status", authenticateUser, getStatus);

router.post("/register", register);

router.post("/verify-user", authenticateUser, verifyUser);

module.exports = router;