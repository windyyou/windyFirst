import React from 'react';
import Button from 'antd/lib/button';
import Table from 'antd/lib/table';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import classNames from 'classnames';
import includes from '../../../node_modules/lodash/includes';

import { fetchNotificationLists, filterNotificationLists } from '../../actions/notificationList';

const InputGroup = Input.Group;

function renderLink(text, row) {
  return <Link to={`/notification-lists/${row.id}`}>{text}</Link>;
}

function getColumns() {
  return [
    { title: '名称', dataIndex: 'name', render: renderLink },
    { title: '描述', dataIndex: 'description' },
    { title: '已验证终端数', dataIndex: 'verifiedTerminals' },
    { title: '创建时间', dataIndex: 'ago' },
  ];
}

function loadData(props) {
  props.fetchNotificationLists();
}

class List extends React.Component {
  static propTypes = {
    notificationList: React.PropTypes.shape({
      isFetching: React.PropTypes.bool.isRequired,
      error: React.PropTypes.object,
      filter: React.PropTypes.string,
      entities: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        description: React.PropTypes.string.isRequired,
        verifiedTerminals: React.PropTypes.number.isRequired,
        ago: React.PropTypes.string.isRequired,
      })),
    }),
    fetchNotificationLists: React.PropTypes.func.isRequired,
    filterNotificationLists: React.PropTypes.func.isRequired,
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
    this.context.router.push('/notification-lists/new');
  };

  handleInputChange = (e) => {
    this.props.filterNotificationLists(e.target.value);
  };

  renderNotificationList(rowSelection, columns, showData) {
    return (<Table
      rowKey={this.getRowKey}
      rowSelection={rowSelection}
      columns={columns}
      dataSource={showData}
      loading={this.props.notificationList.isFetching}
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
    const notificationLists = notificationList.error ?
      this.renderError(notificationList.error) :
      this.renderNotificationList(rowSelection, columns, notificationList.entities);

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
          <Button type="dashed" size="large" disabled={!hasSelected}>删除</Button>
          <Button type="ghost" size="large">
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
  state => state.notificationList.entities,
  state => state.notificationList.filter,
  (entities, filter) => entities.filter(notificationList => includes(notificationList.name, filter))
);

function mapStateToProps(state) {
  return {
    notificationList: {
      ...state.notificationList,
      entities: getFilteredNotificationLists(state),
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchNotificationLists: () => dispatch(fetchNotificationLists()),
    filterNotificationLists: (filter) => dispatch(filterNotificationLists(filter)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
