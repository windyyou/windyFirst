import {
  FETCH_INSTANCES_REQUEST,
  FETCH_INSTANCES_SUCCESS,
  FETCH_INSTANCES_FAILURE,

  FETCH_INSTANCE_CONFIG_REQUEST,
  FETCH_INSTANCE_CONFIG_SUCCESS,
  FETCH_INSTANCE_CONFIG_FAILURE,

  FILTER_INSTANCES,

  FETCH_INSTANCE_REQUEST,
  FETCH_INSTANCE_SUCCESS,
  FETCH_INSTANCE_FAILURE,

  CREATE_INSTANCE_REQUEST,
  CREATE_INSTANCE_SUCCESS,
  CREATE_INSTANCE_FAILURE,

  DELETE_INSTANCE_REQUEST,
  DELETE_INSTANCE_SUCCESS,
  DELETE_INSTANCE_FAILURE,

  DELETE_VOLUME_REQUEST,
  DELETE_VOLUME_SUCCESS,
  DELETE_VOLUME_FAILURE,

  DELETE_KEYPAIR_REQUEST,
  DELETE_KEYPAIR_SUCCESS,
  DELETE_KEYPAIR_FAILURE,

  DELETE_NETWORK_REQUEST,
  DELETE_NETWORK_SUCCESS,
  DELETE_NETWORK_FAILURE,

  DELETE_SNAPSHOT_REQUEST,
  DELETE_SNAPSHOT_SUCCESS,
  DELETE_SNAPSHOT_FAILURE,

  UPDATE_INSTANCE_REQUEST,
  UPDATE_INSTANCE_SUCCESS,
  UPDATE_INSTANCE_FAILURE,

  ADD_SNAPSHOT_REQUEST,
  ADD_SNAPSHOT_SUCCESS,
  ADD_SNAPSHOT_FAILURE,

  ADD_KEYPAIR_REQUEST,
  ADD_KEYPAIR_SUCCESS,
  ADD_KEYPAIR_FAILURE,

  ADD_NETWORK_REQUEST,
  ADD_NETWORK_SUCCESS,
  ADD_NETWORK_FAILURE,

  ADD_VOLUME_REQUEST,
  ADD_VOLUME_SUCCESS,
  ADD_VOLUME_FAILURE,
} from '../constants/instance';
import * as instanceAPI from '../api/instance';

export function fetchInstances(params) {
  return (dispatch) => dispatch({
    types: [
      FETCH_INSTANCES_REQUEST,
      FETCH_INSTANCES_SUCCESS,
      FETCH_INSTANCES_FAILURE,
    ],
    payload: {
      promise: instanceAPI.fetchInstances(params),
    },
  });
}

export function fetchInstanceConfig() {
  return (dispatch) => dispatch({
    types: [
      FETCH_INSTANCE_CONFIG_REQUEST,
      FETCH_INSTANCE_CONFIG_SUCCESS,
      FETCH_INSTANCE_CONFIG_FAILURE,
    ],
    payload: {
      promise: instanceAPI.fetchInstanceConfig(),
    },
  });
}

export function filterInstances(filter) {
  return {
    type: FILTER_INSTANCES,
    payload: filter,
  };
}

export function fetchInstance(id) {
  return (dispatch) => dispatch({
    types: [
      FETCH_INSTANCE_REQUEST,
      FETCH_INSTANCE_SUCCESS,
      FETCH_INSTANCE_FAILURE,
    ],
    payload: {
      promise: instanceAPI.fetchInstance(id),
    },
  });
}

export function createInstance(params) {
  return (dispatch) => dispatch({
    types: [
      CREATE_INSTANCE_REQUEST,
      CREATE_INSTANCE_SUCCESS,
      CREATE_INSTANCE_FAILURE,
    ],
    payload: {
      promise: instanceAPI.createInstance(params),
    },
  });
}

export function deleteInstance(id) {
  return (dispatch) => dispatch({
    types: [
      DELETE_INSTANCE_REQUEST,
      DELETE_INSTANCE_SUCCESS,
      DELETE_INSTANCE_FAILURE,
    ],
    payload: {
      promise: instanceAPI.deleteInstance(id)
        .then((data) => {
          dispatch(fetchInstances());
          return data;
        }),
    },
  });
}

export function deleteSnapshot(param) {
  const { pid } = param;
  return (dispatch) => dispatch({
    types: [
      DELETE_SNAPSHOT_REQUEST,
      DELETE_SNAPSHOT_SUCCESS,
      DELETE_SNAPSHOT_FAILURE,
    ],
    payload: {
      promise: instanceAPI.deleteSnapshot(param)
        .then((data) => {
          dispatch(fetchInstance(pid));
          return data;
        }),
    },
  });
}

export function deleteNetwork(param) {
  const { pid } = param;
  return (dispatch) => dispatch({
    types: [
      DELETE_NETWORK_REQUEST,
      DELETE_NETWORK_FAILURE,
      DELETE_NETWORK_SUCCESS,
    ],
    payload: {
      promise: instanceAPI.deleteNetwork(param)
        .then((data) => {
          dispatch(fetchInstance(pid));
          return data;
        }),
    },
  });
}

export function deleteKeypair(param) {
  const { pid } = param;
  return (dispatch) => dispatch({
    types: [
      DELETE_KEYPAIR_REQUEST,
      DELETE_KEYPAIR_SUCCESS,
      DELETE_KEYPAIR_FAILURE,
    ],
    payload: {
      promise: instanceAPI.deleteKeypair(param)
        .then((data) => {
          dispatch(fetchInstance(pid));
          return data;
        }),
    },
  });
}

export function deleteVolume(param) {
  const { pid } = param;
  return (dispatch) => dispatch({
    types: [
      DELETE_VOLUME_REQUEST,
      DELETE_VOLUME_SUCCESS,
      DELETE_VOLUME_FAILURE,
    ],
    payload: {
      promise: instanceAPI.deleteVolume(param)
        .then((data) => {
          dispatch(fetchInstance(pid));
          return data;
        }),
    },
  });
}

export function updateInstance(param) {
  return (dispatch) => dispatch({
    types: [
      UPDATE_INSTANCE_REQUEST,
      UPDATE_INSTANCE_SUCCESS,
      UPDATE_INSTANCE_FAILURE,
    ],
    payload: {
      promise: instanceAPI.updateInstance(param),
    },
  });
}

export function addSnapshot(param) {
  return (dispatch) => dispatch({
    types: [
      ADD_SNAPSHOT_REQUEST,
      ADD_SNAPSHOT_SUCCESS,
      ADD_SNAPSHOT_FAILURE,
    ],
    payload: {
      promise: instanceAPI.addSnapshot(param),
    },
  });
}

export function addKeypair(param) {
  return (dispatch) => dispatch({
    types: [
      ADD_KEYPAIR_REQUEST,
      ADD_KEYPAIR_SUCCESS,
      ADD_KEYPAIR_FAILURE,
    ],
    payload: {
      promise: instanceAPI.addKeypair(param),
    },
  });
}

export function addVolume(param) {
  return (dispatch) => dispatch({
    types: [
      ADD_VOLUME_REQUEST,
      ADD_VOLUME_SUCCESS,
      ADD_VOLUME_FAILURE,
    ],
    payload: {
      promise: instanceAPI.addVolume(param),
    },
  });
}

export function addNetwork(param) {
  return (dispatch) => dispatch({
    types: [
      ADD_NETWORK_REQUEST,
      ADD_NETWORK_SUCCESS,
      ADD_NETWORK_FAILURE,
    ],
    payload: {
      promise: instanceAPI.addNetwork(param),
    },
  });
}
