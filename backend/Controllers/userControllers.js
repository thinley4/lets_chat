const userModel = require('../Models/useModel');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

require('dotenv').config();

const createToken = (_id) => {
    const jwtKey = process.env.JWT_SECRET;
    return jwt.sign({_id}, jwtKey, {expiresIn: '1h'});
}

const registerUser = async( req, res ) => {
    try {
        const {name, email, password} = req.body;
    
        let user = await userModel.findOne({email});
        if(user){
            return res.status(400).json({message: 'User already exists'});
        }
        if(!name || !email || !password){
            return res.status(400).json({message: 'Please enter all fields'});
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({message: 'Please enter a valid email'});
        }
        
        // register user
        user = new userModel({name, email, password});
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
    
        const token = createToken(user._id);
        
    
        res.status(200).json({_id: user._id, name: user.name, email: user.email, token});

    } catch(err){
        res.status(500).json({message: err.message});
    }
}

module.exports = {registerUser};