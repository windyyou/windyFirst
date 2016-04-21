import React from 'react';

export default function NotificationInfo(props) {
  return (
    <div className="notification-detail">
      <h2>{props.notification.currentEntity.name}</h2>
      <hr />
      <span className="time">发布于 {props.notification.currentEntity.createdAt}</span>
      <p className="text">{props.notification.currentEntity.text}</p>
    </div>
  );
}

NotificationInfo.propTypes = {
  notification: React.PropTypes.shape({
    currentEntity: React.PropTypes.shape({
      createdAt: React.PropTypes.string.isRequired,
      type: React.PropTypes.string.isRequired,
      status: React.PropTypes.string.isRequired,
      id: React.PropTypes.string.isRequired,
      name: React.PropTypes.string.isRequired,
      text: React.PropTypes.string.isRequired,
    }),
  }).isRequired,
};
