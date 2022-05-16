const axios = require('axios');
const Setting = require("../models/setting");

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

exports.rentalsSaveSettings = function (req, res) {
  console.log('rentalsSaveSettings: ', req.user, req.body);
  let updatedSettingInfos = {
    desired_min_monthly_profits: req.body.desiredMinMonthlyProfits,
    airbnb_fee: req.body.airbnbFee,
    property_management: req.body.propertyManagement,
    average_rental_tax: req.body.averageRentalTax,
    ongoing_m_f: req.body.ongoingMF,
    internet_utility: req.body.internetUtility,
    short_term_r_t_insurance: req.body.shortTermRTInsurance,
    landscape_lawn_snow: req.body.landscapeLawnSnow,
    avg_furniture_cost: req.body.avgFurnitureCost,
    avg_cost_per_appliance: req.body.avgCostPerAppliance,
    security_deposit_rent_multiplier: req.body.securityDepositRentMultiplier,
    avg_airdna_rehab: req.body.avgAirdnaRehab,
    avg_supply_budget: req.body.avgSupplyBudget 
  };
  
  Setting.findOne({user_id: req.user._id})
  .then(doc => {
    if (doc) {
      Setting.findByIdAndUpdate(doc._id, updatedSettingInfos)
      .then(updateResponse => {
        res.status(200).send();
      })
      .catch(updateErr => {
        res.status(400).send(updateErr.message);
      });
    } else {
      updatedSettingInfos = {
        ...updatedSettingInfos,
        user_id: req.user._id
      };
      let SettingObj = new Setting(updatedSettingInfos);

      SettingObj.save()
      .then(newResponse => {
        res.status(200).send();
      })
      .catch(newErr => {
        res.status(400).send(newErr.message);
      });
    }
  })
  .catch(err => {
    res.status(400).send(err.message);
  });

}