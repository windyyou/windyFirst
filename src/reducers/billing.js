import { handleActions } from 'redux-actions';
import {
  FETCH_BILLINGS_REQUEST,
  FETCH_BILLINGS_SUCCESS,
  FETCH_BILLINGS_FAILURE,
} from '../constants/billing';

const INITIAL_STATE = {
  isFetching: false,
  entities: [],
  error: null,
};

export default handleActions({
  [FETCH_BILLINGS_REQUEST]: (state, action) => ({
    ...state,
    isFetching: !(action.meta && action.meta.refresh),
  }),

  [FETCH_BILLINGS_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    entities: action.payload,
    error: null,
  }),

  [FETCH_BILLINGS_FAILURE]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload,
    data: [],
  }),
}, INITIAL_STATE);
