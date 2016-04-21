import React from 'react';

export default function Firewalls(props) {
  return (
    <div>{props.children}</div>
  );
}

Firewalls.propTypes = {
  children: React.PropTypes.element.isRequired,
};
