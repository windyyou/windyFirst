import { handleActions } from 'redux-actions';
import {
  FETCH_INSTANCES_REQUEST,
  FETCH_INSTANCES_SUCCESS,
  FETCH_INSTANCES_FAILURE,

  FETCH_INSTANCE_CONFIG_REQUEST,
  FETCH_INSTANCE_CONFIG_SUCCESS,
  FETCH_INSTANCE_CONFIG_FAILURE,

  FILTER_INSTANCES,

  FETCH_INSTANCE_REQUEST,
  FETCH_INSTANCE_SUCCESS,
  FETCH_INSTANCE_FAILURE,

  CREATE_INSTANCE_REQUEST,
  CREATE_INSTANCE_SUCCESS,
  CREATE_INSTANCE_FAILURE,

  DELETE_INSTANCE_REQUEST,
  DELETE_INSTANCE_SUCCESS,
  DELETE_INSTANCE_FAILURE,

  DELETE_VOLUME_REQUEST,
  DELETE_VOLUME_SUCCESS,
  DELETE_VOLUME_FAILURE,

  DELETE_KEYPAIR_REQUEST,
  DELETE_KEYPAIR_SUCCESS,
  DELETE_KEYPAIR_FAILURE,

  DELETE_NETWORK_REQUEST,
  DELETE_NETWORK_SUCCESS,
  DELETE_NETWORK_FAILURE,

  DELETE_SNAPSHOT_REQUEST,
  DELETE_SNAPSHOT_SUCCESS,
  DELETE_SNAPSHOT_FAILURE,

  UPDATE_INSTANCE_REQUEST,
  UPDATE_INSTANCE_SUCCESS,
  UPDATE_INSTANCE_FAILURE,

  ADD_KEYPAIR_REQUEST,
  ADD_KEYPAIR_SUCCESS,
  ADD_KEYPAIR_FAILURE,

  ADD_NETWORK_REQUEST,
  ADD_NETWORK_SUCCESS,
  ADD_NETWORK_FAILURE,

  ADD_SNAPSHOT_REQUEST,
  ADD_SNAPSHOT_SUCCESS,
  ADD_SNAPSHOT_FAILURE,

  ADD_VOLUME_REQUEST,
  ADD_VOLUME_SUCCESS,
  ADD_VOLUME_FAILURE,
} from '../constants/instance';

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
      core: { core: [], unitPrice: 0 },
      ram: { size: [], unitPrice: 0 },
      volume: { size: 0, type: [] },
    },
  },

  // 当前对象及相关信息
  current: {
    isFetching: false,
    error: null,
    data: {
      keypairs: [],
      volumes: [],
      networks: [],
      snapshots: [],
      createdAt: '',
      type: '',
      floatingIps: [],
      ips: [],
      systemName: '',
      status: '',
      name: '',
      id: '',
    },
  },
};

export default handleActions({
  [FETCH_INSTANCES_REQUEST]: (state) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: true,
    },
  }),

  [FETCH_INSTANCES_SUCCESS]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [FETCH_INSTANCES_FAILURE]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      error: action.payload,
      data: [],
    },
  }),

  [FETCH_INSTANCE_CONFIG_REQUEST]: (state) => ({
    ...state,
    config: {
      ...state.config,
      isFetching: true,
    },
  }),

  [FETCH_INSTANCE_CONFIG_SUCCESS]: (state, action) => ({
    ...state,
    config: {
      ...state.config,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [FETCH_INSTANCE_CONFIG_FAILURE]: (state, action) => ({
    ...state,
    config: {
      ...state.config,
      isFetching: false,
      error: action.payload,
      data: {
        core: { core: [], unitPrice: 0 },
        ram: { size: [], unitPrice: 0 },
        volume: { size: 0, type: [] },
      },
    },
  }),

  [FILTER_INSTANCES]: (state, action) => ({
    ...state,
    filter: action.payload,
  }),

  [FETCH_INSTANCE_REQUEST]: (state) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: true,
    },
  }),

  [FETCH_INSTANCE_SUCCESS]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [FETCH_INSTANCE_FAILURE]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      error: action.payload,
      data: {},
    },
  }),

  [CREATE_INSTANCE_REQUEST]: (state) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: true,
    },
  }),

  [CREATE_INSTANCE_SUCCESS]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [CREATE_INSTANCE_FAILURE]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      error: action.payload,
      data: {},
    },
  }),

  [DELETE_INSTANCE_REQUEST]: (state) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: true,
    },
  }),

  [DELETE_INSTANCE_SUCCESS]: (state) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
    },
  }),

  [DELETE_INSTANCE_FAILURE]: (state) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
    },
  }),

  [DELETE_SNAPSHOT_REQUEST]: (state) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: true,
    },
  }),

  [DELETE_SNAPSHOT_SUCCESS]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [DELETE_SNAPSHOT_FAILURE]: (state) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
    },
  }),

  [DELETE_NETWORK_REQUEST]: (state) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: true,
    },
  }),

  [DELETE_NETWORK_SUCCESS]: (state) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
    },
  }),

  [DELETE_NETWORK_FAILURE]: (state) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
    },
  }),

  [DELETE_VOLUME_REQUEST]: (state) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: true,
    },
  }),

  [DELETE_VOLUME_SUCCESS]: (state) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
    },
  }),

  [DELETE_VOLUME_FAILURE]: (state) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
    },
  }),

  [DELETE_KEYPAIR_REQUEST]: (state) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: true,
    },
  }),

  [DELETE_KEYPAIR_SUCCESS]: (state) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
    },
  }),

  [DELETE_KEYPAIR_FAILURE]: (state) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
    },
  }),

  [UPDATE_INSTANCE_REQUEST]: (state) => ({
    ...state,
    isFetching: true,
  }),

  [UPDATE_INSTANCE_SUCCESS]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [UPDATE_INSTANCE_FAILURE]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      error: action.payload,
      data: {},
    },
  }),

  [ADD_SNAPSHOT_REQUEST]: (state) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: true,
    },
  }),

  [ADD_SNAPSHOT_SUCCESS]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [ADD_SNAPSHOT_FAILURE]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      error: action.payload,
    },
  }),

  [ADD_NETWORK_REQUEST]: (state) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: true,
    },
  }),

  [ADD_NETWORK_SUCCESS]: (state) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
    },
  }),

  [ADD_NETWORK_FAILURE]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      error: action.payload,
    },
  }),

  [ADD_VOLUME_REQUEST]: (state) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: true,
    },
  }),

  [ADD_VOLUME_SUCCESS]: (state) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
    },
  }),

  [ADD_VOLUME_FAILURE]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      error: action.payload,
    },
  }),

  [ADD_KEYPAIR_REQUEST]: (state) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: true,
    },
  }),

  [ADD_KEYPAIR_SUCCESS]: (state) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
    },
  }),

  [ADD_KEYPAIR_FAILURE]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      error: action.payload,
    },
  }),
}, INITIAL_STATE);
