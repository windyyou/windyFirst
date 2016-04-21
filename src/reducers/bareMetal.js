import { handleActions } from 'redux-actions';
import {
  FETCH_BARE_METALS_REQUEST,
  FETCH_BARE_METALS_SUCCESS,
  FETCH_BARE_METALS_FAILURE,
  FILTER_BARE_METALS,
} from '../constants/bareMetal';

const INITIAL_STATE = {
  isFetching: false,
  entities: [],
  error: null,

  // 搜索内容
  filter: '',
};

export default handleActions({
  [FETCH_BARE_METALS_REQUEST]: (state) => ({
    ...state,
    isFetching: true,
  }),

  [FETCH_BARE_METALS_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    entities: action.payload,
  }),

  [FETCH_BARE_METALS_FAILURE]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload,
  }),

  [FILTER_BARE_METALS]: (state, action) => ({
    ...state,
    filter: action.payload,
  }),
}, INITIAL_STATE);
