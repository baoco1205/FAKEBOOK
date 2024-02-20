let commentModel = require("../database/comment");
let friendModel = require("../database/friend");
let notificationModel = require("../database/notification");
let { FRIEND_REQUEST } = require("../const");
let createComment = (data) => {
  let type = socket.type;
  let userID = socket.userID;
  let comment = socket.comment;
  let postsID = socket.postsID;
  commentModel
    .create({ postsID: postsID, type: type, userID: userID, comment: comment })
    .then((data) => {
      io.sockets.emit("serverResComment", data);
    })
    .catch((err) => {
      socket.emit("err", err);
    });
};
let sendFriend = (data) => {
  let senderID = socket.userID;
  let reciverID = data.reciverID;
  friendModel
    .findOne({
      $or: [
        { userID1: senderID, userID2: reciverID },
        { userID1: reciverID, userID2: senderID },
      ],
    })
    .then((data) => {
      if (data) {
        let msg = "Already friend with user before";
        socket.emit("error", msg);
      } else {
        notificationModel
          .create({
            senderID: senderID,
            reciverID: reciverID,
            statusCode: FRIEND_REQUEST.HANDLE,
          })
          .then((data) => {
            notificationModel.find({ senderID: senderID }).then((data) => {
              socket.emit("serverSendFriendRequestList", {
                friendRequests: data,
              });
            });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      socket.emit("error", err);
    });
};
let loadFriend = (data) => {
  let userID = data.userID;
  friendModel
    .find({ $or: [{ userID1: userID }, { userID2: userID }] })
    .then((data) => {
      let friendList = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].userID1 === userID) {
          friendList.push(data[i].userID2);
        } else friendList.push(data[i].userID1);
      }
      socket.emit("serverSendFriendList", { friendList: friendList });
    })
    .catch((err) => {
      socket.emit("error", err);
    });
};
let loadNotification = (data) => {
  let userID = socket.userID;
  notificationModel.find();
};
let setUserID = (data) => {
  let userID = data.userID;
  socket.userID = userID;
};
module.exports = {
  createComment,
  sendFriend,
  loadFriend,
  loadNotification,
  setUserID,
};
