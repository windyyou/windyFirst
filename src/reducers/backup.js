import { handleActions } from 'redux-actions';
import {
  FETCH_BACKUPS_REQUEST,
  FETCH_BACKUPS_SUCCESS,
  FETCH_BACKUPS_FAILURE,

  FILTER_BACKUPS,

  DELETE_BACKUP_REQUEST,
  DELETE_BACKUP_SUCCESS,
  DELETE_BACKUP_FAILURE,

  FETCH_BACKUP_REQUEST,
  FETCH_BACKUP_SUCCESS,
  FETCH_BACKUP_FAILURE,
} from '../constants/backup';

const INITIAL_STATE = {
  // 列表
  list: {
    isFetching: false,
    error: null,
    data: [],
  },

  // 搜索内容
  filter: '',

  current: {
    isFetching: false,
    error: null,
    data: {
      id: '',
      name: '',
      status: '',
      size: '',
      volume: {
        name: '',
        id: '',
      },
      createdAt: '',
    },
  },
};

export default handleActions({
  [FETCH_BACKUPS_REQUEST]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: !(action.meta && action.meta.refresh),
    },
  }),

  [FETCH_BACKUPS_SUCCESS]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [FETCH_BACKUPS_FAILURE]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      error: action.payload,
      data: [],
    },
  }),

  [FILTER_BACKUPS]: (state, action) => ({
    ...state,
    filter: action.payload,
  }),

  [FETCH_BACKUP_REQUEST]: state => ({
    ...state,
    current: {
      ...state.list,
      isFetching: true,
    },
  }),

  [FETCH_BACKUP_SUCCESS]: (state, action) => ({
    ...state,
    current: {
      ...state.list,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [FETCH_BACKUP_FAILURE]: (state, action) => ({
    ...state,
    current: {
      ...state.list,
      isFetching: false,
      error: action.payload,
      data: INITIAL_STATE.current.data,
    },
  }),

  [DELETE_BACKUP_REQUEST]: state => ({
    ...state,
    list: {
      ...state.list,
      isFetching: true,
    },
  }),

  [DELETE_BACKUP_SUCCESS]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      data: action.payload,
    },
  }),

  [DELETE_BACKUP_FAILURE]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      error: action.payload,
    },
  }),
}, INITIAL_STATE);
