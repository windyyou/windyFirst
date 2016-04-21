import {
  FETCH_NETWORKS_REQUEST,
  FETCH_NETWORKS_SUCCESS,
  FETCH_NETWORKS_FAILURE,
  FILTER_NETWORKS,
  FETCH_NETWORKS_COUNT_REQUEST,
  FETCH_NETWORKS_COUNT_SUCCESS,
  FETCH_NETWORKS_COUNT_FAILURE,
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
