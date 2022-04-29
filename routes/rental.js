var express = require("express");
var router = express.Router();
var rentalController = require("../controllers/rental");
var auth = require("../middleware/auth")();
router.post("/search-for-rent", auth.authenticate(), rentalController.searchForRent);

module.exports = router;