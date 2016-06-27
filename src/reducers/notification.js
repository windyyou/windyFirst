import { handleActions } from 'redux-actions';
import {
  FETCH_NOTIFICATIONS_REQUEST,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILURE,

  FILTER_NOTIFICATIONS,

  FETCH_NOTIFICATION_REQUEST,
  FETCH_NOTIFICATION_SUCCESS,
  FETCH_NOTIFICATION_FAILURE,

  // PUT_NOTIFICATION_REQUEST,
  // PUT_NOTIFICATION_SUCCESS,
  // PUT_NOTIFICATION_FAILURE,
  //
  // POST_NOTIFICATION_REQUEST,
  // POST_NOTIFICATION_SUCCESS,
  // POST_NOTIFICATION_FAILURE,
  //
  // DELETE_NOTIFICATION_REQUEST,
  // DELETE_NOTIFICATION_SUCCESS,
  // DELETE_NOTIFICATION_FAILURE,

  MARK_NOTIFICATION_AS_READ_SUCCESS,
} from '../constants/notification';

const INITIAL_STATE = {
  list: {
    isFetching: false,
    error: null,
    filter: '',
    data: [],
  },
  current: {
    isFetching: false,
    error: null,
    data: {
      id: '',
      name: '',
      read: false,
      type: '',
      text: '',
      createdAt: '',
    },
  },
};

export default handleActions({
  [FETCH_NOTIFICATIONS_REQUEST]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: !(action.meta && action.meta.refresh),
    },
  }),

  [FETCH_NOTIFICATIONS_SUCCESS]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [FETCH_NOTIFICATIONS_FAILURE]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      error: action.payload,
      data: [],
    },
  }),

  [FILTER_NOTIFICATIONS]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      filter: action.payload,
    },
  }),

  [FETCH_NOTIFICATION_REQUEST]: state => ({
    ...state,
    current: {
      ...state.current,
      isFetching: true,
    },
  }),

  [FETCH_NOTIFICATION_SUCCESS]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [FETCH_NOTIFICATION_FAILURE]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      error: action.payload,
      data: {},
    },
  }),

  [MARK_NOTIFICATION_AS_READ_SUCCESS]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      data: action.payload,
      error: null,
    },
  }),

  // [PUT_NOTIFICATION_REQUEST]: state => ({
  //   ...state,
  //   isFetching: true,
  // }),
  //
  // [PUT_NOTIFICATION_SUCCESS]: (state, action) => ({
  //   ...state,
  //   isFetching: false,
  //   currentEntity: action.payload,
  // }),
  //
  // [PUT_NOTIFICATION_FAILURE]: (state, action) => ({
  //   ...state,
  //   isFetching: false,
  //   error: action.payload,
  // }),
  //
  // [POST_NOTIFICATION_REQUEST]: state => ({
  //   ...state,
  //   isFetching: true,
  // }),
  //
  // [POST_NOTIFICATION_SUCCESS]: (state, action) => ({
  //   ...state,
  //   isFetching: false,
  //   currentEntity: action.payload,
  // }),
  //
  // [POST_NOTIFICATION_FAILURE]: (state, action) => ({
  //   ...state,
  //   isFetching: false,
  //   error: action.payload,
  // }),
  //
  // [DELETE_NOTIFICATION_REQUEST]: state => ({
  //   ...state,
  //   isFetching: true,
  // }),
  //
  // [DELETE_NOTIFICATION_SUCCESS]: (state, action) => ({
  //   ...state,
  //   isFetching: false,
  //   currentEntity: action.payload,
  // }),
  //
  // [DELETE_NOTIFICATION_FAILURE]: (state, action) => ({
  //   ...state,
  //   isFetching: false,
  //   error: action.payload,
  // }),
}, INITIAL_STATE);
