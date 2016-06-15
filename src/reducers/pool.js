import { handleActions } from 'redux-actions';
import {
  FETCH_POOLS_REQUEST,
  FETCH_POOLS_SUCCESS,
  FETCH_POOLS_FAILURE,

  FETCH_POOL_CONFIG_REQUEST,
  FETCH_POOL_CONFIG_SUCCESS,
  FETCH_POOL_CONFIG_FAILURE,

  CREATE_POOL_REQUEST,
  CREATE_POOL_SUCCESS,
  CREATE_POOL_FAILURE,

  UPDATE_POOL_STACK_REQUEST,
  UPDATE_POOL_STACK_SUCCESS,
  UPDATE_POOL_STACK_FAILURE,

  CREATE_POOL_STACK_REQUEST,
  CREATE_POOL_STACK_SUCCESS,
  CREATE_POOL_STACK_FAILURE,
} from '../constants/pool';

const INITIAL_STATE = {
  // 列表
  list: {
    isFetching: true,
    error: null,
    data: [
      {
        id: '',
        name: '',
        description: '',
        u_cpus: 0,
        u_mems: 0,
        u_fips: {
          CTCCIps: 0,
          CMCCIps: 0,
          CUCCIps: 0,
          BGPIps: 0,
        },
        u_volumes: {
          performance: 0,
          capacity: 0,
        },
        t_cpus: 0,
        t_mems: 0,
        t_fips: {
          CTCCIps: 0,
          CMCCIps: 0,
          CUCCIps: 0,
          BGPIps: 0,
        },
        t_volumes: {
          performance: 0,
          capacity: 0,
        },
        dbaas: false,
        maas: false,
        vpnaas: false,
        lbaas: false,
        fwaas: false,
      },
    ],
  },

  config: {
    isFetching: true,
    error: null,
    data: {
      unitPrice: {
        core: 0,
        ram: 0,
        CTCCIps: 0,
        CMCCIps: 0,
        CUCCIps: 0,
        BGPIps: 0,
        performance: 0,
        capacity: 0,
        database: 0,
        alarm: 0,
        VPN: 0,
        loadbalancers: 0,
        firewalls: 0,
      },
      ipVersion: [],
      core: { core: [] },
      ram: { size: [] },
      volume: { size: 0 },
      instanceType: [],
    },
  },
};

export default handleActions({
  [FETCH_POOLS_REQUEST]: (state) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: true,
    },
  }),

  [FETCH_POOLS_SUCCESS]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [FETCH_POOLS_FAILURE]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      error: action.payload,
      data: [],
    },
  }),

  [FETCH_POOL_CONFIG_REQUEST]: (state) => ({
    ...state,
    config: {
      ...state.config,
      isFetching: true,
    },
  }),

  [FETCH_POOL_CONFIG_SUCCESS]: (state, action) => ({
    ...state,
    config: {
      ...state.config,
      isFetching: false,
      data: action.payload,
      error: null,
    },
  }),

  [FETCH_POOL_CONFIG_FAILURE]: (state, action) => ({
    ...state,
    config: {
      ...state.config,
      isFetching: false,
      error: action.payload,
      data: INITIAL_STATE.config.data,
    },
  }),

  [CREATE_POOL_REQUEST]: (state) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: true,
    },
  }),

  [CREATE_POOL_SUCCESS]: (state) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
    },
  }),

  [CREATE_POOL_FAILURE]: (state) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
    },
  }),

  [UPDATE_POOL_STACK_REQUEST]: (state) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: true,
    },
  }),

  [UPDATE_POOL_STACK_SUCCESS]: (state) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
    },
  }),

  [UPDATE_POOL_STACK_FAILURE]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      error: action.payload,
    },
  }),

  [CREATE_POOL_STACK_REQUEST]: (state) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: true,
    },
  }),

  [CREATE_POOL_STACK_SUCCESS]: (state) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
    },
  }),

  [CREATE_POOL_STACK_FAILURE]: (state, action) => ({
    ...state,
    list: {
      ...state.list,
      isFetching: false,
      error: action.payload,
    },
  }),
}, INITIAL_STATE);
