import { handleActions } from 'redux-actions';
import {
  FETCH_NETWORKS_REQUEST,
  FETCH_NETWORKS_SUCCESS,
  FETCH_NETWORKS_FAILURE,
  FILTER_NETWORKS,
  FETCH_NETWORKS_COUNT_REQUEST,
  FETCH_NETWORKS_COUNT_SUCCESS,
  FETCH_NETWORKS_COUNT_FAILURE,
} from '../constants/networks';

const INITIAL_STATE = {
  isFetching: false,
  entities: [],
  error: null,

  // 搜索内容
  filter: '',
  count: { count: 0 },
};

export default handleActions({
  [FETCH_NETWORKS_REQUEST]: (state) => ({
    ...state,
    isFetching: true,
  }),

  [FETCH_NETWORKS_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    entities: action.payload,
  }),

  [FETCH_NETWORKS_FAILURE]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload,
  }),

  [FILTER_NETWORKS]: (state, action) => ({
    ...state,
    filter: action.payload,
  }),

  [FETCH_NETWORKS_COUNT_REQUEST]: (state) => ({
    ...state,
    isFetching: true,
  }),

  [FETCH_NETWORKS_COUNT_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    count: action.payload,
  }),

  [FETCH_NETWORKS_COUNT_FAILURE]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload,
  }),

}, INITIAL_STATE);
