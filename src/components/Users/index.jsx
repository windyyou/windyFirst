import React from 'react';

export default function Users(props) {
  return (
    <div>{props.children}</div>
  );
}

Users.propTypes = {
  children: React.PropTypes.element.isRequired,
};
