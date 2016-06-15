import {
  FETCH_FIREWALLS_REQUEST,
  FETCH_FIREWALLS_SUCCESS,
  FETCH_FIREWALLS_FAILURE,

  FILTER_FIREWALLS,

  DELETE_FIREWALL_REQUEST,
  DELETE_FIREWALL_SUCCESS,
  DELETE_FIREWALL_FAILURE,
} from '../constants/firewall';
import * as firewallAPI from '../api/firewall';

export function fetchFirewalls(params) {
  return (dispatch) => dispatch({
    types: [
      FETCH_FIREWALLS_REQUEST,
      FETCH_FIREWALLS_SUCCESS,
      FETCH_FIREWALLS_FAILURE,
    ],
    payload: {
      promise: firewallAPI.fetchFirewalls(params),
    },
  });
}

export function filterFirewalls(filter) {
  return {
    type: FILTER_FIREWALLS,
    payload: filter,
  };
}

export function deleteFirewall(id) {
  return (dispatch) => dispatch({
    types: [
      DELETE_FIREWALL_REQUEST,
      DELETE_FIREWALL_SUCCESS,
      DELETE_FIREWALL_FAILURE,
    ],
    payload: {
      promise: firewallAPI.deleteFirewall(id),
    },
  });
}
