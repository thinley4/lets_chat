const express = require('express');

const {createNotification, getNotifications, markNotificationAsRead} = require('../Controllers/notificationController');

const router = express.Router();

router.post("/", createNotification);
router.get("/:senderId", getNotifications);
router.post("/markAsRead/:id", markNotificationAsRead);

module.exports = router;