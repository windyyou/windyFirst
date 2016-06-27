import { handleActions } from 'redux-actions';
import {
  FETCH_VOLUMES_REQUEST,
  FETCH_VOLUMES_SUCCESS,
  FETCH_VOLUMES_FAILURE,

  FILTER_VOLUMES,

  DELETE_VOLUME_REQUEST,
  DELETE_VOLUME_SUCCESS,
  DELETE_VOLUME_FAILURE,

  FETCH_VOLUME_REQUEST,
  FETCH_VOLUME_SUCCESS,
  FETCH_VOLUME_FAILURE,

  UPDATE_VOLUME_REQUEST,
  UPDATE_VOLUME_SUCCESS,
  UPDATE_VOLUME_FAILURE,

  FETCH_VOLUME_CONFIG_REQUEST,
  FETCH_VOLUME_CONFIG_SUCCESS,
  FETCH_VOLUME_CONFIG_FAILURE,

  CREATE_VOLUME_REQUEST,
  CREATE_VOLUME_SUCCESS,
  CREATE_VOLUME_FAILURE,
} from '../constants/volume';

const INITIAL_STATE = {
  // 列表
  list: {
    isFetching: false,
    error: null,
    data: [],
  },

  // 搜索内容
  filter: '',

  // 新建配置
  config: {
    isFetching: false,
    error: null,
    data: {
      type: [],
      range: {
        min: 0,
        max: 0,
      },
    },
  },

  // 当前对象及相关信息
  current: {
    isFetching: false,
    error: null,
    data: {
      id: '',
      name: '',
      status: '',
      size: '',
      type: '',
      instances: [],
      createdAt: '',
      share: false,
      backups: [],
    },
  },
};

export default handleActions({
  [FETCH_VOLUMES_REQUEST]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: !(action.meta && action.meta.refresh),
    },
  }),

  [FETCH_VOLUMES_SUCCESS]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      data: action.payload.map(vol => ({
        ...vol,
        name: vol.name || vol.id,
      })),
      error: null,
    },
  }),

  [FETCH_VOLUMES_FAILURE]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      error: action.payload,
      data: [],
    },
  }),

  [FILTER_VOLUMES]: (state, action) => ({
    ...state,
    filter: action.payload,
  }),

  [DELETE_VOLUME_REQUEST]: state => ({
    ...state,
    list: {
      ...state.list,
      isFetching: true,
    },
  }),

  [DELETE_VOLUME_SUCCESS]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      data: action.payload,
    },
  }),

  [DELETE_VOLUME_FAILURE]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      error: action.payload,
    },
  }),

  [FETCH_VOLUME_REQUEST]: state => ({
    ...state,
    current: {
      ...state.current,
      isFetching: true,
    },
  }),

  [FETCH_VOLUME_SUCCESS]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      data: { ...action.payload, name: action.payload.name || action.payload.id },
      error: null,
    },
  }),

  [FETCH_VOLUME_FAILURE]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      error: action.payload,
      data: [],
    },
  }),

  [UPDATE_VOLUME_REQUEST]: state => ({
    ...state,
    current: {
      ...state.current,
      isFetching: true,
    },
  }),

  [UPDATE_VOLUME_SUCCESS]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [UPDATE_VOLUME_FAILURE]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      error: action.payload,
      data: [],
    },
  }),

  [FETCH_VOLUME_CONFIG_REQUEST]: state => ({
    ...state,
    config: {
      ...state.config,
      isFetching: true,
    },
  }),

  [FETCH_VOLUME_CONFIG_SUCCESS]: (state, action) => ({
    ...state,
    config: {
      ...state.config,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [FETCH_VOLUME_CONFIG_FAILURE]: (state, action) => ({
    ...state,
    config: {
      ...state.config,
      isFetching: false,
      error: action.payload,
      data: {},
    },
  }),

  [CREATE_VOLUME_REQUEST]: state => ({
    ...state,
    current: {
      ...state.current,
      isFetching: true,
    },
  }),

  [CREATE_VOLUME_SUCCESS]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [CREATE_VOLUME_FAILURE]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      error: action.payload,
      data: {},
    },
  }),
}, INITIAL_STATE);
