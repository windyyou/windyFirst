import { handleActions } from 'redux-actions';
import {
  FETCH_OPERATIONS_REQUEST,
  FETCH_OPERATIONS_SUCCESS,
  FETCH_OPERATIONS_FAILURE,
} from '../constants/operation';

const INITIAL_STATE = {
  isFetching: false,
  entities: [],
  error: null,
};

export default handleActions({
  [FETCH_OPERATIONS_REQUEST]: (state) => ({
    ...state,
    isFetching: true,
  }),

  [FETCH_OPERATIONS_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    entities: action.payload,
  }),

  [FETCH_OPERATIONS_FAILURE]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload,
  }),
}, INITIAL_STATE);
