import { handleActions } from 'redux-actions';
import {
  FETCH_BILLS_REQUEST,
  FETCH_BILLS_SUCCESS,
  FETCH_BILLS_FAILURE,

  FILTER_BILLS,

  FETCH_BILL_REQUEST,
  FETCH_BILL_SUCCESS,
  FETCH_BILL_FAILURE,
} from '../constants/bill';

const INITIAL_STATE = {
  // 列表
  list: {
    isFetching: false,
    error: null,
    data: [],
  },

  // 搜索内容
  filter: '',

  current: {
    isFetching: false,
    error: null,
    data: {
      userId: '',
      userName: '',
      consumption: 0,
      createdAt: '',
    },
  },
};

export default handleActions({
  [FETCH_BILLS_REQUEST]: (state) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: true,
    },
  }),

  [FETCH_BILLS_SUCCESS]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [FETCH_BILLS_FAILURE]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      error: action.payload,
      data: [],
    },
  }),

  [FILTER_BILLS]: (state, action) => ({
    ...state,
    filter: action.payload,
  }),

  [FETCH_BILL_REQUEST]: (state) => ({
    ...state,
    current: {
      ...state.list,
      isFetching: true,
    },
  }),

  [FETCH_BILL_SUCCESS]: (state, action) => ({
    ...state,
    current: {
      ...state.list,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [FETCH_BILL_FAILURE]: (state, action) => ({
    ...state,
    current: {
      ...state.list,
      isFetching: false,
      error: action.payload,
      data: INITIAL_STATE.current.data,
    },
  }),
}, INITIAL_STATE);
