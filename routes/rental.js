var express = require("express");
var router = express.Router();
var rentalController = require("../controllers/rental");
var auth = require("../middleware/auth")();
router.post("/rentals-search-listing", auth.authenticate(), rentalController.rentalsSearchListing);

module.exports = router;