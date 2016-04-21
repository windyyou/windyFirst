import {
  FETCH_VIRTUAL_NICS_REQUEST,
  FETCH_VIRTUAL_NICS_SUCCESS,
  FETCH_VIRTUAL_NICS_FAILURE,
  FILTER_VIRTUAL_NICS,
} from '../constants/virtualNics';
import * as virtualNicApi from '../api/virtualNic';

export function fetchVirtualNics(params) {
  return (dispatch) => dispatch({
    types: [
      FETCH_VIRTUAL_NICS_REQUEST,
      FETCH_VIRTUAL_NICS_SUCCESS,
      FETCH_VIRTUAL_NICS_FAILURE,
    ],
    payload: {
      promise: virtualNicApi.fetchVirtualNics(params),
    },
  });
}

export function filterVirtualNics(filter) {
  return {
    type: FILTER_VIRTUAL_NICS,
    payload: filter,
  };
}
