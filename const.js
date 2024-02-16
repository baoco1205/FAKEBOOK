let DBCONFIG = require("./config/database");
let GENDER = {
  MEN: 0,
  WOMEN: 1,
  OTHER: 2,
};
let FRIEND_REQUEST = {
  HANDLE: 0,
  DENY: 1,
};
let TYPE = {
  TEXT: 0,
  IMAGE: 1,
};
module.exports = { DBCONFIG, GENDER, FRIEND_REQUEST, TYPE };
