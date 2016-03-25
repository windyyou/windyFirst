import {
  FETCH_BILLINGS_REQUEST,
  FETCH_BILLINGS_SUCCESS,
  FETCH_BILLINGS_FAILURE,
} from '../constants/billing';
import * as billingAPI from '../api/billing';

export function fetchBillings(params) {
  return (dispatch) => dispatch({
    types: [
      FETCH_BILLINGS_REQUEST,
      FETCH_BILLINGS_SUCCESS,
      FETCH_BILLINGS_FAILURE,
    ],
    payload: {
      promise: billingAPI.fetchBillings(params),
    },
  });
}
