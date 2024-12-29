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

module.exports = {createNotification};