const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { TYPE } = require("../const");
const newsfeedSchema = new Schema(
  {
    friendID: { type: mongoose.Schema.ObjectId, ref: "friendID" },
    postsID: { type: mongoose.Schema.ObjectId, ref: "posts" },
  },
  { collection: "newsfeed", timestamps: true }
);
const newsfeedModel = mongoose.model("newsfeed", newsfeedSchema);
module.exports = newsfeedModel;
