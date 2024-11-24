import express from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  }
})

const __dirname = dirname(fileURLToPath(import.meta.url));

// app.get("/", (req, res) => {
//   res.sendFile(join(__dirname, "index.html"));
// });

io.on("connection", (socket) => {
  socket.on("foo", (msg) => {
    io.emit("foo", msg);
  });
});

// io.on("connection", (socket) => {
//   socket.on("private_message", (content, to) => {
//     socket.to(to).emit("private_message", {
//       content,
//       from: socket.id,
//     });
//     console.log("hey from server");
    
//   });
// });

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});