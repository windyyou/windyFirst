import React from 'react';

export default function Subnets(props) {
  return (
    <div>{props.children}</div>
  );
}

Subnets.propTypes = {
  children: React.PropTypes.element.isRequired,
};
