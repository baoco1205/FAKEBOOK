const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { FRIEND_REQUEST } = require("../const");
const notificationSchema = new Schema(
  {
    senderID: { type: mongoose.Schema.ObjectId, ref: "user" },
    reciverID: { type: mongoose.Schema.ObjectId, ref: "user" },
    statusCode: {
      type: Number,
      max: 1,
      enum: [FRIEND_REQUEST.HANDLE, FRIEND_REQUEST.DENY],
      default: FRIEND_REQUEST.HANDLE,
    },
  },
  { collection: "notification", timestamps: true }
);
const notificationModel = mongoose.model("notification", notificationSchema);
module.exports = notificationModel;
