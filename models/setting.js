const mongoose = require("mongoose");

var settingSchema = new mongoose.Schema({
  user_id: Object,
  desired_min_monthly_profits: Number,
  airbnb_fee: Number,
  property_management: Number,
  average_rental_tax: Number,
  ongoing_m_f: Number,
  internet_utility: Number,
  short_term_r_t_insurance: Number,
  landscape_lawn_snow: Number,
  avg_furniture_cost: Number,
  avg_cost_per_appliance: Number,
  security_deposit_rent_multiplier: Number,
  avg_airdna_rehab: Number,
  avg_supply_budget: Number
});
module.exports = mongoose.model("Setting", settingSchema);