import {
  FETCH_INSTANCES_REQUEST,
  FETCH_INSTANCES_SUCCESS,
  FETCH_INSTANCES_FAILURE,
  FILTER_INSTANCES,
  FETCH_INSTANCE_REQUEST,
  FETCH_INSTANCE_SUCCESS,
  FETCH_INSTANCE_FAILURE,
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
