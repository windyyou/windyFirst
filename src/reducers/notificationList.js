import { handleActions } from 'redux-actions';
import {
  FETCH_NOTIFICATION_LISTS_REQUEST,
  FETCH_NOTIFICATION_LISTS_SUCCESS,
  FETCH_NOTIFICATION_LISTS_FAILURE,
  FILTER_NOTIFICATION_LISTS,
} from '../constants/notificationList';

const INITIAL_STATE = {
  isFetching: false,
  entities: [],
  error: null,
  filter: '',
};

export default handleActions({
  [FETCH_NOTIFICATION_LISTS_REQUEST]: (state) => ({
    ...state,
    isFetching: true,
  }),

  [FETCH_NOTIFICATION_LISTS_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    entities: action.payload,
  }),

  [FETCH_NOTIFICATION_LISTS_FAILURE]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.payload,
  }),

  [FILTER_NOTIFICATION_LISTS]: (state, action) => ({
    ...state,
    filter: action.payload,
  }),
}, INITIAL_STATE);
