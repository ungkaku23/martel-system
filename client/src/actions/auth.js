import { toast } from 'react-toastify';
import axios from 'axios'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export function receiveLogin() {
  return {
    type: LOGIN_SUCCESS
  };
}

function loginError(payload) {
  return {
    type: LOGIN_FAILURE,
    payload,
  };
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
  };
}

export function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

// logs the user out
export function logoutUser() {
  return (dispatch) => {
    dispatch(requestLogout());
    localStorage.removeItem('authenticated');
    dispatch(receiveLogout());
  };
}

export function loginUser(creds) {
  return (dispatch) => {
    dispatch(receiveLogin());
    if (creds.email.length > 0 && creds.password.length > 0) {
      localStorage.setItem('authenticated', true)
    } else {
      dispatch(loginError('Something was wrong. Try again'));
    }
  }
}

export function receiveRegister() {
  return {
    type: REGISTER_SUCCESS,
  };
}

export function registerError(payload) {
  return {
    type: REGISTER_FAILURE,
    payload,
  };
}

export function registerUser(payload) {
  return (dispatch) => {
    axios.post('http://localhost:8080/register', payload.creds)
    .then(function (response) {
      toast.success("You've been registered successfully", {
        autoClose: 4000,
        closeButton: false,
        hideProgressBar: true,
        position: toast.POSITION.TOP_RIGHT,
      });
      payload.history.push('/login');
    })
    .catch(function (error) {
      dispatch(registerError(error));
    });
  }
}