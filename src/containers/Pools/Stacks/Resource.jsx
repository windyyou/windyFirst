import React from 'react';
import Collapse from 'antd/lib/collapse';
import Spin from 'antd/lib/spin';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ComputeResource from '../../../components/Pools/Stacks/ComputeResource.jsx';
import NetResource from '../../../components/Pools/Stacks/NetResource.jsx';
import StorageResource from '../../../components/Pools/Stacks/StorageResource.jsx';
import { fetchStack } from '../../../actions/stack';

const Panel = Collapse.Panel;
const propTypes = {
  stack: React.PropTypes.shape({
    current: React.PropTypes.shape({
      isFetching: React.PropTypes.bool.isRequired,
      error: React.PropTypes.object,
      data: React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        compute: React.PropTypes.arrayOf(React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
          type: React.PropTypes.string.isRequired,
          status: React.PropTypes.string.isRequired,
          createdAt: React.PropTypes.string.isRequired,
          updatedAt: React.PropTypes.string.isRequired,
        })).isRequired,
        storage: React.PropTypes.arrayOf(React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
          type: React.PropTypes.string.isRequired,
          status: React.PropTypes.string.isRequired,
          createdAt: React.PropTypes.string.isRequired,
          updatedAt: React.PropTypes.string.isRequired,
        })).isRequired,
        network: React.PropTypes.arrayOf(React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
          type: React.PropTypes.string.isRequired,
          status: React.PropTypes.string.isRequired,
          createdAt: React.PropTypes.string.isRequired,
          updatedAt: React.PropTypes.string.isRequired,
        })).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

function loadData(props) {
  props.fetchStack(props.params.key);
}

class Description extends React.Component {
  componentDidMount() {
    loadData(this.props);
  }

  renderComputeResource() {
    return (
      <ComputeResource {...this.props} />
    );
  }

  renderNetResource() {
    return (
      <NetResource {...this.props} />
    );
  }

  renderStorageResource() {
    return (
      <StorageResource {...this.props} />
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
    const current = this.props.stack.current;

    const computeResource = current.error ?
      this.renderError(current.error) :
      this.renderComputeResource();

    const netResource = current.error ?
      this.renderError(current.error) :
      this.renderNetResource();

    const storageResource = current.error ?
      this.renderError(current.error) :
      this.renderStorageResource();

    return (
      <Collapse defaultActiveKey={['1', '2', '3']}>
        <Panel header="计算资源" key="1">
          {current.isFetching ? this.renderFetching() : computeResource}
        </Panel>
        <Panel header="存储资源" key="2">
          {current.isFetching ? this.renderFetching() : storageResource}
        </Panel>
        <Panel header="网络资源" key="3">
          {current.isFetching ? this.renderFetching() : netResource}
        </Panel>
      </Collapse>
    );
  }
}

Description.propTypes = propTypes;

function mapStateToProps() {
  return createStructuredSelector({
    stack: state => state.stack,
  });
}

function mapDispatchToProps(dispatch) {
  return {
    fetchStack: (key) => dispatch(fetchStack(key)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Description);
