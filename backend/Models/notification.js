const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    senderId: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        required: false
    }
});

const notificationModel = mongoose.model("Notification", notificationSchema);

module.exports = notificationModel;