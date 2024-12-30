const notificationModel = require('../Models/notification');

const createNotification = async(req, res) => {
    try {
        const {senderId, isRead, date} = req.body;
        let notification = new notificationModel({senderId, isRead, date});
        await notification.save();
        res.status(200).json(notification);
    } catch(err){
        res.status(500).json({message: err.message});
    }
}

const getNotifications = async(req, res) => {
    try {
        const notifications = await notificationModel.find({senderId: req.params.senderId});
        res.status(200).json(notifications);
    } catch(err){
        res.status(500).json({message: err.message});
    }
}

const markNotificationAsRead = async(req, res) => {
    try {
        const notification = await notificationModel.findById(req.params.id);
        notification.isRead = true;
        await notification.save();
        res.status(200).json(notification);
    } catch(err){
        res.status(500).json({message: err.message});
    }
}


module.exports = {createNotification, getNotifications, markNotificationAsRead};