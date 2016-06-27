import * as monitorAPI from '../api/monitor';

export function fetchMonitors(params) {
  const { type } = params;
  return dispatch => dispatch({
    types: [
      `FETCH_${type}MONITORS_REQUEST`,
      `FETCH_${type}MONITORS_SUCCESS`,
      `FETCH_${type}MONITORS_FAILURE`,
    ],
    payload: {
      promise: monitorAPI.fetchMonitors(params),
    },
  });
}
