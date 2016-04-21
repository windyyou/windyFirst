import React from 'react';

export default function Instances(props) {
  return (
    <div>{props.children}</div>
  );
}

Instances.propTypes = {
  children: React.PropTypes.element.isRequired,
};
