import React from 'react';

export default function Alarms(props) {
  return (
    <div>{props.children}</div>
  );
}

Alarms.propTypes = {
  children: React.PropTypes.element.isRequired,
};
