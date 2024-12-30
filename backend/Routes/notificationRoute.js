const express = require('express');

const {createNotification, getNotifications, markNotificationAsRead, markAllNotificationsAsRead} = require('../Controllers/notificationController');

const router = express.Router();

router.post("/", createNotification);
router.get("/:senderId", getNotifications);
router.post("/markAsRead/:id", markNotificationAsRead);
router.post("/markAllAsRead/:senderId", markAllNotificationsAsRead);

module.exports = router;