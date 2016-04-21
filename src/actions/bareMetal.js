import {
  FETCH_BARE_METALS_REQUEST,
  FETCH_BARE_METALS_SUCCESS,
  FETCH_BARE_METALS_FAILURE,
  FILTER_BARE_METALS,
} from '../constants/bareMetal';
import * as bareMetalApi from '../api/bareMetal';

export function fetchBareMetals(params) {
  return (dispatch) => dispatch({
    types: [
      FETCH_BARE_METALS_REQUEST,
      FETCH_BARE_METALS_SUCCESS,
      FETCH_BARE_METALS_FAILURE,
    ],
    payload: {
      promise: bareMetalApi.fetchBareMetals(params),
    },
  });
}

export function filterBareMetals(filter) {
  return {
    type: FILTER_BARE_METALS,
    payload: filter,
  };
}
