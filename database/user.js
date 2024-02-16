const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { GENDER } = require("../const");

const userSchema = new Schema(
  {
    username: { type: String, min: 1, max: 50 },
    password: { type: String, min: 1, max: 50 },
    yob: { type: Date },
    address: { type: String, max: 100 },
    // nickname: { type: String, min: 1, max: 20, match: /^[a-zA-Z0-9]{2,20}$/ },
    name: { type: String, min: 2, max: 20 },
    gender: {
      type: Number,
      enum: [GENDER.MEN, GENDER.WOMEN, GENDER.WOMEN],
      default: GENDER.MEN,
    },
  },
  { collection: "user", timestamps: true }
);
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
