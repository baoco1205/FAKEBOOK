const express = require("express");
const router = express.Router();
let controller = require("../controller/controller");
router.post("/register", controller.register);
module.exports = router;
