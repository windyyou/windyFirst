import React from 'react';
import Collapse from 'antd/lib/collapse';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import BasicInfo from '../../components/Operations/BasicInfo';
import { fetchOperation } from '../../actions/operation';

const Panel = Collapse.Panel;
const propTypes = {
  operation: React.PropTypes.shape({
    current: React.PropTypes.shape({
      isFetching: React.PropTypes.bool.isRequired,
      error: React.PropTypes.object,
      data: React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        user: React.PropTypes.string.isRequired,
        timestamp: React.PropTypes.string.isRequired,
        status: React.PropTypes.string.isRequired,
        resources: React.PropTypes.arrayOf(React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
          type: React.PropTypes.string.isRequired,
        })).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  fetchOperation: React.PropTypes.func.isRequired,
};
function loadData(props) {
  props.fetchOperation(props.params.key);
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

  render() {
    const basicInfo = this.renderBasicInfo();

    return (
      <Collapse defaultActiveKey={['1', '2', '3']}>
        <Panel header="基本属性" key="1">
          {basicInfo}
        </Panel>
      </Collapse>
    );
  }
}

Description.propTypes = propTypes;

function mapStateToProps() {
  return createStructuredSelector({
    operation: state => state.operation,
  });
}

function mapDispatchToProps(dispatch) {
  return {
    fetchOperation: key => dispatch(fetchOperation(key)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Description);
