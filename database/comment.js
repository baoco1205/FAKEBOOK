const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { TYPE } = require("../const");
const commentSchema = new Schema(
  {
    userCommentID: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: true,
    },
    comment: { type: String, max: 10000, min: 1, required: true },
    type: { type: Number, enum: [TYPE.TEXT, TYPE.IMAGE], default: 0 },
    postsID: { type: mongoose.Schema.ObjectId, ref: "posts" },
  },
  { collection: "comment", timestamps: true }
);
const commentModel = mongoose.model("comment", commentSchema);
module.exports = commentModel;
