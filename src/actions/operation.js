import {
  FETCH_OPERATIONS_REQUEST,
  FETCH_OPERATIONS_SUCCESS,
  FETCH_OPERATIONS_FAILURE,
} from '../constants/operation';
import * as operationAPI from '../api/operation';

export function fetchOperations(params) {
  return (dispatch) => dispatch({
    types: [
      FETCH_OPERATIONS_REQUEST,
      FETCH_OPERATIONS_SUCCESS,
      FETCH_OPERATIONS_FAILURE,
    ],
    payload: {
      promise: operationAPI.fetchOperations(params),
    },
  });
}
