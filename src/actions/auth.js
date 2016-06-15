import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,

  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,

  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} from '../constants/auth';
import * as authAPI from '../api/auth';
import { removeToken } from '../utils/auth';

function requestLogout() {
  return { type: LOGOUT_REQUEST };
}

function receiveLogout() {
  return { type: LOGOUT_SUCCESS };
}

export function login(credentials) {
  return (dispatch) => dispatch({
    types: [
      LOGIN_REQUEST,
      LOGIN_SUCCESS,
      LOGIN_FAILURE,
    ],
    payload: {
      promise: authAPI.login(credentials),
    },
  });
}

export function logout() {
  return (dispatch) => {
    dispatch(requestLogout());
    removeToken();
    dispatch(receiveLogout());
  };
}

export function signUp(data) {
  return (dispatch) => dispatch({
    types: [
      SIGN_UP_REQUEST,
      SIGN_UP_SUCCESS,
      SIGN_UP_FAILURE,
    ],
    payload: {
      promise: authAPI.signUp(data),
    },
  });
}
