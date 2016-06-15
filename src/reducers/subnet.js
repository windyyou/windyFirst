import { handleActions } from 'redux-actions';
import {
  FETCH_SUBNETS_REQUEST,
  FETCH_SUBNETS_SUCCESS,
  FETCH_SUBNETS_FAILURE,

  FILTER_SUBNETS,

  FETCH_SUBNETS_COUNT_FAILURE,
  FETCH_SUBNETS_COUNT_REQUEST,
  FETCH_SUBNETS_COUNT_SUCCESS,

  FETCH_SUBNET_REQUEST,
  FETCH_SUBNET_SUCCESS,
  FETCH_SUBNET_FAILURE,

  DELETE_SUBNET_REQUEST,
  DELETE_SUBNET_SUCCESS,
  DELETE_SUBNET_FAILURE,

  UPDATE_SUBNET_REQUEST,
  UPDATE_SUBNET_SUCCESS,
  UPDATE_SUBNET_FAILURE,
} from '../constants/subnets';

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
      network: {
        id: '',
        name: '',
      },
      router: null,
      cidr: '',
      ipVersion: 4,
      gateway: '',
      dhcp: false,
      status: '',
      createdAt: '',
      ports: [],
    },
  },

  // 搜索内容
  filter: '',
  count: {
    isFetching: false,
    error: null,
    data: 0,
  },
};

export default handleActions({
  [FETCH_SUBNETS_REQUEST]: (state) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: true,
    },
  }),

  [FETCH_SUBNETS_SUCCESS]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [FETCH_SUBNETS_FAILURE]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      error: action.payload,
      data: [],
    },
  }),

  [FILTER_SUBNETS]: (state, action) => ({
    ...state,
    filter: action.payload,
  }),

  [FETCH_SUBNETS_COUNT_REQUEST]: (state) => ({
    ...state,
    count: {
      ...state.count,
      isFetching: true,
    },
  }),

  [FETCH_SUBNETS_COUNT_SUCCESS]: (state, action) => ({
    ...state,
    count: {
      ...state.count,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [FETCH_SUBNETS_COUNT_FAILURE]: (state, action) => ({
    ...state,
    count: {
      ...state.count,
      isFetching: false,
      error: action.payload,
      data: 0,
    },
  }),

  [FETCH_SUBNET_REQUEST]: (state) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: true,
    },
  }),

  [FETCH_SUBNET_SUCCESS]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [FETCH_SUBNET_FAILURE]: (state, action) => ({
    ...state,
    current: {
      isFetching: false,
      error: action.payload,
      data: INITIAL_STATE.current.data,
    },
  }),

  [DELETE_SUBNET_REQUEST]: (state) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: true,
    },
  }),

  [DELETE_SUBNET_SUCCESS]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      data: action.payload,
    },
  }),

  [DELETE_SUBNET_FAILURE]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      error: action.payload,
    },
  }),

  [UPDATE_SUBNET_REQUEST]: (state) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: true,
    },
  }),

  [UPDATE_SUBNET_SUCCESS]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [UPDATE_SUBNET_FAILURE]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      error: action.payload,
    },
  }),
}, INITIAL_STATE);
