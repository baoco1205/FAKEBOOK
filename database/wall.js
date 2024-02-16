const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wallSchema = new Schema(
  {
    friendID: { type: mongoose.Schema.ObjectId, ref: "friend" },
    postsID: { type: mongoose.Schema.ObjectId, ref: "posts" },
    userID: { type: mongoose.Schema.ObjectId, ref: "user" },
  },
  { collection: "wall", timestamps: true }
);
const wallModel = mongoose.model("wall", wallSchema);
module.exports = wallModel;
