const express = require('express');
const { authenticateUser } = require('../middlewares/authenticateUser');
const { getAllCommunities } = require('../controllers/community');
const router = express.Router();

router.get("/list-in-cities", getAllCommunities)

module.exports = router;