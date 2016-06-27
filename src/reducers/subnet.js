import { handleActions } from 'redux-actions';
import {
  FETCH_SUBNETS_REQUEST,
  FETCH_SUBNETS_SUCCESS,
  FETCH_SUBNETS_FAILURE,

  FILTER_SUBNETS,

  FETCH_SUBNET_REQUEST,
  FETCH_SUBNET_SUCCESS,
  FETCH_SUBNET_FAILURE,

  CREATE_SUBNET_REQUEST,
  CREATE_SUBNET_SUCCESS,
  CREATE_SUBNET_FAILURE,

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
};

export default handleActions({
  [FETCH_SUBNETS_REQUEST]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: !(action.meta && action.meta.refresh),
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


  [FETCH_SUBNET_REQUEST]: state => ({
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

  [CREATE_SUBNET_REQUEST]: state => ({
    ...state,
    current: {
      ...state.current,
      isFetching: true,
    },
  }),

  [CREATE_SUBNET_SUCCESS]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [CREATE_SUBNET_FAILURE]: (state, action) => ({
    ...state,
    current: {
      ...INITIAL_STATE.current,
      error: action.payload,
    },
  }),

  [DELETE_SUBNET_REQUEST]: state => ({
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

  [UPDATE_SUBNET_REQUEST]: state => ({
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
