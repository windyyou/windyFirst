import {
  FETCH_KEYPAIRS_REQUEST,
  FETCH_KEYPAIRS_SUCCESS,
  FETCH_KEYPAIRS_FAILURE,
  FILTER_KEYPAIRS,
} from '../constants/keypairs';
import * as keypairAPI from '../api/keypair';

export function fetchKeypairs(params) {
  return (dispatch) => dispatch({
    types: [
      FETCH_KEYPAIRS_REQUEST,
      FETCH_KEYPAIRS_SUCCESS,
      FETCH_KEYPAIRS_FAILURE,
    ],
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
