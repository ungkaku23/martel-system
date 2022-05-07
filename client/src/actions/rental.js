import { toast } from 'react-toastify';
import axios from 'axios';

export const SEARCH_RENTAL = 'LOGIN_SUCCESS';
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
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    dispatch(receiveLogout());
  };
}

export function loginUser(payload) {
  return (dispatch) => {
    axios.post('http://localhost:8080/login', payload.creds)
    .then(function (response) {
      toast.success("You've been logged in successfully", {
        autoClose: 4000,
        closeButton: false,
        hideProgressBar: true,
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(receiveLogin());
      localStorage.setItem('authenticated', true);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
      payload.history.push('/app');
    })
    .catch(function (error) {
      toast.error(error.response.data, {
        autoClose: 4000,
        closeButton: false,
        hideProgressBar: true,
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(loginError(error));
    });
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