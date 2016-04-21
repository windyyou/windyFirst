import {
  FETCH_DISKS_REQUEST,
  FETCH_DISKS_SUCCESS,
  FETCH_DISKS_FAILURE,
  FILTER_DISKS,
} from '../constants/disk';
import * as diskAPI from '../api/disk';

export function fetchDisks(params) {
  return (dispatch) => dispatch({
    types: [
      FETCH_DISKS_REQUEST,
      FETCH_DISKS_SUCCESS,
      FETCH_DISKS_FAILURE,
    ],
    payload: {
      promise: diskAPI.fetchDisks(params),
    },
  });
}

export function filterDisks(filter) {
  return {
    type: FILTER_DISKS,
    payload: filter,
  };
}
