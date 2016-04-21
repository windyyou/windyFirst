import React from 'react';

export default function Notifications(props) {
  return (
    <div>{props.children}</div>
  );
}

Notifications.propTypes = {
  children: React.PropTypes.element.isRequired,
};
