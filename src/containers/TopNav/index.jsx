import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Select from 'antd/lib/select';

import TaskDropdown from './../../components/TopNav/TaskDropdown';
import MessageDropdown from './../../components/TopNav/MessageDropdown';
import ProfileDropdown from './../../components/TopNav/ProfileDropdown';

import {
  fetchNotifications,
  fetchNotification,
} from '../../actions/notification';
import { logout } from '../../actions/auth';

// import { getToken } from '../../utils/auth';

// const jwtDecode = require('jwt-decode');
const Option = Select.Option;

function loadData(props) {
  props.fetchNotifications({ _limit: 5 });
}

class TopNav extends React.Component {
  static propTypes = {
    logout: React.PropTypes.func.isRequired,
  };

  componentDidMount() {
    loadData(this.props);
  }

  render() {
    // const token = jwtDecode(getToken());
    const token = {
      user: { name: 'admin', id: 'asdfasdfasdf4' },
    };
    return (
      <header>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="navbar-header">
            <a href="/" className="navbar-brand" />
          </div>
          <span className="region">
            <Select
              defaultValue="上海"
              style={{ width: 100 }}
              showSearch={false}
            >
              <Option value={1}>上海</Option>
            </Select>
          </span>
          <ul className="nav navbar-top-links navbar-right">
            <MessageDropdown {...this.props} />
            <TaskDropdown />
            <ProfileDropdown
              handleLogout={this.props.logout}
              auth={token}
            />
          </ul>
        </nav>
      </header>
    );
  }
}

function mapStateToProps() {
  return createStructuredSelector({
    notification: state => state.notification,
  });
}

function mapDispatchToProps(dispatch) {
  return {
    fetchNotifications: () => dispatch(fetchNotifications()),
    fetchNotification: id => dispatch(fetchNotification(id)),
    logout: () => dispatch(logout()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopNav);
