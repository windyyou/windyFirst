import React from 'react';

export default function Volumes(props) {
  return (
    <div>{props.children}</div>
  );
}

Volumes.propTypes = {
  children: React.PropTypes.element.isRequired,
};
