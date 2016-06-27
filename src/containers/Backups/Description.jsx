import React from 'react';
import Collapse from 'antd/lib/collapse';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import BasicInfo from '../../components/Backups/BasicInfo';
import { fetchBackup } from '../../actions/backup';

const Panel = Collapse.Panel;
const propTypes = {
  backup: React.PropTypes.shape({
    current: React.PropTypes.shape({
      isFetching: React.PropTypes.bool.isRequired,
      error: React.PropTypes.object,
      data: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        status: React.PropTypes.string.isRequired,
        size: React.PropTypes.string.isRequired,
        volume: React.PropTypes.object.isRequired,
        createdAt: React.PropTypes.string.isRequired,
      })).isRequired,
    }).isRequired,
  }).isRequired,
  fetchBackup: React.PropTypes.func.isRequired,
};
function loadData(props) {
  props.fetchBackup(props.params.key);
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
    backup: state => state.backup,
  });
}

function mapDispatchToProps(dispatch) {
  return {
    fetchBackup: key => dispatch(fetchBackup(key)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Description);
