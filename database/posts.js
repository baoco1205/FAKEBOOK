const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { TYPE } = require("../const");
const postsSchema = new Schema(
  {
    userID: { type: mongoose.Schema.ObjectId, ref: "user" },
    content: { type: String, max: 10000 },
    type: { type: Number, enum: [TYPE.TEXT, TYPE.IMAGE], default: 0 },
  },
  { collection: "posts", timestamps: true }
);
const postsModel = mongoose.model("posts", postsSchema);
module.exports = postsModel;
