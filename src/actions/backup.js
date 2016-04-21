import {
  FETCH_BACKUPS_REQUEST,
  FETCH_BACKUPS_SUCCESS,
  FETCH_BACKUPS_FAILURE,
  FILTER_BACKUPS,
} from '../constants/backup';
import * as backupAPI from '../api/backup';

export function fetchBackups(params) {
  return (dispatch) => dispatch({
    types: [
      FETCH_BACKUPS_REQUEST,
      FETCH_BACKUPS_SUCCESS,
      FETCH_BACKUPS_FAILURE,
    ],
    payload: {
      promise: backupAPI.fetchBackups(params),
    },
  });
}

export function filterBackups(filter) {
  return {
    type: FILTER_BACKUPS,
    payload: filter,
  };
}
