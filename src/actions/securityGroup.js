import {
  FETCH_SECURITY_GROUPS_REQUEST,
  FETCH_SECURITY_GROUPS_SUCCESS,
  FETCH_SECURITY_GROUPS_FAILURE,

  FILTER_SECURITY_GROUPS,

  DELETE_SECURITY_GROUP_REQUEST,
  DELETE_SECURITY_GROUP_SUCCESS,
  DELETE_SECURITY_GROUP_FAILURE,
} from '../constants/securityGroup';
import * as securityGroupAPI from '../api/securityGroup';

export function fetchSecurityGroups(params) {
  return (dispatch) => dispatch({
    types: [
      FETCH_SECURITY_GROUPS_REQUEST,
      FETCH_SECURITY_GROUPS_SUCCESS,
      FETCH_SECURITY_GROUPS_FAILURE,
    ],
    payload: {
      promise: securityGroupAPI.fetchSecurityGroups(params),
    },
  });
}

export function filterSecurityGroups(filter) {
  return {
    type: FILTER_SECURITY_GROUPS,
    payload: filter,
  };
}

export function deleteSecurityGroup(id) {
  return (dispatch) => dispatch({
    types: [
      DELETE_SECURITY_GROUP_REQUEST,
      DELETE_SECURITY_GROUP_SUCCESS,
      DELETE_SECURITY_GROUP_FAILURE,
    ],
    payload: {
      promise: securityGroupAPI.deleteSecurityGroup(id),
    },
  });
}
