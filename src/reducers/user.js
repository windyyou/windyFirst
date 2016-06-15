import { handleActions } from 'redux-actions';
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,

  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,

  FILTER_USERS,

  ENABLE_USER_REQUEST,
  ENABLE_USER_SUCCESS,
  ENABLE_USER_FAILURE,

  DISABLE_USER_REQUEST,
  DISABLE_USER_SUCCESS,
  DISABLE_USER_FAILURE,

  RESET_USER_PASSWORD_REQUEST,
  RESET_USER_PASSWORD_SUCCESS,
  RESET_USER_PASSWORD_FAILURE,
} from '../constants/user';

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
      account: '',
      name: '',
      email: '',
      phone: '',
      company: '',
      enabled: false,
      createdAt: '',
    },
  },
};

export default handleActions({
  [FETCH_USERS_REQUEST]: (state) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: true,
    },
  }),

  [FETCH_USERS_SUCCESS]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [FETCH_USERS_FAILURE]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      error: action.payload,
      data: [],
    },
  }),

  [FETCH_USER_REQUEST]: (state) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: true,
    },
  }),

  [FETCH_USER_SUCCESS]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [FETCH_USER_FAILURE]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      error: action.payload,
      data: {},
    },
  }),

  [FILTER_USERS]: (state, action) => ({
    ...state,
    filter: action.payload,
  }),

  [ENABLE_USER_REQUEST]: (state) => ({
    ...state,
    isFetching: true,
  }),

  [ENABLE_USER_SUCCESS]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [ENABLE_USER_FAILURE]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      error: action.payload,
      data: {},
    },
  }),

  [DISABLE_USER_REQUEST]: (state) => ({
    ...state,
    isFetching: true,
  }),

  [DISABLE_USER_SUCCESS]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [DISABLE_USER_FAILURE]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      error: action.payload,
      data: {},
    },
  }),

  [RESET_USER_PASSWORD_REQUEST]: (state) => ({
    ...state,
    isFetching: true,
  }),

  [RESET_USER_PASSWORD_SUCCESS]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [RESET_USER_PASSWORD_FAILURE]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      error: action.payload,
      data: {},
    },
  }),
}, INITIAL_STATE);
