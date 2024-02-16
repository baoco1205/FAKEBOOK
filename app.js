//setup server
let express = require("express");
let app = express();
app.use(express.static("./FE/public"));
require("dotenv").config();
let port = process.env.PORT;
let router = require("./router/router");

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

app.listen(port, () => {
  console.log("Server connect success at: " + port);
});
