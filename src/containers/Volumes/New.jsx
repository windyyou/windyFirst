import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import VolumesNew from '../../components/Volumes/New/index';
import { fetchVolumeConfig, createVolume } from '../../actions/volume';

function loadData(props) {
  props.fetchVolumeConfig();
}

class New extends React.Component {

  componentDidMount() {
    loadData(this.props);
  }

  render() {
    return (
      <div className="volume-new">
        <VolumesNew {...this.props} />
      </div>
    );
  }
}

function mapStateToProps() {
  return createStructuredSelector({
    volume: state => state.volume,
  });
}

function mapDispatchToProps(dispatch) {
  return {
    fetchVolumeConfig: () => dispatch(fetchVolumeConfig()),
    createVolume: (params) => dispatch(createVolume(params)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(New);
