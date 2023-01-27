const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 4000;

const cors = require("cors");

app.use(
  cors({
    origin: ["http://127.0.0.1:5173"],
    optionsSuccessStatus: 200,
  })
);

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.get("/", (req, res) => {
  res.send("hello from simple server :)");
});

io.on("connection", (socket) => {
  socket.on("message", (data) => {
    console.log(data);
    socket.broadcast.emit("message", data);
  });
});

server.listen(port, () =>
  console.log("> Server is up and running on port : " + port)
);
