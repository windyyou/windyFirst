import {
  FETCH_BACKUPS_REQUEST,
  FETCH_BACKUPS_SUCCESS,
  FETCH_BACKUPS_FAILURE,

  FILTER_BACKUPS,

  DELETE_BACKUP_REQUEST,
  DELETE_BACKUP_SUCCESS,
  DELETE_BACKUP_FAILURE,

  FETCH_BACKUP_REQUEST,
  FETCH_BACKUP_SUCCESS,
  FETCH_BACKUP_FAILURE,
} from '../constants/backup';
import * as backupAPI from '../api/backup';

export function fetchBackups(params, refresh = false) {
  return dispatch => dispatch({
    types: [
      FETCH_BACKUPS_REQUEST,
      FETCH_BACKUPS_SUCCESS,
      FETCH_BACKUPS_FAILURE,
    ],
    meta: {
      refresh,
    },
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

export function deleteBackup(id) {
  return dispatch => dispatch({
    types: [
      DELETE_BACKUP_REQUEST,
      DELETE_BACKUP_SUCCESS,
      DELETE_BACKUP_FAILURE,
    ],
    payload: {
      promise: backupAPI.deleteBackup(id),
    },
  });
}

export function fetchBackup(id) {
  return dispatch => dispatch({
    types: [
      FETCH_BACKUP_REQUEST,
      FETCH_BACKUP_SUCCESS,
      FETCH_BACKUP_FAILURE,
    ],
    payload: {
      promise: backupAPI.fetchBackup(id),
    },
  });
}
