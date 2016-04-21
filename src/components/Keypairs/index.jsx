import React from 'react';

export default function Keypairs(props) {
  return (
    <div>{props.children}</div>
  );
}

Keypairs.propTypes = {
  children: React.PropTypes.element.isRequired,
};
