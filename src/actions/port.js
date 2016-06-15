import {
  FETCH_PORTS_REQUEST,
  FETCH_PORTS_SUCCESS,
  FETCH_PORTS_FAILURE,

  FILTER_PORTS,

  FETCH_PORT_REQUEST,
  FETCH_PORT_SUCCESS,
  FETCH_PORT_FAILURE,

  DELETE_PORT_REQUEST,
  DELETE_PORT_SUCCESS,
  DELETE_PORT_FAILURE,

  UPDATE_PORT_REQUEST,
  UPDATE_PORT_SUCCESS,
  UPDATE_PORT_FAILURE,
} from '../constants/port';
import * as portAPI from '../api/port';

export function fetchPorts(params) {
  return (dispatch) => dispatch({
    types: [
      FETCH_PORTS_REQUEST,
      FETCH_PORTS_SUCCESS,
      FETCH_PORTS_FAILURE,
    ],
    payload: {
      promise: portAPI.fetchPorts(params),
    },
  });
}

export function filterPorts(filter) {
  return {
    type: FILTER_PORTS,
    payload: filter,
  };
}

export function fetchPort(id) {
  return (dispatch) => dispatch({
    types: [
      FETCH_PORT_REQUEST,
      FETCH_PORT_SUCCESS,
      FETCH_PORT_FAILURE,
    ],
    payload: {
      promise: portAPI.fetchPort(id),
    },
  });
}

export function deletePort(id) {
  return (dispatch) => dispatch({
    types: [
      DELETE_PORT_REQUEST,
      DELETE_PORT_SUCCESS,
      DELETE_PORT_FAILURE,
    ],
    payload: {
      promise: portApi.deletePort(id)
        .then((data) => {
          dispatch(fetchPorts());
          return data;
        }),
    },
  });
}

export function updatePort(params) {
  return dispatch => dispatch({
    types: [
      UPDATE_PORT_REQUEST,
      UPDATE_PORT_SUCCESS,
      UPDATE_PORT_FAILURE,
    ],
    payload: {
      promise: portAPI.updatePort(params),
    },
  });
}

