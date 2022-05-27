import { toast } from 'react-toastify';
import axios from 'axios'

export const RENTAL_SET_LOADING_SPINNER = 'RENTAL_SET_LOADING_SPINNER';
export const RENTAL_SEARCH_LISTING_SUCCESS = 'RENTAL_SEARCH_LISTING_SUCCESS';
export const RENTAL_SEARCH_LISTING_FAILURE = 'RENTAL_SEARCH_LISTING_FAILURE';
export const RENTAL_SAVE_SETTINGS_SUCCESS = 'RENTAL_SAVE_SETTINGS_SUCCESS';
export const RENTAL_SAVE_SETTINGS_FAILURE = 'RENTAL_SAVE_SETTINGS_FAILURE';
export const RENTAL_LOAD_SETTINGS_SUCCESS = 'RENTAL_LOAD_SETTINGS_SUCCESS';
export const RENTAL_LOAD_SETTINGS_FAILURE = 'RENTAL_LOAD_SETTINGS_FAILURE';
export const RENTAL_UPDATE_LISTING = "RENTAL_UPDATE_LISTING";

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

export function rentalSaveSettingsSuccess(payload) {
  return {
    type: RENTAL_SAVE_SETTINGS_SUCCESS,
    payload
  };
}

export function rentalSaveSettingsFailure() {
  return {
    type: RENTAL_SAVE_SETTINGS_FAILURE
  };
}

export function rentalLoadSettingsSuccess(payload) {
  return {
    type: RENTAL_LOAD_SETTINGS_SUCCESS,
    payload
  };
}

export function rentalLoadSettingsFailure() {
  return {
    type: RENTAL_LOAD_SETTINGS_FAILURE
  };
}

export function rentalUpdateListing(payload) {
  return {
    type: RENTAL_UPDATE_LISTING,
    payload
  };
}

export function rentalSearchListing(payload) {
  let listing = [];

for (let i = 0; i < 5; i++) {
  listing.push({
    id: "" + i,
    date: "2022-01-03",
    address: "Barrone LLddsssssssssssssC.",
    city: "Kalamazoo, MI",
    state: "Michigan",
    zipcode: "EIO223",
    landlord_rent: 1000,
    landlord_name: "Tom Gray",
    landlord_contact: "+1 123 3532 3422",
    airdna_adr: 111,
    airdna_occupancy: 0.45,
    beds: 2,
    baths: 3,
    square_footage: 400,
    link: "link" + i
  });
}
return (dispatch) => {
dispatch(rentalSearchListingSuccess({data: listing, number_of_pages: 2}));
}
  // if (payload.cityState === '') {
  //   toast.error("City Location is missing", {
  //     autoClose: 4000,
  //     closeButton: false,
  //     hideProgressBar: true,
  //     position: toast.POSITION.TOP_RIGHT,
  //   });
  // } else {
  //   return (dispatch) => {
  //     dispatch(rentalSetLoadingSpinner());

  //     axios.post(
  //       'http://localhost:8080/rentals-search-listing',
  //       payload,
  //       { 
  //         headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
  //       })
  //     .then(function (response) {

  //       // demo data for AirDNA
  //       let data = Object.assign([], response.data);
  //       data = data.map(o => ({
  //         ...o,
  //         airdna_adr: 115,
  //         airdna_occupancy: 34
  //       }));

  //       dispatch(rentalSearchListingSuccess(response.data));
  //     })
  //     .catch(function (error) {
  //       toast.error(error.response.data, {
  //         autoClose: 4000,
  //         closeButton: false,
  //         hideProgressBar: true,
  //         position: toast.POSITION.TOP_RIGHT,
  //       });
  //       dispatch(rentalSearchListingFailure());
  //     });
  //   }
  // }
}

export function rentalSaveSettings(payload) {
  return (dispatch) => {
    dispatch(rentalSetLoadingSpinner());

    axios.post(
      'http://localhost:8080/rentals-save-settings',
      payload,
      { 
        headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
      })
    .then(function (response) {
      // toast.success("Settings is saved successfully", {
      //   autoClose: 4000,
      //   closeButton: false,
      //   hideProgressBar: true,
      //   position: toast.POSITION.TOP_RIGHT,
      // });
      dispatch(rentalSaveSettingsSuccess());
    })
    .catch(function (error) {
      toast.error(error.response.data, {
        autoClose: 4000,
        closeButton: false,
        hideProgressBar: true,
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(rentalSaveSettingsFailure());
    });
  }
}

export function rentalLoadSettings(payload) {
  return (dispatch) => {
    dispatch(rentalSetLoadingSpinner());

    axios.get(
      'http://localhost:8080/rentals-load-settings',
      { 
        headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
      })
    .then(function (response) {
      // toast.success("Settings is loaded successfully", {
      //   autoClose: 4000,
      //   closeButton: false,
      //   hideProgressBar: true,
      //   position: toast.POSITION.TOP_RIGHT,
      // });
      dispatch(rentalLoadSettingsSuccess(response.data));
    })
    .catch(function (error) {
      toast.error(error.response.data, {
        autoClose: 4000,
        closeButton: false,
        hideProgressBar: true,
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(rentalLoadSettingsFailure());
    });
  }
}