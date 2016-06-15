import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import NetworkNew from '../../components/Networks/New/index';
import { createNetwork } from '../../actions/network';

function New(props) {
  return (
    <div className="network-new">
      <NetworkNew {...props} />
    </div>
  );
}

function mapStateToProps() {
  return createStructuredSelector({
    network: state => state.network,
  });
}

function mapDispatchToProps(dispatch) {
  return {
    createNetwork: (params) => dispatch(createNetwork(params)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(New);
