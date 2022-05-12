import {
  SEARCH_LISTING_SUCCESS,
  SEARCH_LISTING_FAILURE
} from "../actions/rentals.js";

export default function rentals(state = {
  isFetching: false,
  errorMessage: '',
  rentalSearchResults: []
}, action) {
  switch (action.type) {
    case SEARCH_LISTING_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        rentalSearchResults: action.payload
      });
    case SEARCH_LISTING_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
    default:
      return state;
  }
}
