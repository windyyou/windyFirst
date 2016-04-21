import {
  FETCH_CONFIG_REQUEST,
  FETCH_CONFIG_SUCCESS,
  FETCH_CONFIG_FAILURE,
} from '../constants/config';
import * as configAPI from '../api/config';

export function fetchConfig(params) {
  return (dispatch) => dispatch({
    types: [
      FETCH_CONFIG_REQUEST,
      FETCH_CONFIG_SUCCESS,
      FETCH_CONFIG_FAILURE,
    ],
    payload: {
      promise: configAPI.fetchConfig(params),
    },
  });
}
