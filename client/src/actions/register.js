import { toast } from 'react-toastify';
import axios from 'axios'

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

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
    console.log("payload.creds: ", payload.creds);
    axios.post('http://localhost:8080/register', payload.creds)
    .then(function (response) {
      toast.success("You've been registered successfully");
      payload.history.push('/login');
    })
    .catch(function (error) {
      dispatch(registerError("Something was wrong. Try again"));
    });
  }
}
