import React from 'react';
import Button from 'antd/lib/button';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Collapse from 'antd/lib/collapse';
import { fetchPools } from '../../actions/pool';
import { fetchStacks, filterStacks, deleteStack } from '../../actions/stack';
import Usage from '../../components/Pools/Usage.jsx';
import Stack from '../../components/Pools/Stack.jsx';
import includes from '../../../node_modules/lodash/includes';
import Unsage from '../../components/Pools/Disabled.jsx';
import Spin from 'antd/lib/spin';
import AbstractList from '../AbstractList';

const Panel = Collapse.Panel;

class List extends AbstractList {
  static propTypes = {
    pool: React.PropTypes.shape({
      list: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        data: React.PropTypes.arrayOf(React.PropTypes.shape({
          t_cpus: React.PropTypes.number,
          t_mems: React.PropTypes.number.isRequired,
          t_volumes: React.PropTypes.shape({
            performance: React.PropTypes.number,
            capacity: React.PropTypes.number,
          }),
          t_fips: React.PropTypes.shape({
            CTCCIps: React.PropTypes.number.isRequired,
            CMCCIps: React.PropTypes.number.isRequired,
            CUCCIps: React.PropTypes.number.isRequired,
            BGPIps: React.PropTypes.number.isRequired,
          }).isRequired,
          u_cpus: React.PropTypes.number.isRequired,
          u_mems: React.PropTypes.number.isRequired,
          u_volumes: React.PropTypes.shape({
            performance: React.PropTypes.number,
            capacity: React.PropTypes.number,
          }),
          u_fips: React.PropTypes.shape({
            CTCCIps: React.PropTypes.number.isRequired,
            CMCCIps: React.PropTypes.number.isRequired,
            CUCCIps: React.PropTypes.number.isRequired,
            BGPIps: React.PropTypes.number.isRequired,
          }).isRequired,
        })),
      }).isRequired,
    }).isRequired,
    stack: React.PropTypes.shape({
      filter: React.PropTypes.string,
      list: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        data: React.PropTypes.arrayOf(React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
          status: React.PropTypes.string.isRequired,
          createdAt: React.PropTypes.string.isRequired,
          updatedAt: React.PropTypes.string,
        })).isRequired,
      }).isRequired,
    }).isRequired,
    fetchStacks: React.PropTypes.func.isRequired,
    filterStacks: React.PropTypes.func.isRequired,
    deleteStack: React.PropTypes.func.isRequired,
    fetchPools: React.PropTypes.func.isRequired,
  };

  static contextTypes = {
    router: React.PropTypes.object,
  };


  loadData(props) {
    props.fetchPools();
    props.fetchStacks();
  }

  handleCreateClick = e => {
    if (e.stopPropagation) {
      e.stopPropagation();
    } else {
      window.event.cancelBubble = true;
    }

    this.context.router.push('/app/apply/quota');
  };

  renderUsage() {
    return (
      <Usage {...this.props} />
    );
  }

  renderStack() {
    return (
      <Stack {...this.props} />
    );
  }

  renderDisabled() {
    return (
      <Unsage {...this.props} />
    );
  }

  renderFetching() {
    return (
      <Spin size="default" />
    );
  }

  renderError(error) {
    return (
      <span>{error.message}</span>
    );
  }

  render() {
    const disabled = this.renderDisabled();
    const hasPool = this.props.pool.list.data.length > 0;
    const header = (
      <div className="pool-header">
        <div className="Collapse-header">
          <span>资源池</span>
          <Button
            type="ghost"
            className="pull-right action-button buttonCenter"
            onClick={this.handleCreateClick}
          >申请配额</Button>
        </div>
      </div>
    );
    const isFetching = this.props.pool.list.isFetching;
    const error = this.props.pool.list.error;
    let contents = '';

    if (isFetching) {
      contents = this.renderFetching();
    } else if (error) {
      contents = this.renderError(error);
    } else {
      const usage = this.renderUsage();
      const stack = this.renderStack();
      contents = (<div className="table-view">
        <Collapse defaultActiveKey={['1', '2']}>
          <Panel header={header} key="1">
            {usage}
          </Panel>
          <Panel header="模板" key="2">
            {stack}
          </Panel>
        </Collapse>
      </div>);
    }

    return (
      <div>
        {hasPool ? contents : disabled}
      </div>
    );
  }
}

const getFilteredStacks = createSelector(
  state => state.stack.list.data,
  state => state.stack.filter,
  (listData, filter) => listData.filter(stack => includes(stack.name, filter))
);

function mapStateToProps(state) {
  return {
    stack: {
      ...state.stack,
      list: { ...state.stack.list, data: getFilteredStacks(state) },
    },
    pool: { ...state.pool },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPools: params => dispatch(fetchPools(params)),
    fetchStacks: params => dispatch(fetchStacks(params)),
    filterStacks: filter => dispatch(filterStacks(filter)),
    deleteStack: id => dispatch(deleteStack(id)),
    refresh: () => dispatch(fetchPools(undefined, true)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
