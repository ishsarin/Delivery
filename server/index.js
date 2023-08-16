const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { Socket } = require("dgram");

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("send_message", (data) => {
    // console.log(data);
    socket.broadcast.emit("sent_from_man",data);
  });

  socket.on("message-from-man-to-back",(message)=>{
    console.log(message)
    socket.broadcast.emit("message-from-back-to-tran",message);
  })
  socket.on("message-from-tran-to-back",(message)=>{
    console.log(message)
    socket.broadcast.emit("message-from-back-to-man",message);
  })

});

server.listen(3001, () => {
  console.log("Server Running");
});
