import { handleActions } from 'redux-actions';
import {
  FETCH_NOTIFICATIONS_REQUEST,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILURE,
  FILTER_NOTIFICATIONS,
  FETCH_NOTIFICATION_REQUEST,
  FETCH_NOTIFICATION_SUCCESS,
  FETCH_NOTIFICATION_FAILURE,
  PUT_NOTIFICATION_REQUEST,
  PUT_NOTIFICATION_SUCCESS,
  PUT_NOTIFICATION_FAILURE,
  POST_NOTIFICATION_REQUEST,
  POST_NOTIFICATION_SUCCESS,
  POST_NOTIFICATION_FAILURE,
  DELETE_NOTIFICATION_REQUEST,
  DELETE_NOTIFICATION_SUCCESS,
  DELETE_NOTIFICATION_FAILURE,
} from '../constants/notification';

const INITIAL_STATE = {
  isFetching: false,
  entities: [],
  error: null,
  filter: '',
  currentEntity: {
    createdAt: '',
    type: '',
    status: '',
    id: '',
    name: '',
    text: '',
  },
};

export default handleActions({
  [FETCH_NOTIFICATIONS_REQUEST]: (state) => ({
    ...state,
    isFetching: true,
  }),

  [FETCH_NOTIFICATIONS_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    entities: action.payload,
  }),

  [FETCH_NOTIFICATIONS_FAILURE]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload,
  }),

  [FILTER_NOTIFICATIONS]: (state, action) => ({
    ...state,
    filter: action.payload,
  }),

  [FETCH_NOTIFICATION_REQUEST]: (state) => ({
    ...state,
    isFetching: true,
  }),

  [FETCH_NOTIFICATION_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    currentEntity: action.payload,
  }),

  [FETCH_NOTIFICATION_FAILURE]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload,
  }),

  [PUT_NOTIFICATION_REQUEST]: (state) => ({
    ...state,
    isFetching: true,
  }),

  [PUT_NOTIFICATION_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    currentEntity: action.payload,
  }),

  [PUT_NOTIFICATION_FAILURE]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload,
  }),

  [POST_NOTIFICATION_REQUEST]: (state) => ({
    ...state,
    isFetching: true,
  }),

  [POST_NOTIFICATION_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    currentEntity: action.payload,
  }),

  [POST_NOTIFICATION_FAILURE]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload,
  }),

  [DELETE_NOTIFICATION_REQUEST]: (state) => ({
    ...state,
    isFetching: true,
  }),

  [DELETE_NOTIFICATION_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    currentEntity: action.payload,
  }),

  [DELETE_NOTIFICATION_FAILURE]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload,
  }),
}, INITIAL_STATE);
