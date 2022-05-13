const axios = require('axios');

exports.rentalsSearchListing = function (req, res) {
  console.log('rentalsSearchListing: ', req.body);
  let options = req.body;
  let baseUrl = `http://localhost:8000/${options.site === 'Zillow' ? 'zillow' : 'realtor'}`;

  axios.post(baseUrl, {
    "zip_or_location": options.cityState,
    "page_index": options.pageIndex,
    "buy_type": "rent",
    "home_type": options.home_type,
    "price_min": options.priceMin,
    "price_max": options.priceMax,
    "beds": options.beds,
    "baths": options.baths
  })
  .then(function (response) {
    res.json(response.data);
  })
  .catch(function (err) {
    res.status(400).send(err.message);
  });
}