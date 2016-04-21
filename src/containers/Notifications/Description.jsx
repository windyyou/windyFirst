import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import NotificationInfo from '../../components/Notifications/NotificationInfo';
import { fetchNotification, putNotification } from '../../actions/notification';

const propTypes = {
  notification: React.PropTypes.shape({
    isFetching: React.PropTypes.bool.isRequired,
    error: React.PropTypes.object,
    currentEntity: React.PropTypes.shape({
      createdAt: React.PropTypes.string.isRequired,
      type: React.PropTypes.string.isRequired,
      status: React.PropTypes.string.isRequired,
      id: React.PropTypes.string.isRequired,
      name: React.PropTypes.string.isRequired,
      text: React.PropTypes.string.isRequired,
    }),
  }).isRequired,
  fetchNotification: React.PropTypes.func.isRequired,
  putNotification: React.PropTypes.func.isRequired,
};

function loadData(props) {
  props.fetchNotification(props.params.key);
  props.putNotification({ ...props.notification.currentEntity, id: props.params.key, status: '已读' });
}

class Description extends React.Component {
  componentDidMount() {
    loadData(this.props);
  }

  renderNotification() {
    return (
      <NotificationInfo {...this.props} />
    );
  }

  renderFetching() {
    return (
      <span>loading...</span>
    );
  }

  renderError(error) {
    return (
      <span>{error.message}</span>
    );
  }

  render() {
    const notificationInfo = this.props.notification.error ?
      this.renderError(this.props.notification.error) :
      this.renderNotification();

    return (
      <div>
        {this.props.notification.isFetching ? this.renderFetching() : notificationInfo}
      </div>
    );
  }
}

Description.propTypes = propTypes;

function mapStateToProps() {
  return createStructuredSelector({
    notification: state => state.notification,
  });
}

function mapDispatchToProps(dispatch) {
  return {
    fetchNotification: (key) => dispatch(fetchNotification(key)),
    putNotification: (params) => dispatch(putNotification(params)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Description);
