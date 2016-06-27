import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SubnetNew from '../../components/Subnets/New/index';
import { createSubnet } from '../../actions/subnet';

function New(props) {
  return (
    <div className="subnet-new">
      <SubnetNew {...props} />
    </div>
  );
}

function mapStateToProps() {
  return createStructuredSelector({
    subnet: state => state.subnet,
    network: state => state.network,
  });
}

function mapDispatchToProps(dispatch) {
  return {
    createSubnet: params => dispatch(createSubnet(params)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(New);
