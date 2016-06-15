import { handleActions } from 'redux-actions';
import {
  FETCH_OPERATIONS_REQUEST,
  FETCH_OPERATIONS_SUCCESS,
  FETCH_OPERATIONS_FAILURE,

  FILTER_OPERATIONS,

  FETCH_OPERATION_REQUEST,
  FETCH_OPERATION_SUCCESS,
  FETCH_OPERATION_FAILURE,

  DELETE_OPERATION_REQUEST,
  DELETE_OPERATION_SUCCESS,
  DELETE_OPERATION_FAILURE,
} from '../constants/operation';

const INITIAL_STATE = {
  // 列表
  list: {
    isFetching: false,
    error: null,
    data: [],
  },

  // 搜索内容
  filter: '',

  // 当前对象及相关信息
  current: {
    isFetching: false,
    error: null,
    data: {
      id: '',
      title: '',
      resource: [
        {
          name: '',
          id: '',
          type: '',
        },
      ],
      user: '',
      status: '',
      timestamp: '',
    },
  },
};

export default handleActions({
  [FETCH_OPERATIONS_REQUEST]: (state) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: true,
    },
  }),

  [FETCH_OPERATIONS_SUCCESS]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [FETCH_OPERATIONS_FAILURE]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      error: action.payload,
      data: [],
    },
  }),

  [FILTER_OPERATIONS]: (state, action) => ({
    ...state,
    filter: action.payload,
  }),

  [FETCH_OPERATION_REQUEST]: (state) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: true,
    },
  }),

  [FETCH_OPERATION_SUCCESS]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [FETCH_OPERATION_FAILURE]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      error: action.payload,
      data: {},
    },
  }),

  [DELETE_OPERATION_REQUEST]: (state) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: true,
    },
  }),

  [DELETE_OPERATION_SUCCESS]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      data: action.payload,
    },
  }),

  [DELETE_OPERATION_FAILURE]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      error: action.payload,
    },
  }),
}, INITIAL_STATE);
