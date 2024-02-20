let controllerSocket = require("./controllerSocket");
let socket = (app, server) => {
  let io = require("socket.io")(server, {
    cors: {
      origin: "*",
    },
  });
  io.on("connection", (socket) => {
    socket.on("set_userID", controllerSocket.setUserID);
    socket.on("create_comment", controllerSocket.createComment);
    socket.on("send_friend", controllerSocket.sendFriend);
    socket.on("load_friend_list", controllerSocket.loadFriend);
    //can truyen vao userID, tra ve friendList
    socket.on("load_notification", controllerSocket.loadNotification);
    //tra ve list nguoi da add minh
  });
};

module.exports = socket;
