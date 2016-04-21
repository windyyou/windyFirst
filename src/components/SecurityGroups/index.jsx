import React from 'react';

export default function SecurityGroups(props) {
  return (
    <div>{props.children}</div>
  );
}

SecurityGroups.propTypes = {
  children: React.PropTypes.element.isRequired,
};
