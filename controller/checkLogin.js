let userModel = require("../database/user");
let { response, responseError } = require("../controller/response");
let bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
require("dotenv").config();
const passToken = process.env.SECRECT;
let checkLogin = (req, res, next) => {
  let { username, password } = req.body;
  console.log(req.body);
  // console.log("gggg: " + username, password);
  userModel
    .findOne({ username: username })
    .then((data) => {
      if (!data) {
        responseError(res, "Wrong username or password");
      } else {
        let passwordDB = data.password;

        bcrypt.compare(password, passwordDB).then((comparePassword) => {
          if (!comparePassword) {
            responseError(res, "Wrong username or password");
          } else {
            var id = data._id.toString();
            let token = jwt.sign({ id }, passToken, {
              expiresIn: "365d",
            });
            const { password, ...other } = data._doc;
            console.log("pass login");
            // return res.json({ message: "login success", token: token });
            return response(res, token);
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      responseError(res, err, 500);
    });
};
module.exports = checkLogin;
