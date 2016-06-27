import React from 'react';
import { connect } from 'react-redux';

import NewNotificationList from '../../components/NotificationLists/New/index';
import { createNotificationList } from '../../actions/notificationList';

function New(props) {
  return (
    <div className="notification-list-new">
      <NewNotificationList
        {...props}
      />
    </div>
  );
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    createNotificationList: params => dispatch(createNotificationList(params)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(New);
