import { handleActions } from 'redux-actions';
import {
  FETCH_SNAPSHOTS_REQUEST,
  FETCH_SNAPSHOTS_SUCCESS,
  FETCH_SNAPSHOTS_FAILURE,

  FILTER_SNAPSHOTS,

  FETCH_SNAPSHOT_REQUEST,
  FETCH_SNAPSHOT_SUCCESS,
  FETCH_SNAPSHOT_FAILURE,

  DELETE_SNAPSHOT_REQUEST,
  DELETE_SNAPSHOT_SUCCESS,
  DELETE_SNAPSHOT_FAILURE,
} from '../constants/snapshot';

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
      size: '',
      createdAt: '',
      status: '',
      systemName: '',
    },
  },
  filter: '',
};

export default handleActions({
  [FETCH_SNAPSHOTS_REQUEST]: (state) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: true,
    },
  }),

  [FETCH_SNAPSHOTS_SUCCESS]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [FETCH_SNAPSHOTS_FAILURE]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      error: action.payload,
      data: [],
    },
  }),

  [FILTER_SNAPSHOTS]: (state, action) => ({
    ...state,
    filter: action.payload,
  }),

  [FETCH_SNAPSHOT_REQUEST]: (state) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: true,
    },
  }),

  [FETCH_SNAPSHOT_SUCCESS]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [FETCH_SNAPSHOT_FAILURE]: (state, action) => ({
    ...state,
    current: {
      isFetching: false,
      error: action.payload,
      data: INITIAL_STATE.current.data,
    },
  }),

  [DELETE_SNAPSHOT_REQUEST]: (state) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: true,
    },
  }),

  [DELETE_SNAPSHOT_SUCCESS]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      data: action.payload,
    },
  }),

  [DELETE_SNAPSHOT_FAILURE]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      error: action.payload,
    },
  }),
}, INITIAL_STATE);
