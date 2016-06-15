import {
  FETCH_NETWORKS_REQUEST,
  FETCH_NETWORKS_SUCCESS,
  FETCH_NETWORKS_FAILURE,

  FILTER_NETWORKS,

  FETCH_NETWORKS_COUNT_REQUEST,
  FETCH_NETWORKS_COUNT_SUCCESS,
  FETCH_NETWORKS_COUNT_FAILURE,

  FETCH_NETWORK_REQUEST,
  FETCH_NETWORK_SUCCESS,
  FETCH_NETWORK_FAILURE,

  DELETE_NETWORK_REQUEST,
  DELETE_NETWORK_SUCCESS,
  DELETE_NETWORK_FAILURE,

  UPDATE_NETWORK_REQUEST,
  UPDATE_NETWORK_SUCCESS,
  UPDATE_NETWORK_FAILURE,

  CREATE_NETWORK_REQUEST,
  CREATE_NETWORK_SUCCESS,
  CREATE_NETWORK_FAILURE,
} from '../constants/networks';
import * as networkAPI from '../api/network';

export function fetchNetworks(params) {
  return (dispatch) => dispatch({
    types: [
      FETCH_NETWORKS_REQUEST,
      FETCH_NETWORKS_SUCCESS,
      FETCH_NETWORKS_FAILURE,
    ],
    payload: {
      promise: networkAPI.fetchNetworks(params),
    },
  });
}

export function fetchNetworksCount(params) {
  return (dispatch) => dispatch({
    types: [
      FETCH_NETWORKS_COUNT_REQUEST,
      FETCH_NETWORKS_COUNT_SUCCESS,
      FETCH_NETWORKS_COUNT_FAILURE,
    ],
    payload: {
      promise: networkAPI.fetchNetworksCount(params),
    },
  });
}

export function filterNetworks(filter) {
  return {
    type: FILTER_NETWORKS,
    payload: filter,
  };
}

export function fetchNetwork(id) {
  return (dispatch) => dispatch({
    types: [
      FETCH_NETWORK_REQUEST,
      FETCH_NETWORK_SUCCESS,
      FETCH_NETWORK_FAILURE,
    ],
    payload: {
      promise: networkAPI.fetchNetwork(id),
    },
  });
}

export function deleteNetwork(id) {
  return (dispatch) => dispatch({
    types: [
      DELETE_NETWORK_REQUEST,
      DELETE_NETWORK_SUCCESS,
      DELETE_NETWORK_FAILURE,
    ],
    payload: {
      promise: networkAPI.deleteNetwork(id),
    },
  });
}

export function updateNetwork(params) {
  return dispatch => dispatch({
    types: [
      UPDATE_NETWORK_REQUEST,
      UPDATE_NETWORK_SUCCESS,
      UPDATE_NETWORK_FAILURE,
    ],
    payload: {
      promise: networkAPI.updateNetwork(params),
    },
  });
}

export function createNetwork(params) {
  return (dispatch) => dispatch({
    types: [
      CREATE_NETWORK_REQUEST,
      CREATE_NETWORK_SUCCESS,
      CREATE_NETWORK_FAILURE,
    ],
    payload: {
      promise: networkAPI.createNetwork(params),
    },
  });
}
