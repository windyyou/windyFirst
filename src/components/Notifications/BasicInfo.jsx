import React from 'react';

export default function NotificationDetail(props) {
  return (
    <div className="notification-detail">
      <h2>{props.current.data.name}</h2>
      <hr />
      <span className="time">发布于 {props.current.data.createdAt}</span>
      <p className="text">{props.current.data.text}</p>
    </div>
  );
}

NotificationDetail.propTypes = {
  current: React.PropTypes.shape({
    data: React.PropTypes.shape({
      createdAt: React.PropTypes.string.isRequired,
      type: React.PropTypes.string.isRequired,
      read: React.PropTypes.bool.isRequired,
      id: React.PropTypes.string.isRequired,
      name: React.PropTypes.string.isRequired,
      text: React.PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
