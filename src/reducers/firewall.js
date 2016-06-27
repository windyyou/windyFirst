import { handleActions } from 'redux-actions';
import {
  FETCH_FIREWALLS_REQUEST,
  FETCH_FIREWALLS_SUCCESS,
  FETCH_FIREWALLS_FAILURE,

  FILTER_FIREWALLS,

  DELETE_FIREWALL_REQUEST,
  DELETE_FIREWALL_SUCCESS,
  DELETE_FIREWALL_FAILURE,
} from '../constants/firewall';

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
  [FETCH_FIREWALLS_REQUEST]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: !(action.meta && action.meta.refresh),
    },
  }),

  [FETCH_FIREWALLS_SUCCESS]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [FETCH_FIREWALLS_FAILURE]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      error: action.payload,
      data: [],
    },
  }),

  [FILTER_FIREWALLS]: (state, action) => ({
    ...state,
    filter: action.payload,
  }),

  [DELETE_FIREWALL_REQUEST]: state => ({
    ...state,
    list: {
      ...state.list,
      isFetching: true,
    },
  }),

  [DELETE_FIREWALL_SUCCESS]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      data: action.payload,
    },
  }),

  [DELETE_FIREWALL_FAILURE]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      error: action.payload,
    },
  }),
}, INITIAL_STATE);
