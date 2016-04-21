import React from 'react';

export default function FloatingIps(props) {
  return (
    <div>{props.children}</div>
  );
}

FloatingIps.propTypes = {
  children: React.PropTypes.element.isRequired,
};
