import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SecurityGroupNew from '../../components/SecurityGroups/New/index';
import { createSecurityGroup } from '../../actions/securityGroup';

function New(props) {
  return (
    <div className="security-group-new">
      <SecurityGroupNew {...props} />
    </div>
  );
}

function mapStateToProps() {
  return createStructuredSelector({
    securityGroup: state => state.securityGroup,
  });
}

function mapDispatchToProps(dispatch) {
  return {
    createSecurityGroup: params => dispatch(createSecurityGroup(params)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(New);
