import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PortNew from '../../components/Ports/New/index';
import { createPort } from '../../actions/port';
import { fetchSecurityGroups } from '../../actions/securityGroup';

function New(props) {
  return (
    <div className="port-new">
      <PortNew {...props} />
    </div>
  );
}

function mapStateToProps() {
  return createStructuredSelector({
    port: state => state.port,
    network: state => state.network,
    securityGroup: state => state.securityGroup,
  });
}

function mapDispatchToProps(dispatch) {
  return {
    createPort: params => dispatch(createPort(params)),
    fetchSecurityGroups: () => dispatch(fetchSecurityGroups()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(New);
