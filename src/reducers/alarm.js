import { handleActions } from 'redux-actions';
import {
  FETCH_ALARMS_REQUEST,
  FETCH_ALARMS_SUCCESS,
  FETCH_ALARMS_FAILURE,

  FETCH_ALARM_CONFIG_REQUEST,
  FETCH_ALARM_CONFIG_SUCCESS,
  FETCH_ALARM_CONFIG_FAILURE,

  FILTER_ALARMS,

  SELECT_ALARM_RESOURCE_TYPE,

  CREATE_ALARM_REQUEST,
  CREATE_ALARM_SUCCESS,
  CREATE_ALARM_FAILURE,

  FETCH_ALARM_REQUEST,
  FETCH_ALARM_SUCCESS,
  FETCH_ALARM_FAILURE,

  UPDATE_ALARM_REQUEST,
  UPDATE_ALARM_SUCCESS,
  UPDATE_ALARM_FAILURE,

  DELETE_ALARM_REQUEST,
  DELETE_ALARM_SUCCESS,
  DELETE_ALARM_FAILURE,

  DELETE_ALARM_NOTIFICATION_REQUEST,
  DELETE_ALARM_NOTIFICATION_SUCCESS,
  DELETE_ALARM_NOTIFICATION_FAILURE,

  DELETE_ALARM_RESOURCE_REQUEST,
  DELETE_ALARM_RESOURCE_SUCCESS,
  DELETE_ALARM_RESOURCE_FAILURE,

  DELETE_ALARM_RULE_REQUEST,
  DELETE_ALARM_RULE_SUCCESS,
  DELETE_ALARM_RULE_FAILURE,
} from '../constants/alarm';

const INITIAL_STATE = {
  // 列表
  list: {
    isFetching: false,
    error: null,
    data: [],
  },

  // 搜索内容
  filter: '',

  // 新建时 resource Type
  resourceType: '',

  // 新建配置
  config: {
    isFetching: false,
    error: null,
    data: {
      resource: [],
      item: [],
      period: [],
      condition: [],
      serviceCondition: [],
      serviceThreshold: [],
      status: [],
    },
  },

  // 当前对象及相关信息
  current: {
    isFetching: false,
    error: null,
    data: {
      resources: [],
      notifications: [],
      rules: [],
      createdAt: '',
      enable: '',
      status: '',
      name: '',
      id: '',
      description: '',
      type: '',
    },
  },
};

export default handleActions({
  [FETCH_ALARMS_REQUEST]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: !(action.meta && action.meta.refresh),
    },
  }),

  [FETCH_ALARMS_SUCCESS]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [FETCH_ALARMS_FAILURE]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      error: action.payload,
      data: [],
    },
  }),

  [FETCH_ALARM_CONFIG_REQUEST]: state => ({
    ...state,
    config: {
      ...state.config,
      isFetching: true,
    },
  }),

  [FETCH_ALARM_CONFIG_SUCCESS]: (state, action) => ({
    ...state,
    config: {
      ...state.config,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [FETCH_ALARM_CONFIG_FAILURE]: (state, action) => ({
    ...state,
    config: {
      ...state.config,
      isFetching: false,
      error: action.payload,
      data: {},
    },
  }),

  [FILTER_ALARMS]: (state, action) => ({
    ...state,
    filter: action.payload,
  }),

  [FETCH_ALARM_REQUEST]: state => ({
    ...state,
    current: {
      ...state.current,
      isFetching: true,
    },
  }),

  [FETCH_ALARM_SUCCESS]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [FETCH_ALARM_FAILURE]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      error: action.payload,
      data: {},
    },
  }),

  [UPDATE_ALARM_REQUEST]: state => ({
    ...state,
    isFetching: true,
  }),

  [UPDATE_ALARM_SUCCESS]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [UPDATE_ALARM_FAILURE]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      error: action.payload,
      data: {},
    },
  }),

  [SELECT_ALARM_RESOURCE_TYPE]: (state, action) => ({
    ...state,
    resourceType: action.payload,
  }),

  [CREATE_ALARM_REQUEST]: state => ({
    ...state,
    current: {
      ...state.current,
      isFetching: true,
    },
  }),

  [CREATE_ALARM_SUCCESS]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [CREATE_ALARM_FAILURE]: (state, action) => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
      error: action.payload,
      data: {},
    },
  }),

  [DELETE_ALARM_REQUEST]: state => ({
    ...state,
    list: {
      ...state.list,
      isFetching: true,
    },
  }),

  [DELETE_ALARM_SUCCESS]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      data: action.payload,
    },
  }),

  [DELETE_ALARM_FAILURE]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      error: action.payload,
    },
  }),

  [DELETE_ALARM_NOTIFICATION_REQUEST]: state => ({
    ...state,
    current: {
      ...state.current,
      isFetching: true,
    },
  }),

  [DELETE_ALARM_NOTIFICATION_SUCCESS]: state => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
    },
  }),

  [DELETE_ALARM_NOTIFICATION_FAILURE]: state => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
    },
  }),

  [DELETE_ALARM_RULE_REQUEST]: state => ({
    ...state,
    current: {
      ...state.current,
      isFetching: true,
    },
  }),

  [DELETE_ALARM_RULE_SUCCESS]: state => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
    },
  }),

  [DELETE_ALARM_RULE_FAILURE]: state => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
    },
  }),

  [DELETE_ALARM_RESOURCE_REQUEST]: state => ({
    ...state,
    current: {
      ...state.current,
      isFetching: true,
    },
  }),

  [DELETE_ALARM_RESOURCE_SUCCESS]: state => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
    },
  }),

  [DELETE_ALARM_RESOURCE_FAILURE]: state => ({
    ...state,
    current: {
      ...state.current,
      isFetching: false,
    },
  }),
}, INITIAL_STATE);

