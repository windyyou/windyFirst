import { handleActions } from 'redux-actions';
import {
  FETCH_BARE_METALS_REQUEST,
  FETCH_BARE_METALS_SUCCESS,
  FETCH_BARE_METALS_FAILURE,

  FILTER_BARE_METALS,

  DELETE_BARE_METAL_REQUEST,
  DELETE_BARE_METAL_SUCCESS,
  DELETE_BARE_METAL_FAILURE,
} from '../constants/bareMetal';

const INITIAL_STATE = {
  // 列表
  list: {
    isFetching: false,
    error: null,
    data: [],
  },

  // 搜索内容
  filter: '',
};

export default handleActions({
  [FETCH_BARE_METALS_REQUEST]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: !(action.meta && action.meta.refresh),
    },
  }),

  [FETCH_BARE_METALS_SUCCESS]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [FETCH_BARE_METALS_FAILURE]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      error: action.payload,
      data: [],
    },
  }),

  [FILTER_BARE_METALS]: (state, action) => ({
    ...state,
    filter: action.payload,
  }),

  [DELETE_BARE_METAL_REQUEST]: state => ({
    ...state,
    list: {
      ...state.list,
      isFetching: true,
    },
  }),

  [DELETE_BARE_METAL_SUCCESS]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      data: action.payload,
    },
  }),

  [DELETE_BARE_METAL_FAILURE]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      error: action.payload,
    },
  }),
}, INITIAL_STATE);
