import {
  RENTAL_SEARCH_LISTING_SUCCESS,
  RENTAL_SEARCH_LISTING_FAILURE,
  RENTAL_SET_LOADING_SPINNER,
  RENTAL_SAVE_SETTINGS_SUCCESS,
  RENTAL_SAVE_SETTINGS_FAILURE,
  RENTAL_LOAD_SETTINGS_SUCCESS,
  RENTAL_LOAD_SETTINGS_FAILURE,
  RENTAL_UPDATE_LISTING
} from "../actions/rentals.js";

// ==settings==



export default function rentals(state = {
  isFetching: false,
  errorMessage: '',
  listing: [],
  numberOfPages: 1,
  settings: {
    desiredMinMonthlyProfits: 0,
    airbnbFee: 0,
    propertyManagement: 0,
    averageRentalTax: 0,
    ongoingMF: 0,
    internetUtility: 0,
    shortTermRTInsurance: 0,
    landscapeLawnSnow: 0,
    avgFurnitureCost: 0,
    avgCostPerAppliance: 0,
    securityDepositRentMultiplier: 0,
    avgAirdnaRehab: 0,
    avgSupplyBudget: 0
  },
  manualInfos: []
}, action) {
  switch (action.type) {
    case RENTAL_SET_LOADING_SPINNER:
      return Object.assign({}, state, {
        isFetching: true
      });
      break;
    case RENTAL_UPDATE_LISTING:
      return Object.assign({}, state, {
        listing: action.payload
      }); 
      break;
    case RENTAL_SEARCH_LISTING_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        numberOfPages: action.payload.number_of_pages,
        listing: action.payload.data
      });
      break;
    case RENTAL_SEARCH_LISTING_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
      break;
    case RENTAL_SAVE_SETTINGS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false
      });
      break;
    case RENTAL_SAVE_SETTINGS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
      break;
    case RENTAL_LOAD_SETTINGS_SUCCESS:
      console.log('RENTAL_LOAD_SETTINGS_SUCCESS: ', action.payload);
      if (action.payload) {
        return Object.assign({}, state, {
          isFetching: false,
          settings: {
            desiredMinMonthlyProfits: action.payload.desired_min_monthly_profits,
            airbnbFee: action.payload.airbnb_fee,
            propertyManagement: action.payload.property_management,
            averageRentalTax: action.payload.average_rental_tax,
            ongoingMF: action.payload.ongoing_m_f,
            internetUtility: action.payload.internet_utility,
            shortTermRTInsurance: action.payload.short_term_r_t_insurance,
            landscapeLawnSnow: action.payload.landscape_lawn_snow,
            avgFurnitureCost: action.payload.avg_furniture_cost,
            avgCostPerAppliance: action.payload.avg_cost_per_appliance,
            securityDepositRentMultiplier: action.payload.security_deposit_rent_multiplier,
            avgAirdnaRehab: action.payload.avg_airdna_rehab,
            avgSupplyBudget: action.payload.avg_supply_budget
          }
        });
      }

      return Object.assign({}, state, {
        isFetching: false
      }); 
      break;
    case RENTAL_LOAD_SETTINGS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
      break;
    default:
      return state;
      break;
  }
}
