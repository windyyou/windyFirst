import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Icon from 'antd/lib/icon';
import Select from 'antd/lib/select';

import TaskDropdown from './../../components/TopNav/TaskDropdown';
import MessageDropdown from './../../components/TopNav/MessageDropdown';
import ProfileDropdown from './../../components/TopNav/ProfileDropdown';

import { fetchNotifications, fetchNotification, putNotification } from '../../actions/notification';

const Option = Select.Option;

function loadData(props) {
  props.fetchNotifications();
}

class TopNav extends React.Component {
  componentDidMount() {
    loadData(this.props);
  }

  render() {
    return (
      <header>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="navbar-header">
            <a href="/" className="navbar-brand"><Icon type="cloud-o" /> 云海私有云</a>
          </div>
        <span className="region">
          <Select
            defaultValue="区域-1"
            style={{ width: 100 }}
            showSearch={false}
          >
            <Option value={1}>区域-1</Option>
            <Option value={2}>区域-2</Option>
            <Option value={3}>区域-3</Option>
            <Option value={4}>区域-4</Option>
          </Select>
        </span>
          <ul className="nav navbar-top-links navbar-right">
            <MessageDropdown {...this.props} />
            <TaskDropdown />
            <ProfileDropdown />
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
    fetchNotifications: () => dispatch(fetchNotifications({ _limit: 5 })),
    fetchNotification: (id) => dispatch(fetchNotification(id)),
    putNotification: (params) => dispatch(putNotification(params)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopNav);
