import React from 'react';

export default function NotificationLists(props) {
  return (
    <div>{props.children}</div>
  );
}

NotificationLists.propTypes = {
  children: React.PropTypes.element.isRequired,
};
