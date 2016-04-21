import {
  FETCH_FIREWALLS_REQUEST,
  FETCH_FIREWALLS_SUCCESS,
  FETCH_FIREWALLS_FAILURE,
  FILTER_FIREWALLS,
} from '../constants/firewall';
import * as networkAPI from '../api/firewall';

export function fetchFirewalls(params) {
  return (dispatch) => dispatch({
    types: [
      FETCH_FIREWALLS_REQUEST,
      FETCH_FIREWALLS_SUCCESS,
      FETCH_FIREWALLS_FAILURE,
    ],
    payload: {
      promise: networkAPI.fetchFirewalls(params),
    },
  });
}

export function filterFirewalls(filter) {
  return {
    type: FILTER_FIREWALLS,
    payload: filter,
  };
}
