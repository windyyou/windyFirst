import React from 'react';
import Button from 'antd/lib/button';
import Table from 'antd/lib/table';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Popconfirm from 'antd/lib/popconfirm';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import classNames from 'classnames';
import includes from '../../../node_modules/lodash/includes';
import { fetchNotificationLists, filterNotificationLists,
          deleteNotificationList } from '../../actions/notificationList';

const InputGroup = Input.Group;

function renderLink(text, row) {
  return <Link to={`/app/notification-lists/${row.id}`}>{text}</Link>;
}

function renderVerifiedTerminals(text, record) {
  let count = 0;
  record.terminals.forEach((terminal) => {
    count += terminal.verified ? 1 : 0;
  });
  return count;
}

function getColumns() {
  return [
    { title: '名称', dataIndex: 'name', render: renderLink },
    { title: '描述', dataIndex: 'description' },
    { title: '已验证终端数', dataIndex: 'verifiedTerminals', render: renderVerifiedTerminals },
    { title: '创建时间', dataIndex: 'createdAt' },
  ];
}

function loadData(props) {
  props.fetchNotificationLists();
}

class List extends React.Component {
  static propTypes = {
    notificationList: React.PropTypes.shape({
      list: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        data: React.PropTypes.arrayOf(React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
          description: React.PropTypes.string.isRequired,
          createdAt: React.PropTypes.string.isRequired,
        })),
      }),
      filter: React.PropTypes.string,
    }),
    fetchNotificationLists: React.PropTypes.func.isRequired,
    filterNotificationLists: React.PropTypes.func.isRequired,
    deleteNotificationList: React.PropTypes.func.isRequired,
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

  componentDidMount() {
    loadData(this.props);
  }

  getRowKey(notificationList) {
    return notificationList.id;
  }

  handleChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  handleCreateClick = (event) => {
    event.preventDefault();
    this.context.router.push('/app/notification-lists/new');
  };

  handleInputChange = (e) => {
    this.props.filterNotificationLists(e.target.value);
  };

  handleReload = (e) => {
    e.preventDefault();
    loadData(this.props);
  };

  handleDelete = () => {
    const id = this.state.selectedRowKeys[0];
    this.props.deleteNotificationList(id);

    this.setState({
      selectedRowKeys: [],
    });
  };

  renderNotificationList(rowSelection, columns, showData) {
    return (<Table
      rowKey={this.getRowKey}
      rowSelection={rowSelection}
      columns={columns}
      dataSource={showData}
      loading={this.props.notificationList.list.isFetching}
    />);
  }

  renderError(error) {
    return (
      <span>{error.message}</span>
    );
  }

  render() {
    const { notificationList } = this.props;
    const columns = getColumns();
    const rowSelection = {
      getCheckboxProps(record) {
        return {
          disabled: record.name === 'default',
        };
      },

      onChange: this.handleChange,
      selectedRowKeys: this.state.selectedRowKeys,
    };
    const hasSelected = this.state.selectedRowKeys.length === 1;
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!notificationList.filter.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'pull-right': true,
    });
    const notificationLists = notificationList.list.error ?
      this.renderError(notificationList.list.error) :
      this.renderNotificationList(rowSelection, columns, notificationList.list.data);

    return (
      <div className="table-view">
        <div className="table-actions">
          <Button
            type="primary"
            size="large"
            onClick={this.handleCreateClick}
          >
            创建通知列表
          </Button>
          <Popconfirm
            title="确定要删除以下通知列表？"
            okText="删除"
            cancelText="取消"
            onConfirm={this.handleDelete}
          >
            <Button type="dashed" size="large" disabled={!hasSelected}>
              删除
            </Button>
          </Popconfirm>
          <Button type="ghost" size="large" onClick={this.handleReload}>
            <Icon type="reload" />
          </Button>
          <InputGroup className={searchCls}>
            <Input
              placeholder="输入关键字" size="large"
              value={notificationList.filter} onChange={this.handleInputChange}
            />
            <div className="ant-input-group-wrap">
              <Button className={btnCls} size="large">
                <Icon type="search" />
              </Button>
            </div>
          </InputGroup>
        </div>
        <div className="table">
          {notificationLists}
        </div>
      </div>
    );
  }
}

const getFilteredNotificationLists = createSelector(
  state => state.notificationList.list.data,
  state => state.notificationList.filter,
  (listData, filter) => listData.filter(notificationList => includes(notificationList.name, filter))
);

function mapStateToProps(state) {
  return {
    notificationList: {
      ...state.notificationList,
      list: { ...state.notificationList.list, data: getFilteredNotificationLists(state) },
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchNotificationLists: () => dispatch(fetchNotificationLists()),
    filterNotificationLists: (filter) => dispatch(filterNotificationLists(filter)),
    deleteNotificationList: (id) => dispatch(deleteNotificationList(id)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
