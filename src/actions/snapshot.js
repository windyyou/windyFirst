import {
  FETCH_SNAPSHOTS_REQUEST,
  FETCH_SNAPSHOTS_SUCCESS,
  FETCH_SNAPSHOTS_FAILURE,

  FILTER_SNAPSHOTS,

  FETCH_SNAPSHOT_REQUEST,
  FETCH_SNAPSHOT_SUCCESS,
  FETCH_SNAPSHOT_FAILURE,

  DELETE_SNAPSHOT_REQUEST,
  DELETE_SNAPSHOT_SUCCESS,
  DELETE_SNAPSHOT_FAILURE,
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

export function fetchSnapshot(id) {
  return (dispatch) => dispatch({
    types: [
      FETCH_SNAPSHOT_REQUEST,
      FETCH_SNAPSHOT_SUCCESS,
      FETCH_SNAPSHOT_FAILURE,
    ],
    payload: {
      promise: snapshotAPI.fetchSnapshot(id),
    },
  });
}

export function deleteSnapshot(id) {
  return (dispatch) => dispatch({
    types: [
      DELETE_SNAPSHOT_REQUEST,
      DELETE_SNAPSHOT_SUCCESS,
      DELETE_SNAPSHOT_FAILURE,
    ],
    payload: {
      promise: snapshotAPI.deleteSnapshot(id),
    },
  });
}
