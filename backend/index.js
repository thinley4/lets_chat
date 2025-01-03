const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require('./Routes/userRoute');
const chatRoute = require('./Routes/chatRoute');
const messageRouter = require('./Routes/messageRoute');
const notificationRouter = require('./Routes/notificationRoute');

require('dotenv').config();
const port = process.env.PORT || 3000;


const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoute);
app.use('/api/chats', chatRoute);
app.use('/api/messages', messageRouter);
app.use('/api/notifications', notificationRouter);


app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

mongoose.connect(process.env.MongoURI).then(() => {
    console.log('Connected to the Database successfully');
}).catch(err => console.log(err));