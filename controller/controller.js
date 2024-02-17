let userModel = require("../database/user");
const mongoose = require("mongoose");
let notificationModel = require("../database/notification");
let friendModel = require("../database/friend");
let postsModel = require("../database/posts");
let wallModel = require("../database/wall");
let newsfeedModel = require("../database/newsfeed");
let commentModel = require("../database/comment");

const { response, responseError } = require("../controller/response");

const bcrypt = require("bcrypt");

let register = (req, res) => {
  var { username, password, name, yob, gender, address } = req.body;
  userModel
    .findOne({ username: username })
    .then((data) => {
      if (data) {
        let msg = "Duplicated username";
        return responseError(res, msg, 409);
      } else {
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, function (err, hashPassword) {
          userModel
            .create({
              username: username,
              password: hashPassword,
              name: name,
              gender: gender,
              address: address,
              yob: yob,
            })
            .then((data) => {
              const { password, ...other } = data._doc;
              response(res, other);
            });
        });
      }
    })
    .catch((err) => {
      responseError(res, err, 500);
    });
};
let findUser = (req, res, next) => {
  let dieuKienLoc = req.body;
  let queryConditions = {};
  Object.keys(dieuKienLoc).forEach((key) => {
    queryConditions[key] = dieuKienLoc[key];
  });
  userModel
    .find(queryConditions)
    .then((data) => {
      return response(res, data);
    })
    .catch((err) => {
      responseError(res, err);
    });
};
let createPosts = (req, res, next) => {
  let { userID, type, content } = req.body;
  postsModel
    .create({ userID: userID, type: type, content: content })

    .then((data) => {
      response(res, data);
    })
    .catch((err) => {
      responseError(res, err);
    });
};
let getPosts = (req, res, next) => {
  let userID = req.body;

  postsModel
    .find({ userID: userID })
    // .populate([{ path: "userID" }])
    .then((data) => {})
    .catch((err) => {
      responseError(res, err);
    });
};
let getAllPosts = (req, res, next) => {
  postsModel
    .find()
    .populate([{ path: "userID" }])
    .then((data) => {
      response(res, data);
    })
    .catch((err) => {
      console.log(err);
      responseError(res, err);
    });
};
module.exports = { register, findUser, createPosts, getPosts, getAllPosts };
