let socket = (app, server) => {
  let io = require("socket.io")(server, {
    cors: {
      origin: "*",
    },
  });
  io.on("connection", (socket) => {
    console.log("test");
  });
};

module.exports = socket;
