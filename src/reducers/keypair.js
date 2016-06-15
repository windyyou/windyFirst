import { handleActions } from 'redux-actions';
import {
  FETCH_KEYPAIRS_REQUEST,
  FETCH_KEYPAIRS_SUCCESS,
  FETCH_KEYPAIRS_FAILURE,

  FILTER_KEYPAIRS,

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
    },
  },

  // 搜索内容
  filter: '',
};

export default handleActions({
  [FETCH_KEYPAIRS_REQUEST]: (state) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: true,
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

  [DELETE_KEYPAIR_REQUEST]: (state) => ({
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
