import React from 'react';
import Collapse from 'antd/lib/collapse';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import BasicInfo from '../../components/Ports/BasicInfo';
import { fetchPort, updatePort } from '../../actions/port';

const Panel = Collapse.Panel;

function loadData(props) {
  props.fetchPort(props.params.key);
}

class Description extends React.Component {
  static propTypes = {
    port: React.PropTypes.shape({
      current: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        data: React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
          ip: React.PropTypes.string.isRequired,
          mac: React.PropTypes.string.isRequired,
          createdAt: React.PropTypes.string.isRequired,
          status: React.PropTypes.string.isRequired,
          instance: React.PropTypes.shape({
            id: React.PropTypes.string.isRequired,
            name: React.PropTypes.string.isRequired,
          }),
          subnet: React.PropTypes.shape({
            id: React.PropTypes.string.isRequired,
            name: React.PropTypes.string.isRequired,
          }),
          floatingIp: React.PropTypes.shape({
            id: React.PropTypes.string.isRequired,
            name: React.PropTypes.string.isRequired,
          }),
          securityGroup: React.PropTypes.shape({
            id: React.PropTypes.string.isRequired,
            name: React.PropTypes.string.isRequired,
          }),
        }).isRequired,
      }).isRequired,
    }).isRequired,
    fetchPort: React.PropTypes.func.isRequired,
    updatePort: React.PropTypes.func.isRequired,
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
    port: state => state.port,
  });
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPort: (key) => dispatch(fetchPort(key)),
    updatePort: params => dispatch(updatePort(params)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Description);
