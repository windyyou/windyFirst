import { handleActions } from 'redux-actions';
import {
  FETCH_AGGREGATIONS_REQUEST,
  FETCH_AGGREGATIONS_SUCCESS,
  FETCH_AGGREGATIONS_FAILURE,
} from '../constants/aggregation';

const INITIAL_STATE = {
  isFetching: false,
  entities: [],
  error: null,
};

export default handleActions({
  [FETCH_AGGREGATIONS_REQUEST]: (state, action) => ({
    ...state,
    isFetching: !(action.meta && action.meta.refresh),
  }),

  [FETCH_AGGREGATIONS_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    entities: action.payload,
    error: null,
  }),

  [FETCH_AGGREGATIONS_FAILURE]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload,
    entities: [],
  }),
}, INITIAL_STATE);
