import React from 'react';
import Collapse from 'antd/lib/collapse';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import BasicInfo from '../../components/Snapshots/BasicInfo';
import { fetchSnapshot } from '../../actions/snapshot';

const Panel = Collapse.Panel;
const propTypes = {
  snapshot: React.PropTypes.shape({
    current: React.PropTypes.shape({
      isFetching: React.PropTypes.bool.isRequired,
      error: React.PropTypes.object,
      data: React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        size: React.PropTypes.string.isRequired,
        createdAt: React.PropTypes.string.isRequired,
        status: React.PropTypes.string.isRequired,
        systemName: React.PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  fetchSnapshot: React.PropTypes.func.isRequired,
};
function loadData(props) {
  props.fetchSnapshot(props.params.key);
}

class Description extends React.Component {
  componentDidMount() {
    loadData(this.props);
  }

  render() {
    return (
      <Collapse defaultActiveKey={['1']}>
        <Panel header="基本属性" key="1">
          <BasicInfo {...this.props} />
        </Panel>
      </Collapse>
    );
  }
}

Description.propTypes = propTypes;

function mapStateToProps() {
  return createStructuredSelector({
    snapshot: state => state.snapshot,
  });
}

function mapDispatchToProps(dispatch) {
  return {
    fetchSnapshot: key => dispatch(fetchSnapshot(key)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Description);
