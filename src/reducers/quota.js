import { handleActions } from 'redux-actions';
import {
  FETCH_QUOTAS_REQUEST,
  FETCH_QUOTAS_SUCCESS,
  FETCH_QUOTAS_FAILURE,
} from '../constants/quota';

const INITIAL_STATE = {
  isFetching: false,
  entities: [],
  error: null,
};

export default handleActions({
  [FETCH_QUOTAS_REQUEST]: (state, action) => ({
    ...state,
    isFetching: !(action.meta && action.meta.refresh),
  }),

  [FETCH_QUOTAS_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    entities: action.payload,
    error: null,
  }),

  [FETCH_QUOTAS_FAILURE]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload,
    entities: [],
  }),
}, INITIAL_STATE);
