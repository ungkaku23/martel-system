var express = require("express");
var router = express.Router();
var postController = require("../controllers/post");
var auth = require("../middleware/auth")();
router.post("/mypost", auth.authenticate(), postController.getPost);

module.exports = router;