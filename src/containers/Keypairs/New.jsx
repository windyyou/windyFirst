import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import KeypairNew from '../../components/Keypairs/New/index';
import { createKeypair } from '../../actions/keypair';

function New(props) {
  return (
    <div className="keypair-new">
      <KeypairNew {...props} />
    </div>
  );
}

function mapStateToProps() {
  return createStructuredSelector({
    keypair: state => state.keypair,
  });
}

function mapDispatchToProps(dispatch) {
  return {
    createKeypair: params => dispatch(createKeypair(params)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(New);
