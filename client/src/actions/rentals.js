import { toast } from 'react-toastify';
import axios from 'axios'

export const RENTAL_SET_LOADING_SPINNER = 'RENTAL_SET_LOADING_SPINNER';
export const RENTAL_SEARCH_LISTING_SUCCESS = 'RENTAL_SEARCH_LISTING_SUCCESS';
export const RENTAL_SEARCH_LISTING_FAILURE = 'RENTAL_SEARCH_LISTING_FAILURE';

export function rentalSearchListingSuccess(payload) {
  return {
    type: RENTAL_SEARCH_LISTING_SUCCESS,
    payload
  };
}

export function rentalSearchListingFailure() {
  return {
    type: RENTAL_SEARCH_LISTING_FAILURE
  };
}

export function rentalSetLoadingSpinner() {
  return {
    type: RENTAL_SET_LOADING_SPINNER
  };
}

export function rentalSearchListing(payload) {
  if (payload.cityState === '') {
    toast.error("City Location is missing", {
      autoClose: 4000,
      closeButton: false,
      hideProgressBar: true,
      position: toast.POSITION.TOP_RIGHT,
    });
  } else {
    return (dispatch) => {
      dispatch(rentalSetLoadingSpinner());

      axios.post(
        'http://localhost:8080/rentals-search-listing',
        payload,
        { 
          headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
        })
      .then(function (response) {
        toast.success("Search Listing Successfully", {
          autoClose: 4000,
          closeButton: false,
          hideProgressBar: true,
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log("scc: ", response);
        dispatch(rentalSearchListingSuccess(response.data));
      })
      .catch(function (error) {
        toast.error(error.response.data, {
          autoClose: 4000,
          closeButton: false,
          hideProgressBar: true,
          position: toast.POSITION.TOP_RIGHT,
        });
        dispatch(rentalSearchListingFailure());
      });
    }
  }
}