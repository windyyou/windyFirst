import { handleActions } from 'redux-actions';
import {
  FETCH_CPUMONITORS_REQUEST,
  FETCH_CPUMONITORS_SUCCESS,
  FETCH_CPUMONITORS_FAILURE,
  FETCH_MEMORYMONITORS_REQUEST,
  FETCH_MEMORYMONITORS_SUCCESS,
  FETCH_MEMORYMONITORS_FAILURE,
  FETCH_DISKWRITEMONITORS_REQUEST,
  FETCH_DISKWRITEMONITORS_SUCCESS,
  FETCH_DISKWRITEMONITORS_FAILURE,
  FETCH_DISKREADMONITORS_REQUEST,
  FETCH_DISKREADMONITORS_SUCCESS,
  FETCH_DISKREADMONITORS_FAILURE,
  FETCH_NETWORKINMONITORS_REQUEST,
  FETCH_NETWORKINMONITORS_SUCCESS,
  FETCH_NETWORKINMONITORS_FAILURE,
  FETCH_NETWORKOUTMONITORS_REQUEST,
  FETCH_NETWORKOUTMONITORS_SUCCESS,
  FETCH_NETWORKOUTMONITORS_FAILURE,
} from '../constants/monitor';

const INITIAL_STATE = {
  cpu: {
    isFetching: false,
    metrics: [],
    error: null,
  },
  memory: {
    isFetching: false,
    metrics: [],
    error: null,
  },
  diskwrite: {
    isFetching: false,
    metrics: [],
    error: null,
  },
  diskread: {
    isFetching: false,
    metrics: [],
    error: null,
  },
  networkin: {
    isFetching: false,
    metrics: [],
    error: null,
  },
  networkout: {
    isFetching: false,
    metrics: [],
    error: null,
  },
};

export default handleActions({
  [FETCH_CPUMONITORS_REQUEST]: (state) => ({
    ...state,
    cpu: {
      isFetching: true,
      metrics: state.cpu.metrics,
      error: state.cpu.error,
    },
  }),

  [FETCH_CPUMONITORS_SUCCESS]: (state, action) => ({
    ...state,
    cpu: {
      isFetching: false,
      metrics: action.payload,
      error: state.cpu.error,
    },
  }),

  [FETCH_CPUMONITORS_FAILURE]: (state, action) => ({
    ...state,
    cpu: {
      isFetching: false,
      metrics: state.cpu.metrics,
      error: action.payload,
    },
  }),

  [FETCH_MEMORYMONITORS_REQUEST]: (state) => ({
    ...state,
    memory: {
      isFetching: true,
      metrics: state.memory.metrics,
      error: state.memory.error,
    },
  }),

  [FETCH_MEMORYMONITORS_SUCCESS]: (state, action) => ({
    ...state,
    memory: {
      isFetching: false,
      metrics: action.payload,
      error: state.memory.error,
    },
  }),

  [FETCH_MEMORYMONITORS_FAILURE]: (state, action) => ({
    ...state,
    memory: {
      isFetching: false,
      metrics: state.memory.metrics,
      error: action.payload,
    },
  }),

  [FETCH_DISKWRITEMONITORS_REQUEST]: (state) => ({
    ...state,
    diskwrite: {
      isFetching: true,
      metrics: state.diskwrite.metrics,
      error: state.diskwrite.error,
    },
  }),

  [FETCH_DISKWRITEMONITORS_SUCCESS]: (state, action) => ({
    ...state,
    diskwrite: {
      isFetching: false,
      metrics: action.payload,
      error: state.diskwrite.error,
    },
  }),

  [FETCH_DISKWRITEMONITORS_FAILURE]: (state, action) => ({
    ...state,
    diskwrite: {
      isFetching: false,
      metrics: state.diskwrite.metrics,
      error: action.payload,
    },
  }),

  [FETCH_DISKREADMONITORS_REQUEST]: (state) => ({
    ...state,
    diskread: {
      isFetching: true,
      metrics: state.diskread.metrics,
      error: state.diskread.error,
    },
  }),

  [FETCH_DISKREADMONITORS_SUCCESS]: (state, action) => ({
    ...state,
    diskread: {
      isFetching: false,
      metrics: action.payload,
      error: state.diskread.error,
    },
  }),

  [FETCH_DISKREADMONITORS_FAILURE]: (state, action) => ({
    ...state,
    diskread: {
      isFetching: false,
      metrics: state.diskread.metrics,
      error: action.payload,
    },
  }),

  [FETCH_NETWORKINMONITORS_REQUEST]: (state) => ({
    ...state,
    networkin: {
      isFetching: true,
      metrics: state.networkin.metrics,
      error: state.networkin.error,
    },
  }),

  [FETCH_NETWORKINMONITORS_SUCCESS]: (state, action) => ({
    ...state,
    networkin: {
      isFetching: false,
      metrics: action.payload,
      error: state.networkin.error,
    },
  }),

  [FETCH_NETWORKINMONITORS_FAILURE]: (state, action) => ({
    ...state,
    networkin: {
      isFetching: false,
      metrics: state.networkin.metrics,
      error: action.payload,
    },
  }),

  [FETCH_NETWORKOUTMONITORS_REQUEST]: (state) => ({
    ...state,
    networkout: {
      isFetching: true,
      metrics: state.networkout.metrics,
      error: state.networkout.error,
    },
  }),

  [FETCH_NETWORKOUTMONITORS_SUCCESS]: (state, action) => ({
    ...state,
    networkout: {
      isFetching: false,
      metrics: action.payload,
      error: state.networkout.error,
    },
  }),

  [FETCH_NETWORKOUTMONITORS_FAILURE]: (state, action) => ({
    ...state,
    networkout: {
      isFetching: false,
      metrics: state.networkout.metrics,
      error: action.payload,
    },
  }),
}, INITIAL_STATE);
