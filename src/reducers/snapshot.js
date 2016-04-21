import { handleActions } from 'redux-actions';
import {
  FETCH_SNAPSHOTS_REQUEST,
  FETCH_SNAPSHOTS_SUCCESS,
  FETCH_SNAPSHOTS_FAILURE,
  FILTER_SNAPSHOTS,
} from '../constants/snapshot';

const INITIAL_STATE = {
  isFetching: false,
  entities: [],
  error: null,
  filter: '',
};

export default handleActions({
  [FETCH_SNAPSHOTS_REQUEST]: (state) => ({
    ...state,
    isFetching: true,
  }),

  [FETCH_SNAPSHOTS_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    entities: action.payload,
  }),

  [FETCH_SNAPSHOTS_FAILURE]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload,
  }),

  [FILTER_SNAPSHOTS]: (state, action) => ({
    ...state,
    filter: action.payload,
  }),
}, INITIAL_STATE);
