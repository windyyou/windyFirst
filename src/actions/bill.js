import {
  FETCH_BILLS_REQUEST,
  FETCH_BILLS_SUCCESS,
  FETCH_BILLS_FAILURE,

  FILTER_BILLS,

  FETCH_BILL_REQUEST,
  FETCH_BILL_SUCCESS,
  FETCH_BILL_FAILURE,
} from '../constants/bill';
import * as billAPI from '../api/bill';

export function fetchBills(params) {
  return (dispatch) => dispatch({
    types: [
      FETCH_BILLS_REQUEST,
      FETCH_BILLS_SUCCESS,
      FETCH_BILLS_FAILURE,
    ],
    payload: {
      promise: billAPI.fetchBills(params),
    },
  });
}

export function filterBills(filter) {
  return {
    type: FILTER_BILLS,
    payload: filter,
  };
}

export function fetchBill(id) {
  return (dispatch) => dispatch({
    types: [
      FETCH_BILL_REQUEST,
      FETCH_BILL_SUCCESS,
      FETCH_BILL_FAILURE,
    ],
    payload: {
      promise: billAPI.fetchBill(id),
    },
  });
}
