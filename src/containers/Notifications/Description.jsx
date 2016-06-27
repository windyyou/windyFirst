import React from 'react';
import Spin from 'antd/lib/spin';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import NotificationInfo from '../../components/Notifications/BasicInfo';
import { fetchNotification } from '../../actions/notification';

function loadData(props) {
  props.fetchNotification(props.params.key);
}

class Description extends React.Component {
  static propTypes = {
    current: React.PropTypes.shape({
      isFetching: React.PropTypes.bool.isRequired,
      error: React.PropTypes.object,
      data: React.PropTypes.shape({
        createdAt: React.PropTypes.string.isRequired,
        type: React.PropTypes.string.isRequired,
        read: React.PropTypes.bool.isRequired,
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        text: React.PropTypes.string.isRequired,
      }),
    }).isRequired,
    fetchNotification: React.PropTypes.func.isRequired,
  };

  componentDidMount() {
    loadData(this.props);
  }

  renderFetching() {
    return (
      <Spin size="default" />
    );
  }

  renderError(error) {
    return (
      <span>{error.message}</span>
    );
  }

  renderNotification() {
    return (
      <NotificationInfo {...this.props} />
    );
  }

  render() {
    const notificationInfo = this.props.current.error ?
      this.renderError(this.props.current.error) :
      this.renderNotification();

    return (
      <div>
        {this.props.current.isFetching ? this.renderFetching() : notificationInfo}
      </div>
    );
  }
}

function mapStateToProps() {
  return createStructuredSelector({
    current: state => state.notification.current,
  });
}

function mapDispatchToProps(dispatch) {
  return {
    fetchNotification: id => dispatch(fetchNotification(id)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Description);
