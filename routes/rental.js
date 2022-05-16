var express = require("express");
var router = express.Router();
var rentalController = require("../controllers/rental");
var auth = require("../middleware/auth")();
router.post("/rentals-search-listing", auth.authenticate(), rentalController.rentalsSearchListing);
router.post("/rentals-save-settings", auth.authenticate(), rentalController.rentalsSaveSettings);

module.exports = router;