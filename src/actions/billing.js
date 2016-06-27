import {
  FETCH_BILLINGS_REQUEST,
  FETCH_BILLINGS_SUCCESS,
  FETCH_BILLINGS_FAILURE,
} from '../constants/billing';
import * as billingAPI from '../api/billing';

export function fetchBillings(params, refresh = false) {
  return dispatch => dispatch({
    types: [
      FETCH_BILLINGS_REQUEST,
      FETCH_BILLINGS_SUCCESS,
      FETCH_BILLINGS_FAILURE,
    ],
    meta: {
      refresh,
    },
    payload: {
      promise: billingAPI.fetchBillings(params),
    },
  });
}
