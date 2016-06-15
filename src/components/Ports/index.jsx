import React from 'react';

export default function Ports(props) {
  return (
    <div>{props.children}</div>
  );
}

Ports.propTypes = {
  children: React.PropTypes.element.isRequired,
};
