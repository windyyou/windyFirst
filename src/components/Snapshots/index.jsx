import React from 'react';

export default function Snapshots(props) {
  return (
    <div>{props.children}</div>
  );
}

Snapshots.propTypes = {
  children: React.PropTypes.element.isRequired,
};
