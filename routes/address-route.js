const express = require('express');
const { authenticateUser } = require('../middlewares/authenticateUser');
const { getAllAddresses } = require('../controllers/address');
const router = express.Router();

router.get("/all-addresses-of-user", authenticateUser, getAllAddresses)

module.exports = router;