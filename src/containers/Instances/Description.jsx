import React from 'react';
import Collapse from 'antd/lib/collapse';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import BasicInfo from '../../components/Instances/BasicInfo';
import RelatedResources from '../../components/Instances/RelatedResources';
import Snapshots from '../../components/Instances/Snapshots';
import { fetchInstance } from '../../actions/instance';

const Panel = Collapse.Panel;
const propTypes = {
  instance: React.PropTypes.shape({
    isFetching: React.PropTypes.bool.isRequired,
    error: React.PropTypes.object,
    currentInstance: React.PropTypes.shape({
      createdAt: React.PropTypes.string.isRequired,
      type: React.PropTypes.string.isRequired,
      floatingIp: React.PropTypes.string.isRequired,
      ip: React.PropTypes.string.isRequired,
      image: React.PropTypes.string.isRequired,
      status: React.PropTypes.string.isRequired,
      name: React.PropTypes.string.isRequired,
      snapshots: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        ago: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        size: React.PropTypes.number.isRequired,
        timestamp: React.PropTypes.string.isRequired,
        status: React.PropTypes.string.isRequired,
      })),
      keypairs: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
      })),
      networks: React.PropTypes.arrayOf(React.PropTypes.shape({
        subnet: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        securityGroup: React.PropTypes.string.isRequired,
        floatingIp: React.PropTypes.string.isRequired,
      })),
      disks: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        size: React.PropTypes.number.isRequired,
      })),
    }),
  }).isRequired,
  fetchInstance: React.PropTypes.func.isRequired,
};
function loadData(props) {
  props.fetchInstance(props.params.key);
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

  renderRelatedResources() {
    return (
      <RelatedResources {...this.props} />
    );
  }

  renderSnapshots() {
    return (
      <Snapshots {...this.props} />
    );
  }

  renderFetching() {
    return (
      <span>loading...</span>
    );
  }

  renderError(error) {
    return (
      <span>{error.message}</span>
    );
  }

  render() {
    const basicInfo = this.props.instance.error ?
      this.renderError(this.props.instance.error) :
      this.renderBasicInfo();

    const relatedResources = this.props.instance.error ?
      this.renderError(this.props.instance.error) :
      this.renderRelatedResources();

    const snapshots = this.props.instance.error ?
      this.renderError(this.props.instance.error) :
      this.renderSnapshots();

    return (
      <Collapse defaultActiveKey={['1', '2', '3']}>
        <Panel header="基本属性" key="1">
          {this.props.instance.isFetching ? this.renderFetching() : basicInfo}
        </Panel>
        <Panel header="关联资源" key="2">
          {this.props.instance.isFetching ? this.renderFetching() : relatedResources}
        </Panel>
        <Panel header="快照" key="3">
          {this.props.instance.isFetching ? this.renderFetching() : snapshots}
        </Panel>
      </Collapse>
    );
  }
}

Description.propTypes = propTypes;

function mapStateToProps() {
  return createStructuredSelector({
    instance: state => state.instance,
  });
}

function mapDispatchToProps(dispatch) {
  return {
    fetchInstance: (key) => dispatch(fetchInstance(key)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Description);
