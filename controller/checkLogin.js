let userModel = require("../database/user");
let { response, responseError } = require("../controller/response");
let bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
require("dotenv").config();
const passToken = process.env.SECRECT;
let checkLogin = (req, res, next) => {
  let { username, password } = req.body;
  userModel
    .findOne({ username: username })
    .then((data) => {
      if (!data) {
        responseError(res, "Wrong username or password");
      } else {
        let passwordDB = data.password;

        bcrypt.compare(password, passwordDB).then((data) => {
          var id = data._id.toString();
          let token = jwt.sign({ id }, passToken, {
            expiresIn: "365d",
          });
          const { password, ...other } = data._doc;
          // req.user = { data: { ...other }, token: token };
          console.log("pass login");

          return res.json({ message: "login success", token: token });
        });
      }
    })
    .catch((err) => {
      console.log(err);
      responseError(res, err, 500);
    });
};
module.exports = checkLogin;
