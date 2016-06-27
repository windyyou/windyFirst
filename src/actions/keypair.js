import {
  FETCH_KEYPAIRS_REQUEST,
  FETCH_KEYPAIRS_SUCCESS,
  FETCH_KEYPAIRS_FAILURE,

  FILTER_KEYPAIRS,

  CREATE_KEYPAIR_REQUEST,
  CREATE_KEYPAIR_SUCCESS,
  CREATE_KEYPAIR_FAILURE,

  DELETE_KEYPAIR_REQUEST,
  DELETE_KEYPAIR_SUCCESS,
  DELETE_KEYPAIR_FAILURE,
} from '../constants/keypairs';
import * as keypairAPI from '../api/keypair';

export function fetchKeypairs(params, refresh = false) {
  return dispatch => dispatch({
    types: [
      FETCH_KEYPAIRS_REQUEST,
      FETCH_KEYPAIRS_SUCCESS,
      FETCH_KEYPAIRS_FAILURE,
    ],
    meta: {
      refresh,
    },
    payload: {
      promise: keypairAPI.fetchKeypairs(params),
    },
  });
}

export function filterKeypairs(filter) {
  return {
    type: FILTER_KEYPAIRS,
    payload: filter,
  };
}

export function createKeypair(params) {
  return dispatch => dispatch({
    types: [
      CREATE_KEYPAIR_REQUEST,
      CREATE_KEYPAIR_SUCCESS,
      CREATE_KEYPAIR_FAILURE,
    ],
    payload: {
      promise: keypairAPI.createKeypair(params),
    },
  });
}

export function deleteKeypair(id) {
  return dispatch => dispatch({
    types: [
      DELETE_KEYPAIR_REQUEST,
      DELETE_KEYPAIR_SUCCESS,
      DELETE_KEYPAIR_FAILURE,
    ],
    payload: {
      promise: keypairAPI.deleteKeypair(id),
    },
  });
}
