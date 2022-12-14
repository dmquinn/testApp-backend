const app = require("./app");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

server.listen(5005, () => {
  console.log("SERVER IS RUNNING");
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.use((socket, next) => {
  console.log(socket.handshake.auth);
  const username = socket.handshake.auth.userName;
  console.log(username);
  socket.username = username;
  next();
});

io.on("connection", (socket) => {
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.username,
      key: id,
    });
  }
  socket.emit("users", users);
  console.log(users);

  socket.broadcast.emit("user connected", {
    userID: socket.id,
    username: socket.username,
    key: socket.id,
    self: false,
  });

  socket.on("private message", ({ content, to }) => {
    console.log("Content:", content, " To:", to);
    socket.to(to).emit("private message", {
      content,
      from: socket.id,
    });
  });
});
