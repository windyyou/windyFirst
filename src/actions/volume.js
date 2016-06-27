import {
  FETCH_VOLUMES_REQUEST,
  FETCH_VOLUMES_SUCCESS,
  FETCH_VOLUMES_FAILURE,

  FILTER_VOLUMES,

  FETCH_VOLUME_REQUEST,
  FETCH_VOLUME_SUCCESS,
  FETCH_VOLUME_FAILURE,

  UPDATE_VOLUME_REQUEST,
  UPDATE_VOLUME_SUCCESS,
  UPDATE_VOLUME_FAILURE,

  FETCH_VOLUME_CONFIG_REQUEST,
  FETCH_VOLUME_CONFIG_SUCCESS,
  FETCH_VOLUME_CONFIG_FAILURE,

  CREATE_VOLUME_REQUEST,
  CREATE_VOLUME_SUCCESS,
  CREATE_VOLUME_FAILURE,

  DELETE_VOLUME_BACKUP_REQUEST,
  DELETE_VOLUME_BACKUP_SUCCESS,
  DELETE_VOLUME_BACKUP_FAILURE,

  ADD_VOLUME_BACKUP_REQUEST,
  ADD_VOLUME_BACKUP_SUCCESS,
  ADD_VOLUME_BACKUP_FAILURE,

  DELETE_VOLUME_REQUEST,
  DELETE_VOLUME_SUCCESS,
  DELETE_VOLUME_FAILURE,
} from '../constants/volume';
import * as volumeAPI from '../api/volume';

export function fetchVolumes(params, refresh = false) {
  return dispatch => dispatch({
    types: [
      FETCH_VOLUMES_REQUEST,
      FETCH_VOLUMES_SUCCESS,
      FETCH_VOLUMES_FAILURE,
    ],
    meta: {
      refresh,
    },
    payload: {
      promise: volumeAPI.fetchVolumes(params),
    },
  });
}

export function filterVolumes(filter) {
  return {
    type: FILTER_VOLUMES,
    payload: filter,
  };
}

export function deleteVolume(id) {
  return dispatch => dispatch({
    types: [
      DELETE_VOLUME_REQUEST,
      DELETE_VOLUME_SUCCESS,
      DELETE_VOLUME_FAILURE,
    ],
    payload: {
      promise: volumeAPI.deleteVolume(id),
    },
  });
}

export function fetchVolume(id) {
  return dispatch => dispatch({
    types: [
      FETCH_VOLUME_REQUEST,
      FETCH_VOLUME_SUCCESS,
      FETCH_VOLUME_FAILURE,
    ],
    payload: {
      promise: volumeAPI.fetchVolume(id),
    },
  });
}

export function updateVolume(params) {
  return dispatch => dispatch({
    types: [
      UPDATE_VOLUME_REQUEST,
      UPDATE_VOLUME_SUCCESS,
      UPDATE_VOLUME_FAILURE,
    ],
    payload: {
      promise: volumeAPI.updateVolume(params),
    },
  });
}

export function deleteBackup(params) {
  return dispatch => dispatch({
    types: [
      DELETE_VOLUME_BACKUP_REQUEST,
      DELETE_VOLUME_BACKUP_SUCCESS,
      DELETE_VOLUME_BACKUP_FAILURE,
    ],
    payload: {
      promise: volumeAPI.deleteBackup(params),
    },
  });
}

export function addBackup(params) {
  return dispatch => dispatch({
    types: [
      ADD_VOLUME_BACKUP_REQUEST,
      ADD_VOLUME_BACKUP_SUCCESS,
      ADD_VOLUME_BACKUP_FAILURE,
    ],
    payload: {
      promise: volumeAPI.addBackup(params),
    },
  });
}

export function fetchVolumeConfig() {
  return dispatch => dispatch({
    types: [
      FETCH_VOLUME_CONFIG_REQUEST,
      FETCH_VOLUME_CONFIG_SUCCESS,
      FETCH_VOLUME_CONFIG_FAILURE,
    ],
    payload: {
      promise: volumeAPI.fetchVolumeConfig(),
    },
  });
}

export function createVolume(params) {
  return dispatch => dispatch({
    types: [
      CREATE_VOLUME_REQUEST,
      CREATE_VOLUME_SUCCESS,
      CREATE_VOLUME_FAILURE,
    ],
    payload: {
      promise: volumeAPI.createVolume(params),
    },
  });
}
