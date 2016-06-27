import React from 'react';
import Collapse from 'antd/lib/collapse';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import BasicInfo from '../../components/Subnets/BasicInfo';
import { fetchSubnet, updateSubnet } from '../../actions/subnet';

const Panel = Collapse.Panel;

function loadData(props) {
  props.fetchSubnet(props.params.key);
}

class Description extends React.Component {
  static propTypes = {
    subnet: React.PropTypes.shape({
      current: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        data: React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
          network: React.PropTypes.shape({
            id: React.PropTypes.string.isRequired,
            name: React.PropTypes.string.isRequired,
          }).isRequired,
          router: React.PropTypes.shape({
            id: React.PropTypes.string.isRequired,
            name: React.PropTypes.string.isRequired,
          }),
          cidr: React.PropTypes.string.isRequired,
          ipVersion: React.PropTypes.string.isRequired,
          gateway: React.PropTypes.string.isRequired,
          dhcp: React.PropTypes.bool.isRequired,
          createdAt: React.PropTypes.string.isRequired,
          status: React.PropTypes.string.isRequired,
          ports: React.PropTypes.arrayOf(React.PropTypes.shape({
            id: React.PropTypes.string.isRequired,
            name: React.PropTypes.string.isRequired,
            ip: React.PropTypes.string.isRequired,
            status: React.PropTypes.string.isRequired,
          })).isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
    fetchSubnet: React.PropTypes.func.isRequired,
    updateSubnet: React.PropTypes.func.isRequired,
  };

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

function mapStateToProps() {
  return createStructuredSelector({
    subnet: state => state.subnet,
  });
}

function mapDispatchToProps(dispatch) {
  return {
    fetchSubnet: key => dispatch(fetchSubnet(key)),
    updateSubnet: params => dispatch(updateSubnet(params)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Description);
