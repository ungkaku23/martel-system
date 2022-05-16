import {
  RENTAL_SEARCH_LISTING_SUCCESS,
  RENTAL_SEARCH_LISTING_FAILURE,
  RENTAL_SET_LOADING_SPINNER,
  RENTAL_SAVE_SETTINGS_SUCCESS,
  RENTAL_SAVE_SETTINGS_FAILURE
} from "../actions/rentals.js";

export default function rentals(state = {
  isFetching: false,
  errorMessage: '',
  rentalSearchResults: [],
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
  }
}, action) {
  switch (action.type) {
    case RENTAL_SET_LOADING_SPINNER:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RENTAL_SEARCH_LISTING_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        numberOfPages: action.payload.number_of_pages,
        rentalSearchResults: action.payload.data
      });
    case RENTAL_SEARCH_LISTING_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    case RENTAL_SAVE_SETTINGS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false
      });
    case RENTAL_SAVE_SETTINGS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
}
