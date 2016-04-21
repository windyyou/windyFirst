import { handleActions } from 'redux-actions';
import {
  FETCH_BACKUPS_REQUEST,
  FETCH_BACKUPS_SUCCESS,
  FETCH_BACKUPS_FAILURE,
  FILTER_BACKUPS,
} from '../constants/backup';

const INITIAL_STATE = {
  isFetching: false,
  entities: [],
  error: null,
  filter: '',
};

export default handleActions({
  [FETCH_BACKUPS_REQUEST]: (state) => ({
    ...state,
    isFetching: true,
  }),

  [FETCH_BACKUPS_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    entities: action.payload,
  }),

  [FETCH_BACKUPS_FAILURE]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload,
  }),

  [FILTER_BACKUPS]: (state, action) => ({
    ...state,
    filter: action.payload,
  }),
}, INITIAL_STATE);
