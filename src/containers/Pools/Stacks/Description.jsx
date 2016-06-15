import React from 'react';
import Collapse from 'antd/lib/collapse';
import Spin from 'antd/lib/spin';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import BasicInfo from '../../../components/Pools/Stacks/BasicInfo.jsx';
import { fetchStack, updateStack } from '../../../actions/stack';

const Panel = Collapse.Panel;
const propTypes = {
  stack: React.PropTypes.shape({
    current: React.PropTypes.shape({
      isFetching: React.PropTypes.bool.isRequired,
      error: React.PropTypes.object,
      data: React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        description: React.PropTypes.string.isRequired,
        status: React.PropTypes.string.isRequired,
        createdAt: React.PropTypes.string.isRequired,
        updatedAt: React.PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  updateStack: React.PropTypes.func.isRequired,
};
function loadData(props) {
  props.fetchStack(props.params.key);
}

class Description extends React.Component {
  componentDidMount() {
    loadData(this.props);
  }

  renderBasicInfo() {
    return (
      <BasicInfo {...this.props} />
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

    const basicInfo = current.error ?
      this.renderError(current.error) :
      this.renderBasicInfo();

    return (
      <Collapse defaultActiveKey={['1']}>
        <Panel header="基本属性" key="1">
          {current.isFetching ? this.renderFetching() : basicInfo}
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
    updateStack: (param) => dispatch(updateStack(param)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Description);
