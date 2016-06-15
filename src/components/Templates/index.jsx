import React from 'react';

export default function Templates(props) {
  return (
    <div>{props.children}</div>
  );
}

Templates.propTypes = {
  children: React.PropTypes.element.isRequired,
};
