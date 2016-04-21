import { handleActions } from 'redux-actions';
import {
  FETCH_SUBNETS_REQUEST,
  FETCH_SUBNETS_SUCCESS,
  FETCH_SUBNETS_FAILURE,
  FILTER_SUBNETS,
  FETCH_SUBNETS_COUNT_FAILURE,
  FETCH_SUBNETS_COUNT_REQUEST,
  FETCH_SUBNETS_COUNT_SUCCESS,
} from '../constants/subnets';

const INITIAL_STATE = {
  isFetching: false,
  entities: [],
  error: null,

  // 搜索内容
  filter: '',
  count: { count: 0 },
};

export default handleActions({
  [FETCH_SUBNETS_REQUEST]: (state) => ({
    ...state,
    isFetching: true,
  }),

  [FETCH_SUBNETS_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    entities: action.payload,
  }),

  [FETCH_SUBNETS_FAILURE]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload,
  }),

  [FILTER_SUBNETS]: (state, action) => ({
    ...state,
    filter: action.payload,
  }),

  [FETCH_SUBNETS_COUNT_REQUEST]: (state) => ({
    ...state,
    isFetching: true,
  }),

  [FETCH_SUBNETS_COUNT_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    count: action.payload,
  }),

  [FETCH_SUBNETS_COUNT_FAILURE]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload,
  }),
}, INITIAL_STATE);
