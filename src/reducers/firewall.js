import { handleActions } from 'redux-actions';
import {
  FETCH_FIREWALLS_REQUEST,
  FETCH_FIREWALLS_SUCCESS,
  FETCH_FIREWALLS_FAILURE,
  FILTER_FIREWALLS,
} from '../constants/firewall';

const INITIAL_STATE = {
  isFetching: false,
  entities: [],
  error: null,

  // 搜索内容
  filter: '',
};

export default handleActions({
  [FETCH_FIREWALLS_REQUEST]: (state) => ({
    ...state,
    isFetching: true,
  }),

  [FETCH_FIREWALLS_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    entities: action.payload,
  }),

  [FETCH_FIREWALLS_FAILURE]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload,
  }),

  [FILTER_FIREWALLS]: (state, action) => ({
    ...state,
    filter: action.payload,
  }),
}, INITIAL_STATE);
