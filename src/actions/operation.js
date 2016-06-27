import {
  FETCH_OPERATIONS_REQUEST,
  FETCH_OPERATIONS_SUCCESS,
  FETCH_OPERATIONS_FAILURE,

  FILTER_OPERATIONS,

  FETCH_OPERATION_REQUEST,
  FETCH_OPERATION_SUCCESS,
  FETCH_OPERATION_FAILURE,

  DELETE_OPERATION_REQUEST,
  DELETE_OPERATION_SUCCESS,
  DELETE_OPERATION_FAILURE,
} from '../constants/operation';
import * as operationAPI from '../api/operation';

export function fetchOperations(params, refresh = false) {
  return dispatch => dispatch({
    types: [
      FETCH_OPERATIONS_REQUEST,
      FETCH_OPERATIONS_SUCCESS,
      FETCH_OPERATIONS_FAILURE,
    ],
    meta: {
      refresh,
    },
    payload: {
      promise: operationAPI.fetchOperations(params),
    },
  });
}

export function filterOperations(filter) {
  return {
    type: FILTER_OPERATIONS,
    payload: filter,
  };
}

export function fetchOperation(id) {
  return dispatch => dispatch({
    types: [
      FETCH_OPERATION_REQUEST,
      FETCH_OPERATION_SUCCESS,
      FETCH_OPERATION_FAILURE,
    ],
    payload: {
      promise: operationAPI.fetchOperation(id),
    },
  });
}
