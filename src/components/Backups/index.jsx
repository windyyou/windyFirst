import React from 'react';

export default function Backups(props) {
  return (
    <div>{props.children}</div>
  );
}

Backups.propTypes = {
  children: React.PropTypes.element.isRequired,
};
