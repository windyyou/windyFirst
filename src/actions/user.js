import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,

  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,

  FILTER_USERS,

  ENABLE_USER_REQUEST,
  ENABLE_USER_SUCCESS,
  ENABLE_USER_FAILURE,

  DISABLE_USER_REQUEST,
  DISABLE_USER_SUCCESS,
  DISABLE_USER_FAILURE,

  RESET_USER_PASSWORD_REQUEST,
  RESET_USER_PASSWORD_SUCCESS,
  RESET_USER_PASSWORD_FAILURE,
} from '../constants/user';
import * as userApi from '../api/user';

export function fetchUsers(params) {
  return (dispatch) => dispatch({
    types: [
      FETCH_USERS_REQUEST,
      FETCH_USERS_SUCCESS,
      FETCH_USERS_FAILURE,
    ],
    payload: {
      promise: userApi.fetchUsers(params),
    },
  });
}

export function fetchUser(id) {
  return (dispatch) => dispatch({
    types: [
      FETCH_USER_REQUEST,
      FETCH_USER_SUCCESS,
      FETCH_USER_FAILURE,
    ],
    payload: {
      promise: userApi.fetchUser(id),
    },
  });
}

export function filterUsers(filter) {
  return {
    type: FILTER_USERS,
    payload: filter,
  };
}

export function enableUser(params) {
  return (dispatch) => dispatch({
    types: [
      ENABLE_USER_REQUEST,
      ENABLE_USER_SUCCESS,
      ENABLE_USER_FAILURE,
    ],
    payload: {
      promise: userApi.enableUser(params)
        .then((data) => {
          dispatch(fetchUsers());
          return data;
        }),
    },
  });
}

export function disableUser(params) {
  return (dispatch) => dispatch({
    types: [
      DISABLE_USER_REQUEST,
      DISABLE_USER_SUCCESS,
      DISABLE_USER_FAILURE,
    ],
    payload: {
      promise: userApi.disableUser(params)
        .then((data) => {
          dispatch(fetchUsers());
          return data;
        }),
    },
  });
}

export function resetUserPassword(param) {
  return (dispatch) => dispatch({
    types: [
      RESET_USER_PASSWORD_REQUEST,
      RESET_USER_PASSWORD_SUCCESS,
      RESET_USER_PASSWORD_FAILURE,
    ],
    payload: {
      promise: userApi.resetUserPassword(param)
        .then((data) => {
          dispatch(fetchUsers());
          return data;
        }),
    },
  });
}
