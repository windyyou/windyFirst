import { handleActions } from 'redux-actions';
import {
  FETCH_ALARMS_REQUEST,
  FETCH_ALARMS_SUCCESS,
  FETCH_ALARMS_FAILURE,
  FILTER_ALARMS,
} from '../constants/alarm';

const INITIAL_STATE = {
  isFetching: false,
  entities: [],
  error: null,
  filter: '',
};

export default handleActions({
  [FETCH_ALARMS_REQUEST]: (state) => ({
    ...state,
    isFetching: true,
  }),

  [FETCH_ALARMS_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    entities: action.payload,
  }),

  [FETCH_ALARMS_FAILURE]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload,
  }),

  [FILTER_ALARMS]: (state, action) => ({
    ...state,
    filter: action.payload,
  }),
}, INITIAL_STATE);
