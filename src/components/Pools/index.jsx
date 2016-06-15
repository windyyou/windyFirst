import React from 'react';

export default function Pools(props) {
  return (
    <div>{props.children}</div>
  );
}

Pools.propTypes = {
  children: React.PropTypes.element.isRequired,
};
