const express = require("express");
const router = express.Router();
let controller = require("../controller/controller");
let checkLogin = require("../controller/checkLogin");
let checkPassport = require("../middleware/checkPassport");
router.post("/register", controller.register);
router.post("/login", checkLogin);
router.post("/find_user", checkPassport, controller.findUser);
router.post("/create_post", checkPassport, controller.createPosts);
router.get("/get_posts", checkPassport, controller.getPosts);
router.get("/get_all_posts", checkPassport, controller.getAllPosts);
router.get("/get_user_id", checkPassport, controller.getUserID);
module.exports = router;
