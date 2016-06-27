import React from 'react';
import Collapse from 'antd/lib/collapse';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import BasicInfo from '../../components/Networks/BasicInfo';
import { fetchNetwork, updateNetwork } from '../../actions/network';

const Panel = Collapse.Panel;
const propTypes = {
  network: React.PropTypes.shape({
    current: React.PropTypes.shape({
      isFetching: React.PropTypes.bool.isRequired,
      error: React.PropTypes.object,
      data: React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        managed: React.PropTypes.bool.isRequired,
        createdAt: React.PropTypes.string.isRequired,
        status: React.PropTypes.string.isRequired,
        subnets: React.PropTypes.arrayOf(React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
          cidr: React.PropTypes.string.isRequired,
          ipVersion: React.PropTypes.string.isRequired,
          gateway: React.PropTypes.string.isRequired,
          dhcp: React.PropTypes.bool.isRequired,
        })).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  fetchNetwork: React.PropTypes.func.isRequired,
  updateNetwork: React.PropTypes.func.isRequired,
};
function loadData(props) {
  props.fetchNetwork(props.params.key);
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
    network: state => state.network,
  });
}

function mapDispatchToProps(dispatch) {
  return {
    fetchNetwork: key => dispatch(fetchNetwork(key)),
    updateNetwork: params => dispatch(updateNetwork(params)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Description);
