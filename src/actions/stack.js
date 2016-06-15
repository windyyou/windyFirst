import {
  FETCH_STACKS_REQUEST,
  FETCH_STACKS_SUCCESS,
  FETCH_STACKS_FAILURE,

  FILTER_STACKS,

  FETCH_STACK_REQUEST,
  FETCH_STACK_SUCCESS,
  FETCH_STACK_FAILURE,

  DELETE_STACK_REQUEST,
  DELETE_STACK_SUCCESS,
  DELETE_STACK_FAILURE,

  FETCH_STACK_CONFIG_REQUEST,
  FETCH_STACK_CONFIG_SUCCESS,
  FETCH_STACK_CONFIG_FAILURE,

  UPDATE_STACK_REQUEST,
  UPDATE_STACK_SUCCESS,
  UPDATE_STACK_FAILURE,

  CREATE_STACK_REQUEST,
  CREATE_STACK_SUCCESS,
  CREATE_STACK_FAILURE,
} from '../constants/stack';
import * as stackAPI from '../api/stack';

export function fetchStacks(params) {
  return (dispatch) => dispatch({
    types: [
      FETCH_STACKS_REQUEST,
      FETCH_STACKS_SUCCESS,
      FETCH_STACKS_FAILURE,
    ],
    payload: {
      promise: stackAPI.fetchStacks(params),
    },
  });
}

export function fetchStack(id) {
  return (dispatch) => dispatch({
    types: [
      FETCH_STACK_REQUEST,
      FETCH_STACK_SUCCESS,
      FETCH_STACK_FAILURE,
    ],
    payload: {
      promise: stackAPI.fetchStack(id),
    },
  });
}

export function filterStacks(filter) {
  return {
    type: FILTER_STACKS,
    payload: filter,
  };
}

export function deleteStack(id) {
  return (dispatch) => dispatch({
    types: [
      DELETE_STACK_REQUEST,
      DELETE_STACK_SUCCESS,
      DELETE_STACK_FAILURE,
    ],
    payload: {
      promise: stackAPI.deleteStack(id),
    },
  });
}

export function fetchStackConfig() {
  return (dispatch) => dispatch({
    types: [
      FETCH_STACK_CONFIG_REQUEST,
      FETCH_STACK_CONFIG_SUCCESS,
      FETCH_STACK_CONFIG_FAILURE,
    ],
    payload: {
      promise: stackAPI.fetchStackConfig(),
    },
  });
}

export function updateStack(param) {
  return (dispatch) => dispatch({
    types: [
      UPDATE_STACK_REQUEST,
      UPDATE_STACK_SUCCESS,
      UPDATE_STACK_FAILURE,
    ],
    payload: {
      promise: stackAPI.updateStack(param),
    },
  });
}

export function createStack(param) {
  return (dispatch) => dispatch({
    types: [
      CREATE_STACK_REQUEST,
      CREATE_STACK_SUCCESS,
      CREATE_STACK_FAILURE,
    ],
    payload: {
      promise: stackAPI.createStack(param)
        .then((data) => {
          dispatch(fetchStacks());
          return data;
        }),
    },
  });
}
