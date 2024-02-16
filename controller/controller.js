let userModel = require("../database/user");
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
module.exports = { register };
