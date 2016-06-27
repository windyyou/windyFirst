import {
  FETCH_SUBNETS_REQUEST,
  FETCH_SUBNETS_SUCCESS,
  FETCH_SUBNETS_FAILURE,

  FILTER_SUBNETS,

  FETCH_SUBNET_REQUEST,
  FETCH_SUBNET_SUCCESS,
  FETCH_SUBNET_FAILURE,

  CREATE_SUBNET_REQUEST,
  CREATE_SUBNET_SUCCESS,
  CREATE_SUBNET_FAILURE,

  DELETE_SUBNET_REQUEST,
  DELETE_SUBNET_SUCCESS,
  DELETE_SUBNET_FAILURE,

  UPDATE_SUBNET_REQUEST,
  UPDATE_SUBNET_SUCCESS,
  UPDATE_SUBNET_FAILURE,
} from '../constants/subnets';
import * as subnetAPI from '../api/subnet';

export function fetchSubnets(params, refresh = false) {
  return dispatch => dispatch({
    types: [
      FETCH_SUBNETS_REQUEST,
      FETCH_SUBNETS_SUCCESS,
      FETCH_SUBNETS_FAILURE,
    ],
    meta: {
      refresh,
    },
    payload: {
      promise: subnetAPI.fetchSubnets(params),
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
  return dispatch => dispatch({
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

export function createSubnet(params) {
  return dispatch => dispatch({
    types: [
      CREATE_SUBNET_REQUEST,
      CREATE_SUBNET_SUCCESS,
      CREATE_SUBNET_FAILURE,
    ],
    payload: {
      promise: subnetAPI.createSubnet(params),
    },
  });
}

export function deleteSubnet(id) {
  return dispatch => dispatch({
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
