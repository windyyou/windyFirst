import {
  FETCH_SUBNETS_REQUEST,
  FETCH_SUBNETS_SUCCESS,
  FETCH_SUBNETS_FAILURE,

  FILTER_SUBNETS,

  FETCH_SUBNETS_COUNT_REQUEST,
  FETCH_SUBNETS_COUNT_SUCCESS,
  FETCH_SUBNETS_COUNT_FAILURE,

  FETCH_SUBNET_REQUEST,
  FETCH_SUBNET_SUCCESS,
  FETCH_SUBNET_FAILURE,

  DELETE_SUBNET_REQUEST,
  DELETE_SUBNET_SUCCESS,
  DELETE_SUBNET_FAILURE,

  UPDATE_SUBNET_REQUEST,
  UPDATE_SUBNET_SUCCESS,
  UPDATE_SUBNET_FAILURE,
} from '../constants/subnets';
import * as subnetAPI from '../api/subnet';

export function fetchSubnets(params) {
  return (dispatch) => dispatch({
    types: [
      FETCH_SUBNETS_REQUEST,
      FETCH_SUBNETS_SUCCESS,
      FETCH_SUBNETS_FAILURE,
    ],
    payload: {
      promise: subnetAPI.fetchSubnets(params),
    },
  });
}

export function fetchSubnetsCount(params) {
  return (dispatch) => dispatch({
    types: [
      FETCH_SUBNETS_COUNT_REQUEST,
      FETCH_SUBNETS_COUNT_SUCCESS,
      FETCH_SUBNETS_COUNT_FAILURE,
    ],
    payload: {
      promise: subnetAPI.fetchSubnetsCount(params),
    },
  });
}

export function filterSubnets(filter) {
  return {
    type: FILTER_SUBNETS,
    payload: filter,
  };
}

export function fetchSubnet(id) {
  return (dispatch) => dispatch({
    types: [
      FETCH_SUBNET_REQUEST,
      FETCH_SUBNET_SUCCESS,
      FETCH_SUBNET_FAILURE,
    ],
    payload: {
      promise: subnetAPI.fetchSubnet(id),
    },
  });
}

export function deleteSubnet(id) {
  return (dispatch) => dispatch({
    types: [
      DELETE_SUBNET_REQUEST,
      DELETE_SUBNET_SUCCESS,
      DELETE_SUBNET_FAILURE,
    ],
    payload: {
      promise: subnetAPI.deleteSubnet(id),
    },
  });
}

export function updateSubnet(params) {
  return dispatch => dispatch({
    types: [
      UPDATE_SUBNET_REQUEST,
      UPDATE_SUBNET_SUCCESS,
      UPDATE_SUBNET_FAILURE,
    ],
    payload: {
      promise: subnetAPI.updateSubnet(params),
    },
  });
}
