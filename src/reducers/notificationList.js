import { handleActions } from 'redux-actions';
import {
  FETCH_NOTIFICATION_LISTS_REQUEST,
  FETCH_NOTIFICATION_LISTS_SUCCESS,
  FETCH_NOTIFICATION_LISTS_FAILURE,

  FILTER_NOTIFICATION_LISTS,

  FETCH_NOTIFICATION_LIST_REQUEST,
  FETCH_NOTIFICATION_LIST_SUCCESS,
  FETCH_NOTIFICATION_LIST_FAILURE,

  UPDATE_NOTIFICATION_LIST_REQUEST,
  UPDATE_NOTIFICATION_LIST_SUCCESS,
  UPDATE_NOTIFICATION_LIST_FAILURE,

  DELETE_NOTIFICATION_LIST_REQUEST,
  DELETE_NOTIFICATION_LIST_SUCCESS,
  DELETE_NOTIFICATION_LIST_FAILURE,

  CREATE_NOTIFICATION_LIST_REQUEST,
  CREATE_NOTIFICATION_LIST_SUCCESS,
  CREATE_NOTIFICATION_LIST_FAILURE,

  DELETE_NOTIFICATION_LIST_TERMINAL_REQUEST,
  DELETE_NOTIFICATION_LIST_TERMINAL_SUCCESS,
  DELETE_NOTIFICATION_LIST_TERMINAL_FAILURE,

  CREATE_NOTIFICATION_LIST_TERMINAL_REQUEST,
  CREATE_NOTIFICATION_LIST_TERMINAL_SUCCESS,
  CREATE_NOTIFICATION_LIST_TERMINAL_FAILURE,
} from '../constants/notificationList';

const INITIAL_STATE = {
  list: {
    isFetching: false,
    error: null,
    data: [],
  },
  filter: '',
  current: {
    isFetching: false,
    error: null,
    data: {
      id: '',
      name: '',
      description: '',
      terminals: [],
    },
  },
};

export default handleActions({
  [FETCH_NOTIFICATION_LISTS_REQUEST]: (state) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: true,
    },
  }),

  [FETCH_NOTIFICATION_LISTS_SUCCESS]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [FETCH_NOTIFICATION_LISTS_FAILURE]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      error: action.payload,
      data: [],
    },
  }),

  [FILTER_NOTIFICATION_LISTS]: (state, action) => ({
    ...state,
    filter: action.payload,
  }),

  [FETCH_NOTIFICATION_LIST_REQUEST]: (state) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: true,
    },
  }),

  [FETCH_NOTIFICATION_LIST_SUCCESS]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [FETCH_NOTIFICATION_LIST_FAILURE]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      error: action.payload,
      data: {},
    },
  }),

  [UPDATE_NOTIFICATION_LIST_REQUEST]: (state) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: true,
    },
  }),

  [UPDATE_NOTIFICATION_LIST_SUCCESS]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [UPDATE_NOTIFICATION_LIST_FAILURE]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      error: action.payload,
      data: {},
    },
  }),

  [DELETE_NOTIFICATION_LIST_REQUEST]: (state) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: true,
    },
  }),

  [DELETE_NOTIFICATION_LIST_SUCCESS]: (state) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
    },
  }),

  [DELETE_NOTIFICATION_LIST_FAILURE]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      error: action.payload,
      data: [],
    },
  }),

  [CREATE_NOTIFICATION_LIST_REQUEST]: (state) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: true,
    },
  }),

  [CREATE_NOTIFICATION_LIST_SUCCESS]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [CREATE_NOTIFICATION_LIST_FAILURE]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      data: {},
      error: action.payload,
    },
  }),

  [DELETE_NOTIFICATION_LIST_TERMINAL_REQUEST]: (state) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: true,
    },
  }),

  [DELETE_NOTIFICATION_LIST_TERMINAL_SUCCESS]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [DELETE_NOTIFICATION_LIST_TERMINAL_FAILURE]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      error: action.payload,
      data: {},
    },
  }),

  [CREATE_NOTIFICATION_LIST_TERMINAL_REQUEST]: (state) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: true,
    },
  }),

  [CREATE_NOTIFICATION_LIST_TERMINAL_SUCCESS]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [CREATE_NOTIFICATION_LIST_TERMINAL_FAILURE]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      error: action.payload,
      data: {},
    },
  }),
}, INITIAL_STATE);
