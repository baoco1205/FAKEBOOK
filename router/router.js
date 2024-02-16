const express = require("express");
const router = express.Router();
let controller = require("../controller/controller");
let checkLogin = require("../controller/checkLogin");
router.post("/register", controller.register);
router.get("/login", checkLogin);
module.exports = router;
