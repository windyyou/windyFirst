import React from 'react';
import Collapse from 'antd/lib/collapse';
import Spin from 'antd/lib/spin';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import BasicInfo from '../../components/Instances/BasicInfo';
import Keypairs from '../../components/Instances/Keypairs.jsx';
import Volumes from '../../components/Instances/Volumes.jsx';
import Snapshots from '../../components/Instances/Snapshots';
import Networks from '../../components/Instances/Networks.jsx';
import { fetchInstance, deleteVolume, deleteKeypair,
        deleteNetwork, deleteSnapshot, updateInstance,
        addSnapshot, addKeypair, addNetwork,
        addVolume,
} from '../../actions/instance';
import { fetchSnapshots } from '../../actions/snapshot';
import { fetchVolumes } from '../../actions/volume';
import { fetchKeypairs } from '../../actions/keypair';
import { fetchNetworks } from '../../actions/network';

const Panel = Collapse.Panel;
const propTypes = {
  instance: React.PropTypes.shape({
    current: React.PropTypes.shape({
      isFetching: React.PropTypes.bool.isRequired,
      error: React.PropTypes.object,
      data: React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        status: React.PropTypes.string.isRequired,
        type: React.PropTypes.string.isRequired,
        systemName: React.PropTypes.string.isRequired,
        ips: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
        floatingIps: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
        createdAt: React.PropTypes.string.isRequired,
        snapshots: React.PropTypes.arrayOf(React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          createdAt: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
          size: React.PropTypes.number.isRequired,
          status: React.PropTypes.string.isRequired,
        })).isRequired,
        volumes: React.PropTypes.arrayOf(React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
          size: React.PropTypes.number.isRequired,
          type: React.PropTypes.string.isRequired,
        })).isRequired,
        networks: React.PropTypes.arrayOf(React.PropTypes.shape({
          subnet: React.PropTypes.shape({
            id: React.PropTypes.string.isRequired,
            name: React.PropTypes.string.isRequired,
          }).isRequired,
          port: React.PropTypes.shape({
            id: React.PropTypes.string.isRequired,
            name: React.PropTypes.string.isRequired,
          }).isRequired,
          securityGroup: React.PropTypes.shape({
            id: React.PropTypes.string.isRequired,
            name: React.PropTypes.string.isRequired,
          }).isRequired,
          floatingIp: React.PropTypes.shape({
            id: React.PropTypes.string.isRequired,
            name: React.PropTypes.string.isRequired,
          }).isRequired,
        })).isRequired,
        keypairs: React.PropTypes.arrayOf(React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
        })).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  fetchInstance: React.PropTypes.func.isRequired,
  fetchSnapshots: React.PropTypes.func.isRequired,
  snapshot: React.PropTypes.object.isRequired,
  volume: React.PropTypes.object.isRequired,
  network: React.PropTypes.object.isRequired,
  keypair: React.PropTypes.object.isRequired,
  fetchVolumes: React.PropTypes.func.isRequired,
  fetchKeypairs: React.PropTypes.func.isRequired,
  fetchNetworks: React.PropTypes.func.isRequired,
  updateInstance: React.PropTypes.func.isRequired,
};
function loadData(props) {
  props.fetchInstance(props.params.key);
  props.fetchSnapshots();
  props.fetchVolumes();
  props.fetchKeypairs();
  props.fetchNetworks();
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

  renderVolumes() {
    return (
      <Volumes {...this.props} />
    );
  }

  renderSnapshots() {
    return (
      <Snapshots {...this.props} />
    );
  }

  renderKeypairs() {
    return (
      <Keypairs {...this.props} />
    );
  }

  renderNetworks() {
    return (
      <Networks {...this.props} />
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
    const current = this.props.instance.current;

    const basicInfo = current.error ?
      this.renderError(current.error) :
      this.renderBasicInfo();

    const volumes = current.error ?
      this.renderError(current.error) :
      this.renderVolumes();

    const snapshots = current.error ?
      this.renderError(current.error) :
      this.renderSnapshots();

    const keypairs = current.error ?
      this.renderError(current.error) :
      this.renderKeypairs();

    const networks = current.error ?
      this.renderError(current.error) :
      this.renderNetworks();

    return (
      <Collapse defaultActiveKey={['1', '2', '3', '4', '5']}>
        <Panel header="基本属性" key="1">
          {current.isFetching ? this.renderFetching() : basicInfo}
        </Panel>
        <Panel header="云硬盘" key="2">
          {current.isFetching ? this.renderFetching() : volumes}
        </Panel>
        <Panel header="网络" key="3">
          {current.isFetching ? this.renderFetching() : networks}
        </Panel>
        <Panel header="密钥" key="4">
          {current.isFetching ? this.renderFetching() : keypairs}
        </Panel>
        <Panel header="快照" key="5">
          {current.isFetching ? this.renderFetching() : snapshots}
        </Panel>
      </Collapse>
    );
  }
}

Description.propTypes = propTypes;

function mapStateToProps() {
  return createStructuredSelector({
    instance: state => state.instance,
    snapshot: state => state.snapshot,
    volume: state => state.volume,
    keypair: state => state.keypair,
    network: state => state.network,
  });
}

function mapDispatchToProps(dispatch) {
  return {
    fetchInstance: key => dispatch(fetchInstance(key)),
    updateInstance: param => dispatch(updateInstance(param)),
    deleteSnapshot: params => dispatch(deleteSnapshot(params)),
    deleteVolume: params => dispatch(deleteVolume(params)),
    deleteKeypair: params => dispatch(deleteKeypair(params)),
    deleteNetwork: params => dispatch(deleteNetwork(params)),
    fetchSnapshots: () => dispatch(fetchSnapshots()),
    fetchVolumes: () => dispatch(fetchVolumes()),
    fetchKeypairs: () => dispatch(fetchKeypairs()),
    fetchNetworks: () => dispatch(fetchNetworks()),
    addSnapshot: param => dispatch(addSnapshot(param)),
    addKeypair: param => dispatch(addKeypair(param)),
    addNetwork: param => dispatch(addNetwork(param)),
    addVolume: param => dispatch(addVolume(param)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Description);
