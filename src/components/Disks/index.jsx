import React from 'react';

export default function Disks(props) {
  return (
    <div>{props.children}</div>
  );
}

Disks.propTypes = {
  children: React.PropTypes.element.isRequired,
};
