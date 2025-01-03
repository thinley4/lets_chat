const chatModel = require('../Models/chatModel');

// create chat
// get all users
// find chat


// Create a chat between two users
const createChat = async (req, res) => {
    const {firstId, secondId} = req.body;
    try {
        const chat = await chatModel.findOne({
            members: { $all: [firstId, secondId] }
        });
        if (chat) {
            return res.status(200).json(chat);
        }
        const newChat = new chatModel({
            members: [firstId, secondId]
        });
        const response = await newChat.save();
        res.status(200).json(response);

    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

// Get chat of one user with other users

const findUserChats = async (req, res) => {
    const {userId} = req.params;
    try {
        const chats = await chatModel.find({
            members: { $in: [userId] },
        });
        res.status(200).json(chats);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

// Find chat between two users
const findChat = async (req, res) => {
    const {firstId, secondId} = req.params;
    try {
        const chat = await chatModel.findOne({
            members: { $all: [firstId, secondId] }
        });
        res.status(200).json(chat);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

module.exports = {createChat, findUserChats, findChat};