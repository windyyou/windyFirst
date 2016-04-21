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
  [FETCH_AGGREGATIONS_REQUEST]: (state) => ({
    ...state,
    isFetching: true,
  }),

  [FETCH_AGGREGATIONS_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    entities: action.payload,
  }),

  [FETCH_AGGREGATIONS_FAILURE]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload,
  }),
}, INITIAL_STATE);
