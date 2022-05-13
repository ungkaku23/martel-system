import {
  RENTAL_SEARCH_LISTING_SUCCESS,
  RENTAL_SEARCH_LISTING_FAILURE,
  RENTAL_SET_LOADING_SPINNER
} from "../actions/rentals.js";

export default function rentals(state = {
  isFetching: false,
  errorMessage: '',
  rentalSearchResults: [],
  numberOfPages: 1
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
    default:
      return state;
  }
}
