import {
  FETCH_SUBNETS_REQUEST,
  FETCH_SUBNETS_SUCCESS,
  FETCH_SUBNETS_FAILURE,
  FILTER_SUBNETS,
  FETCH_SUBNETS_COUNT_REQUEST,
  FETCH_SUBNETS_COUNT_SUCCESS,
  FETCH_SUBNETS_COUNT_FAILURE,
} from '../constants/subnets';
import * as networkAPI from '../api/subnet';

export function fetchSubnets(params) {
  return (dispatch) => dispatch({
    types: [
      FETCH_SUBNETS_REQUEST,
      FETCH_SUBNETS_SUCCESS,
      FETCH_SUBNETS_FAILURE,
    ],
    payload: {
      promise: networkAPI.fetchSubnets(params),
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
      promise: networkAPI.fetchSubnetsCount(params),
    },
  });
}

export function filterSubnets(filter) {
  return {
    type: FILTER_SUBNETS,
    payload: filter,
  };
}
