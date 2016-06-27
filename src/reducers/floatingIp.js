import { handleActions } from 'redux-actions';
import {
  FETCH_FLOATING_IPS_REQUEST,
  FETCH_FLOATING_IPS_SUCCESS,
  FETCH_FLOATING_IPS_FAILURE,

  FILTER_FLOATING_IPS,

  DELETE_FLOATING_IP_REQUEST,
  DELETE_FLOATING_IP_SUCCESS,
  DELETE_FLOATING_IP_FAILURE,
} from '../constants/floatingIp';

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
  [FETCH_FLOATING_IPS_REQUEST]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: !(action.meta && action.meta.refresh),
    },
  }),

  [FETCH_FLOATING_IPS_SUCCESS]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [FETCH_FLOATING_IPS_FAILURE]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      error: action.payload,
      data: [],
    },
  }),

  [FILTER_FLOATING_IPS]: (state, action) => ({
    ...state,
    filter: action.payload,
  }),

  [DELETE_FLOATING_IP_REQUEST]: state => ({
    ...state,
    list: {
      ...state.list,
      isFetching: true,
    },
  }),

  [DELETE_FLOATING_IP_SUCCESS]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      data: action.payload,
    },
  }),

  [DELETE_FLOATING_IP_FAILURE]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      error: action.payload,
    },
  }),
}, INITIAL_STATE);
