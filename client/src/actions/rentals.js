import { toast } from 'react-toastify';
import axios from 'axios'

export const SEARCH_LISTING_SUCCESS = 'SEARCH_LISTING_SUCCESS';
export const SEARCH_LISTING_FAILURE = 'SEARCH_LISTING_FAILURE';

export function searchListingSuccess(payload) {
  return {
    type: SEARCH_LISTING_SUCCESS,
    payload
  };
}

export function searchListingFailure() {
  return {
    type: SEARCH_LISTING_FAILURE
  };
}


export function searchListing(payload) {
  if (payload.cityState === '') {
    toast.error("City Location is missing", {
      autoClose: 4000,
      closeButton: false,
      hideProgressBar: true,
      position: toast.POSITION.TOP_RIGHT,
    });
  } else {
    return (dispatch) => {
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
        // dispatch(searchListingSuccess(response.data));
      })
      .catch(function (error) {
        toast.error(error.response.data, {
          autoClose: 4000,
          closeButton: false,
          hideProgressBar: true,
          position: toast.POSITION.TOP_RIGHT,
        });
        dispatch(searchListingFailure());
      });
    }
  }
}