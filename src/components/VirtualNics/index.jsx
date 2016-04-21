import React from 'react';

export default function VirtualNics(props) {
  return (
    <div>{props.children}</div>
  );
}

VirtualNics.propTypes = {
  children: React.PropTypes.element.isRequired,
};
