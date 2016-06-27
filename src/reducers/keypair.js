import { handleActions } from 'redux-actions';
import {
  FETCH_KEYPAIRS_REQUEST,
  FETCH_KEYPAIRS_SUCCESS,
  FETCH_KEYPAIRS_FAILURE,

  FILTER_KEYPAIRS,

  CREATE_KEYPAIR_REQUEST,
  CREATE_KEYPAIR_SUCCESS,
  CREATE_KEYPAIR_FAILURE,

  DELETE_KEYPAIR_REQUEST,
  DELETE_KEYPAIR_SUCCESS,
  DELETE_KEYPAIR_FAILURE,
} from '../constants/keypairs';

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
    },
  },

  // 搜索内容
  filter: '',
};

export default handleActions({
  [FETCH_KEYPAIRS_REQUEST]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: !(action.meta && action.meta.refresh),
    },
  }),

  [FETCH_KEYPAIRS_SUCCESS]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [FETCH_KEYPAIRS_FAILURE]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      error: action.payload,
      data: [],
    },
  }),

  [FILTER_KEYPAIRS]: (state, action) => ({
    ...state,
    filter: action.payload,
  }),

  [CREATE_KEYPAIR_REQUEST]: state => ({
    ...state,
    current: {
      ...state.current,
      isFetching: true,
    },
  }),

  [CREATE_KEYPAIR_SUCCESS]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [CREATE_KEYPAIR_FAILURE]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      error: action.payload,
      data: INITIAL_STATE.data,
    },
  }),

  [DELETE_KEYPAIR_REQUEST]: state => ({
    ...state,
    list: {
      ...state.list,
      isFetching: true,
    },
  }),

  [DELETE_KEYPAIR_SUCCESS]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      data: action.payload,
    },
  }),

  [DELETE_KEYPAIR_FAILURE]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      error: action.payload,
    },
  }),
}, INITIAL_STATE);
