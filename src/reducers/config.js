import { handleActions } from 'redux-actions';
import {
  FETCH_CONFIG_REQUEST,
  FETCH_CONFIG_SUCCESS,
  FETCH_CONFIG_FAILURE,
} from '../constants/config';

const INITIAL_STATE = {
  isFetching: false,
  instance: {
    cpu: [],
    memory: [],
  },
  error: null,
};

export default handleActions({
  [FETCH_CONFIG_REQUEST]: (state) => ({
    ...state,
    isFetching: true,
  }),

  [FETCH_CONFIG_SUCCESS]: (state, action) => ({
    ...state,
    ...action.payload,
    isFetching: false,
  }),

  [FETCH_CONFIG_FAILURE]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload,
  }),
}, INITIAL_STATE);
