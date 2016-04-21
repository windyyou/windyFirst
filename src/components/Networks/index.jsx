import React from 'react';

export default function Networks(props) {
  return (
    <div>{props.children}</div>
  );
}

Networks.propTypes = {
  children: React.PropTypes.element.isRequired,
};
