import React from 'react';
import Collapse from 'antd/lib/collapse';
import Spin from 'antd/lib/spin';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import BasicInfo from '../../components/Volumes/BasicInfo';
import Backup from '../../components/Volumes/Backups.jsx';

import { fetchVolume, updateVolume, deleteBackup, addBackup } from '../../actions/volume';

const Panel = Collapse.Panel;
const propTypes = {
  volume: React.PropTypes.shape({
    current: React.PropTypes.shape({
      isFetching: React.PropTypes.bool.isRequired,
      error: React.PropTypes.object,
      data: React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        size: React.PropTypes.string.isRequired,
        status: React.PropTypes.string.isRequired,
        type: React.PropTypes.string,
        share: React.PropTypes.bool.isRequired,
        instances: React.PropTypes.arrayOf(React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
        })).isRequired,
        createdAt: React.PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  fetchVolume: React.PropTypes.func.isRequired,
  updateVolume: React.PropTypes.func.isRequired,
  deleteBackup: React.PropTypes.func.isRequired,
  addBackup: React.PropTypes.func.isRequired,
};
function loadData(props) {
  props.fetchVolume(props.params.key);
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

  renderBackup() {
    return (
      <Backup {...this.props} />
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
    const current = this.props.volume.current;

    const basicInfo = current.error ?
      this.renderError(current.error) :
      this.renderBasicInfo();

    const backup = current.error ?
      this.renderError(current.error) :
      this.renderBackup();

    return (
      <Collapse defaultActiveKey={['1', '2']}>
        <Panel header="基本属性" key="1">
          {current.isFetching ? this.renderFetching() : basicInfo}
        </Panel>
        <Panel header="备份" key="2">
          {current.isFetching ? this.renderFetching() : backup}
        </Panel>
      </Collapse>
    );
  }
}

Description.propTypes = propTypes;

function mapStateToProps() {
  return createStructuredSelector({
    volume: state => state.volume,
  });
}

function mapDispatchToProps(dispatch) {
  return {
    fetchVolume: (id) => dispatch(fetchVolume(id)),
    updateVolume: (param) => dispatch(updateVolume(param)),
    deleteBackup: (param) => dispatch(deleteBackup(param)),
    addBackup: (params) => dispatch(addBackup(params)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Description);
