import { handleActions } from 'redux-actions';
import {
  FETCH_STACKS_REQUEST,
  FETCH_STACKS_SUCCESS,
  FETCH_STACKS_FAILURE,

  FILTER_STACKS,

  DELETE_STACK_REQUEST,
  DELETE_STACK_SUCCESS,
  DELETE_STACK_FAILURE,

  FETCH_STACK_CONFIG_REQUEST,
  FETCH_STACK_CONFIG_SUCCESS,
  FETCH_STACK_CONFIG_FAILURE,

  FETCH_STACK_REQUEST,
  FETCH_STACK_SUCCESS,
  FETCH_STACK_FAILURE,

  UPDATE_STACK_REQUEST,
  UPDATE_STACK_SUCCESS,
  UPDATE_STACK_FAILURE,

  CREATE_STACK_REQUEST,
  CREATE_STACK_SUCCESS,
  CREATE_STACK_FAILURE,
} from '../constants/stack';

const INITIAL_STATE = {
  list: {
    isFetching: false,
    error: null,
    data: [],
  },
  current: {
    isFetching: false,
    error: null,
    data: {
      id: '',
      name: '',
      description: '',
      status: '',
      createdAt: '',
      updatedAt: '',
    },
  },

  // 搜索内容
  filter: '',

  // 新建配置
  config: {
    isFetching: false,
    error: null,
    data: {
    },
  },

};

export default handleActions({
  [FETCH_STACKS_REQUEST]: (state) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: true,
    },
  }),

  [FETCH_STACKS_SUCCESS]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [FETCH_STACKS_FAILURE]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      error: action.payload,
      data: [],
    },
  }),

  [FILTER_STACKS]: (state, action) => ({
    ...state,
    filter: action.payload,
  }),

  [DELETE_STACK_REQUEST]: (state) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: true,
    },
  }),

  [DELETE_STACK_SUCCESS]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      data: action.payload,
    },
  }),

  [DELETE_STACK_FAILURE]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      error: action.payload,
    },
  }),

  [FETCH_STACK_CONFIG_REQUEST]: (state) => ({
    ...state,
    config: {
      ...state.config,
      isFetching: true,
    },
  }),

  [FETCH_STACK_CONFIG_SUCCESS]: (state, action) => ({
    ...state,
    config: {
      ...state.config,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [FETCH_STACK_CONFIG_FAILURE]: (state, action) => ({
    ...state,
    config: {
      ...state.config,
      isFetching: false,
      error: action.payload,
      data: INITIAL_STATE.config.data,
    },
  }),

  [FETCH_STACK_REQUEST]: (state) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: true,
    },
  }),

  [FETCH_STACK_SUCCESS]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [FETCH_STACK_FAILURE]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      error: action.payload,
      data: INITIAL_STATE.current.data,
    },
  }),

  [UPDATE_STACK_REQUEST]: (state) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: true,
    },
  }),

  [UPDATE_STACK_SUCCESS]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [UPDATE_STACK_FAILURE]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      error: action.payload,
      data: INITIAL_STATE.current.data,
    },
  }),

  [CREATE_STACK_REQUEST]: (state) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: true,
    },
  }),

  [CREATE_STACK_SUCCESS]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [CREATE_STACK_FAILURE]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      error: action.payload,
      data: INITIAL_STATE.current.data,
    },
  }),
}, INITIAL_STATE);
