const { Server } = require("socket.io");

const io = new Server({ cors: "http://localhost:5173" });

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("new connection", socket.id);

  // listen to connection
  socket.on("addNewUser", (userId) => {

    // If the user is not already in the onlineUsers array, add it
    if(!onlineUsers.some((user) => user.userId === userId)){
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });
    }
    
    io.emit("getOnlineUsers", onlineUsers);
  });

  // add message
  socket.on("sendMessage", (message) => {
    const user = onlineUsers.find((user) => user.userId === message.recipientId);
    if(user){
      io.to(user.socketId).emit("getMessage", message);

      io.to(user.socketId).emit("getNotification", {
        senderId: message.senderId,
        isRead: false,
        date: new Date(),
      });
      
    }
  })

  // listen to disconnection
  socket.on("disconnect", () => {
    // The disconnected user is removed from the onlineUsers array.

    // Before onlineUsers array had the all the users including the disconnected user.
    // Now, disconnected user is removed from the onlineUsers array.
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("getOnlineUsers", onlineUsers);
  });

});

io.listen(5000);
