import { handleActions } from 'redux-actions';
import {
  FETCH_PORTS_REQUEST,
  FETCH_PORTS_SUCCESS,
  FETCH_PORTS_FAILURE,

  FILTER_PORTS,

  FETCH_PORT_REQUEST,
  FETCH_PORT_SUCCESS,
  FETCH_PORT_FAILURE,

  DELETE_PORT_REQUEST,
  DELETE_PORT_SUCCESS,
  DELETE_PORT_FAILURE,

  UPDATE_PORT_REQUEST,
  UPDATE_PORT_SUCCESS,
  UPDATE_PORT_FAILURE,
} from '../constants/port';

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
      ip: '',
      mac: '',
      securityGroup: null,
      subnet: null,
      instance: null,
      createdAt: '',
    },
  },

  // 搜索内容
  filter: '',
};

export default handleActions({
  [FETCH_PORTS_REQUEST]: (state) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: true,
    },
  }),

  [FETCH_PORTS_SUCCESS]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      data: action.payload.map(port => ({
        ...port,
        name: port.name || port.id,
      })),
      error: null,
    },
  }),

  [FETCH_PORTS_FAILURE]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      error: action.payload,
      data: [],
    },
  }),

  [FILTER_PORTS]: (state, action) => ({
    ...state,
    filter: action.payload,
  }),

  [FETCH_PORT_REQUEST]: (state) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: true,
    },
  }),

  [FETCH_PORT_SUCCESS]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [FETCH_PORT_FAILURE]: (state, action) => ({
    ...state,
    current: {
      isFetching: false,
      error: action.payload,
      data: INITIAL_STATE.current.data,
    },
  }),

  [DELETE_PORT_REQUEST]: (state) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: true,
    },
  }),

  [DELETE_PORT_SUCCESS]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      data: action.payload,
    },
  }),

  [DELETE_PORT_FAILURE]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      error: action.payload,
    },
  }),

  [UPDATE_PORT_REQUEST]: (state) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: true,
    },
  }),

  [UPDATE_PORT_SUCCESS]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [UPDATE_PORT_FAILURE]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      error: action.payload,
    },
  }),
}, INITIAL_STATE);
