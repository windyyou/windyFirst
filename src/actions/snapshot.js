import {
  FETCH_SNAPSHOTS_REQUEST,
  FETCH_SNAPSHOTS_SUCCESS,
  FETCH_SNAPSHOTS_FAILURE,
  FILTER_SNAPSHOTS,
} from '../constants/snapshot';
import * as snapshotAPI from '../api/snapshot';

export function fetchSnapshots(params) {
  return (dispatch) => dispatch({
    types: [
      FETCH_SNAPSHOTS_REQUEST,
      FETCH_SNAPSHOTS_SUCCESS,
      FETCH_SNAPSHOTS_FAILURE,
    ],
    payload: {
      promise: snapshotAPI.fetchSnapshots(params),
    },
  });
}

export function filterSnapshots(filter) {
  return {
    type: FILTER_SNAPSHOTS,
    payload: filter,
  };
}
