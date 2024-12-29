const express = require('express');

const {createNotification} = require('../Controllers/notificationController');

const router = express.Router();

router.post("/", createNotification);

module.exports = router;