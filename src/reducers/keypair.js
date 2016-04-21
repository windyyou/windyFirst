import { handleActions } from 'redux-actions';
import {
  FETCH_KEYPAIRS_REQUEST,
  FETCH_KEYPAIRS_SUCCESS,
  FETCH_KEYPAIRS_FAILURE,
  FILTER_KEYPAIRS,
} from '../constants/keypairs';

const INITIAL_STATE = {
  isFetching: false,
  entities: [],
  error: null,

  // 搜索内容
  filter: '',
};

export default handleActions({
  [FETCH_KEYPAIRS_REQUEST]: (state) => ({
    ...state,
    isFetching: true,
  }),

  [FETCH_KEYPAIRS_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    entities: action.payload,
  }),

  [FETCH_KEYPAIRS_FAILURE]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload,
  }),

  [FILTER_KEYPAIRS]: (state, action) => ({
    ...state,
    filter: action.payload,
  }),
}, INITIAL_STATE);
