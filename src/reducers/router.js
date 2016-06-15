import { handleActions } from 'redux-actions';
import {
  FETCH_ROUTERS_REQUEST,
  FETCH_ROUTERS_SUCCESS,
  FETCH_ROUTERS_FAILURE,

  FILTER_ROUTERS,

  FETCH_ROUTER_REQUEST,
  FETCH_ROUTER_SUCCESS,
  FETCH_ROUTER_FAILURE,

  DELETE_ROUTER_REQUEST,
  DELETE_ROUTER_SUCCESS,
  DELETE_ROUTER_FAILURE,

  UPDATE_ROUTER_REQUEST,
  UPDATE_ROUTER_SUCCESS,
  UPDATE_ROUTER_FAILURE,
} from '../constants/router';

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
      publicGateway: false,
      status: '',
      floatingIp: null,
      createdAt: '',
    },
  },
  filter: '',
};

export default handleActions({
  [FETCH_ROUTERS_REQUEST]: (state) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: true,
    },
  }),

  [FETCH_ROUTERS_SUCCESS]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      data: action.payload,
    },
  }),

  [FETCH_ROUTERS_FAILURE]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      error: action.payload,
    },
  }),

  [FILTER_ROUTERS]: (state, action) => ({
    ...state,
    filter: action.payload,
  }),

  [FETCH_ROUTER_REQUEST]: (state) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: true,
    },
  }),

  [FETCH_ROUTER_SUCCESS]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [FETCH_ROUTER_FAILURE]: (state, action) => ({
    ...state,
    current: {
      isFetching: false,
      error: action.payload,
      data: INITIAL_STATE.current.data,
    },
  }),

  [DELETE_ROUTER_REQUEST]: (state) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: true,
    },
  }),

  [DELETE_ROUTER_SUCCESS]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      data: action.payload,
    },
  }),

  [DELETE_ROUTER_FAILURE]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      error: action.payload,
    },
  }),

  [UPDATE_ROUTER_REQUEST]: (state) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: true,
    },
  }),

  [UPDATE_ROUTER_SUCCESS]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [UPDATE_ROUTER_FAILURE]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      error: action.payload,
    },
  }),
}, INITIAL_STATE);
