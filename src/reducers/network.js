import { handleActions } from 'redux-actions';
import {
  FETCH_NETWORKS_REQUEST,
  FETCH_NETWORKS_SUCCESS,
  FETCH_NETWORKS_FAILURE,

  FILTER_NETWORKS,

  FETCH_NETWORK_REQUEST,
  FETCH_NETWORK_SUCCESS,
  FETCH_NETWORK_FAILURE,

  DELETE_NETWORK_REQUEST,
  DELETE_NETWORK_SUCCESS,
  DELETE_NETWORK_FAILURE,

  UPDATE_NETWORK_REQUEST,
  UPDATE_NETWORK_SUCCESS,
  UPDATE_NETWORK_FAILURE,

  CREATE_NETWORK_REQUEST,
  CREATE_NETWORK_SUCCESS,
  CREATE_NETWORK_FAILURE,
} from '../constants/networks';

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
      status: '',
      managed: false,
      createdAt: '',
      subnets: [],
    },
  },

  // 搜索内容
  filter: '',
};

export default handleActions({
  [FETCH_NETWORKS_REQUEST]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: !(action.meta && action.meta.refresh),
    },
  }),

  [FETCH_NETWORKS_SUCCESS]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [FETCH_NETWORKS_FAILURE]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      error: action.payload,
      data: [],
    },
  }),

  [FILTER_NETWORKS]: (state, action) => ({
    ...state,
    filter: action.payload,
  }),

  [FETCH_NETWORK_REQUEST]: state => ({
    ...state,
    current: {
      ...state.current,
      isFetching: true,
    },
  }),

  [FETCH_NETWORK_SUCCESS]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [FETCH_NETWORK_FAILURE]: (state, action) => ({
    ...state,
    current: {
      isFetching: false,
      error: action.payload,
      data: INITIAL_STATE.current.data,
    },
  }),

  [DELETE_NETWORK_REQUEST]: state => ({
    ...state,
    list: {
      ...state.list,
      isFetching: true,
    },
  }),

  [DELETE_NETWORK_SUCCESS]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      data: action.payload,
    },
  }),

  [DELETE_NETWORK_FAILURE]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      error: action.payload,
    },
  }),

  [UPDATE_NETWORK_REQUEST]: state => ({
    ...state,
    current: {
      ...state.current,
      isFetching: true,
    },
  }),

  [UPDATE_NETWORK_SUCCESS]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [UPDATE_NETWORK_FAILURE]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      error: action.payload,
    },
  }),

  [CREATE_NETWORK_REQUEST]: state => ({
    ...state,
    current: {
      ...state.current,
      isFetching: true,
    },
  }),

  [CREATE_NETWORK_SUCCESS]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [CREATE_NETWORK_FAILURE]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      error: action.payload,
      data: {},
    },
  }),
}, INITIAL_STATE);
