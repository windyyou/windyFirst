import React from 'react';

export default function Operations(props) {
  return (
    <div>{props.children}</div>
  );
}

Operations.propTypes = {
  children: React.PropTypes.element.isRequired,
};
