import { handleActions } from 'redux-actions';
import {
  FETCH_VIRTUAL_NICS_REQUEST,
  FETCH_VIRTUAL_NICS_SUCCESS,
  FETCH_VIRTUAL_NICS_FAILURE,
  FILTER_VIRTUAL_NICS,
} from '../constants/virtualNics';

const INITIAL_STATE = {
  isFetching: false,
  entities: [],
  error: null,

  // 搜索内容
  filter: '',
};

export default handleActions({
  [FETCH_VIRTUAL_NICS_REQUEST]: (state) => ({
    ...state,
    isFetching: true,
  }),

  [FETCH_VIRTUAL_NICS_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    entities: action.payload,
  }),

  [FETCH_VIRTUAL_NICS_FAILURE]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload,
  }),

  [FILTER_VIRTUAL_NICS]: (state, action) => ({
    ...state,
    filter: action.payload,
  }),
}, INITIAL_STATE);
