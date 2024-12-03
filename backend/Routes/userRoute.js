const express = require('express');
const {registerUser} = require('../Controllers/userControllers');
const {loginUser} = require('../Controllers/userControllers');
const {findUser} = require('../Controllers/userControllers');
const {getUsers} = require('../Controllers/userControllers');

const router = express.Router();

router.post('/register', registerUser); 
router.post('/login', loginUser);
router.get('/find/:userId', findUser);
router.get('/', getUsers);

module.exports = router;