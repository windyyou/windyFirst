import React from 'react';
import Button from 'antd/lib/button';
import Table from 'antd/lib/table';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import AbstractList from '../AbstractList';
import classNames from 'classnames';
import includes from '../../../node_modules/lodash/includes';

import {
  fetchNotifications,
  filterNotifications,
  deleteNotification,
} from '../../actions/notification';

const InputGroup = Input.Group;

class List extends AbstractList {
  static propTypes = {
    list: React.PropTypes.shape({
      isFetching: React.PropTypes.bool.isRequired,
      error: React.PropTypes.object,
      filter: React.PropTypes.string.isRequired,
      data: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        type: React.PropTypes.string.isRequired,
        read: React.PropTypes.bool.isRequired,
        createdAt: React.PropTypes.string.isRequired,
      })).isRequired,
    }).isRequired,
    fetchNotifications: React.PropTypes.func.isRequired,
    filterNotifications: React.PropTypes.func.isRequired,
    deleteNotification: React.PropTypes.func.isRequired,
  };

  static contextTypes = {
    router: React.PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedRowKeys: [],
    };
  }

  loadData(props) {
    props.fetchNotifications();
  }

  getRowKey(notification) {
    return notification.id;
  }

  getColumns = () => [
    { title: '类别', dataIndex: 'type', render: this.renderBold() },
    { title: '标题', dataIndex: 'name', render: this.renderBold(this.renderLink) },
    { title: '状态', dataIndex: 'read', render: this.renderBold(this.renderStatus) },
    { title: '创建时间', dataIndex: 'createdAt', render: this.renderBold() },
  ];

  handleChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  handleInputChange = e => {
    this.props.filterNotifications(e.target.value);
  };

  handleReload = e => {
    e.preventDefault();
    this.loadData(this.props);
  };

  handlePageChange = () => {
    this.setState({
      ...this.state,
      selectedRowKeys: [],
    });
  };

  renderLink = (text, row) =>
    <Link to={`/app/notifications/${row.id}`}>{text}</Link>;

  renderBold(func = text => text) {
    return (text, row) => (row.read ? func(text, row) : <b>{func(text, row)}</b>);
  }

  renderStatus(text, row) {
    return row.read ? '已读' : <b>未读</b>;
  }

  renderNotification(rowSelection, columns, showData, pagination) {
    return (<Table
      rowKey={this.getRowKey}
      rowSelection={rowSelection}
      pagination={pagination}
      columns={columns}
      dataSource={showData}
      loading={this.props.list.isFetching}
    />);
  }

  renderError(error) {
    return (
      <span>{error.message}</span>
    );
  }

  render() {
    const { list } = this.props;
    const columns = this.getColumns();
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.handleChange,
    };
    const pagination = {
      onChange: this.handlePageChange,
    };

    const hasSelected = this.state.selectedRowKeys.length > 0;
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!list.filter.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'pull-right': true,
    });
    const notifications = list.error ?
      this.renderError(list.error) :
      this.renderNotification(rowSelection, columns, list.data, pagination);

    return (
      <div className="table-view">
        <div className="table-actions">
          <Button type="ghost" size="large" disabled={!hasSelected}>标记为已读</Button>
          <Button type="ghost" size="large" disabled={!hasSelected}>标记为未读</Button>
          <Button type="ghost" size="large" onClick={this.handleReload}>
            <Icon type="reload" />
          </Button>
          <InputGroup className={searchCls}>
            <Input
              placeholder="输入关键字" size="large"
              value={list.filter} onChange={this.handleInputChange}
            />
            <div className="ant-input-group-wrap">
              <Button className={btnCls} size="large">
                <Icon type="search" />
              </Button>
            </div>
          </InputGroup>
        </div>
        <div className="table">
          {notifications}
        </div>
      </div>
    );
  }
}

const getFilteredNotifications = createSelector(
  state => state.notification.list.data,
  state => state.notification.list.filter,
  (data, filter) => data.filter(notification => includes(notification.name, filter))
);

function mapStateToProps(state) {
  return {
    ...state.notification,
    list: {
      ...state.notification.list,
      data: getFilteredNotifications(state),
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchNotifications: () => dispatch(fetchNotifications()),
    filterNotifications: filter => dispatch(filterNotifications(filter)),
    deleteNotification: id => dispatch(deleteNotification(id)),
    refresh: () => dispatch(fetchNotifications(undefined, true)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
