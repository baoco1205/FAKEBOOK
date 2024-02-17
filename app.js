//setup server
let express = require("express");
let app = express();
app.use(express.static("./FE/public"));
require("dotenv").config();
let port = process.env.PORT;
let router = require("./router/router");

let server = require("http").Server(app);

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//catch error
app.use((err, req, res, next) => {
  var statusCode = err.statusCode;
  var message = err.messageErr;
  res.status(statusCode).json(message);
});
app.use("", router);
// /server connect database
let databaseUtil = require("./utils/database.utils");
databaseUtil.connect(function (err) {
  if (err) response.responseError(res, err, 500);
});
///cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // Cho phép tất cả các origin
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE"); // Cho phép các phương thức HTTP
  res.header("Access-Control-Allow-Headers", "Content-Type", "*"); // Cho phép header Content-Type
  next();
});
const cors = require("cors");
// const cors = require("cors", {
//   cors: {
//     origin: "*",
//   },
// });
app.use(cors());
//setup socket
const socket = require("./socketController/socket");
socket(app, server);
///

server.listen(port, () => {
  console.log("Server connect success at: " + port);
});
