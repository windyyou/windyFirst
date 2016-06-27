import {
  FETCH_BARE_METALS_REQUEST,
  FETCH_BARE_METALS_SUCCESS,
  FETCH_BARE_METALS_FAILURE,

  FILTER_BARE_METALS,

  DELETE_BARE_METAL_REQUEST,
  DELETE_BARE_METAL_SUCCESS,
  DELETE_BARE_METAL_FAILURE,
} from '../constants/bareMetal';
import * as bareMetalApi from '../api/bareMetal';

export function fetchBareMetals(params, refresh = false) {
  return dispatch => dispatch({
    types: [
      FETCH_BARE_METALS_REQUEST,
      FETCH_BARE_METALS_SUCCESS,
      FETCH_BARE_METALS_FAILURE,
    ],
    meta: {
      refresh,
    },
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

export function deleteBareMetal(id) {
  return dispatch => dispatch({
    types: [
      DELETE_BARE_METAL_REQUEST,
      DELETE_BARE_METAL_SUCCESS,
      DELETE_BARE_METAL_FAILURE,
    ],
    payload: {
      promise: bareMetalApi.deleteBareMetal(id),
    },
  });
}
