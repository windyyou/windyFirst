import { handleActions } from 'redux-actions';
import {
  FETCH_SECURITY_GROUPS_REQUEST,
  FETCH_SECURITY_GROUPS_SUCCESS,
  FETCH_SECURITY_GROUPS_FAILURE,

  FILTER_SECURITY_GROUPS,

  CREATE_SECURITY_GROUP_REQUEST,
  CREATE_SECURITY_GROUP_SUCCESS,
  CREATE_SECURITY_GROUP_FAILURE,

  DELETE_SECURITY_GROUP_REQUEST,
  DELETE_SECURITY_GROUP_SUCCESS,
  DELETE_SECURITY_GROUP_FAILURE,
} from '../constants/securityGroup';

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
      description: '',
      createdAt: '',
    },
  },
  filter: '',
};

export default handleActions({
  [FETCH_SECURITY_GROUPS_REQUEST]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: !(action.meta && action.meta.refresh),
    },
  }),

  [FETCH_SECURITY_GROUPS_SUCCESS]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [FETCH_SECURITY_GROUPS_FAILURE]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      error: action.payload,
      data: [],
    },
  }),

  [FILTER_SECURITY_GROUPS]: (state, action) => ({
    ...state,
    filter: action.payload,
  }),

  [CREATE_SECURITY_GROUP_REQUEST]: state => ({
    ...state,
    current: {
      ...state.current,
      isFetching: true,
    },
  }),

  [CREATE_SECURITY_GROUP_SUCCESS]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      data: action.payload,
    },
  }),

  [CREATE_SECURITY_GROUP_FAILURE]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      error: action.payload,
    },
  }),

  [DELETE_SECURITY_GROUP_REQUEST]: state => ({
    ...state,
    list: {
      ...state.list,
      isFetching: true,
    },
  }),

  [DELETE_SECURITY_GROUP_SUCCESS]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      data: action.payload,
    },
  }),

  [DELETE_SECURITY_GROUP_FAILURE]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      error: action.payload,
    },
  }),
}, INITIAL_STATE);
