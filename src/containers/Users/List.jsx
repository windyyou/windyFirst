import React from 'react';
import Button from 'antd/lib/button';
import Table from 'antd/lib/table';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { fetchUsers, filterUsers, disableUser,
  enableUser, resetUserPassword } from '../../actions/user';
import classNames from 'classnames';
import includes from '../../../node_modules/lodash/includes';
import uniq from '../../../node_modules/lodash/uniq';

const InputGroup = Input.Group;

function renderLink(text, user) {
  return <Link to={`/app/users/${user.id}`}>{text}</Link>;
}

function renderEnabled(text, user) {
  const enable = user.enabled === true ? '启用' : '禁用';
  return enable;
}

function getColumns(data) {
  const statusFilter = uniq(data.map(record => record.enabled))
    .map(st => ({
      text: st === true ? '启用' : '禁用',
      value: st === true ? '启用' : '禁用',
    }));

  return [
    { title: '用户名', dataIndex: 'account', render: renderLink },
    { title: '真实姓名', dataIndex: 'name' },
    { title: '邮箱', dataIndex: 'email' },
    { title: '手机', dataIndex: 'phone' },
    { title: '公司名', dataIndex: 'company' },
    { title: '状态', dataIndex: 'enabled', render: renderEnabled, filters: statusFilter,
      onFilter(value, record) {
        const enableRecord = record.enabled === true ? '启用' : '禁用';
        return enableRecord === value;
      },
    },
    { title: '创建时间', dataIndex: 'createdAt' },
  ];
}

function loadData(props) {
  props.fetchUsers();
}

class List extends React.Component {
  static propTypes = {
    user: React.PropTypes.shape({
      filter: React.PropTypes.string,
      list: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        data: React.PropTypes.arrayOf(React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          account: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
          email: React.PropTypes.string.isRequired,
          phone: React.PropTypes.string.isRequired,
          company: React.PropTypes.string.isRequired,
          createdAt: React.PropTypes.string.isRequired,
          enabled: React.PropTypes.bool.isRequired,
        })).isRequired,
      }).isRequired,
    }).isRequired,
    fetchUsers: React.PropTypes.func.isRequired,
    filterUsers: React.PropTypes.func.isRequired,
    enableUser: React.PropTypes.func.isRequired,
    disableUser: React.PropTypes.func.isRequired,
    resetUserPassword: React.PropTypes.func.isRequired,
  };

  static contextTypes = {
    router: React.PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedRows: [],
    };
  }

  componentDidMount() {
    loadData(this.props);
  }

  getRowKey(record) {
    return record.id;
  }

  handleChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRows });
  };

  handleReload = (e) => {
    e.preventDefault();
    loadData(this.props);
  };

  enableUser = (e) => {
    e.preventDefault();

    const userId = this.state.selectedRows[0].id;
    const params = {
      id: userId,
      status: true,
    };
    this.props.enableUser(params);
  };

  disableUser = (e) => {
    e.preventDefault();

    const userId = this.state.selectedRows[0].id;
    const params = {
      id: userId,
      status: false,
    };
    this.props.disableUser(params);
  };

  resetPassword = (e) => {
    e.preventDefault();

    const userId = this.state.selectedRows[0].id;
    const param = {
      id: userId,
    };
    this.props.resetUserPassword(param);
  };

  handleInputChange = (e) => {
    this.props.filterUsers(e.target.value);
  };

  renderUser(rowSelection, columns, user) {
    return (<Table
      rowKey={this.getRowKey}
      rowSelection={rowSelection}
      columns={columns}
      dataSource={user.list.data}
      loading={user.list.isFetching}
    />);
  }

  renderError(error) {
    return (
      <span>{error.message}</span>
    );
  }

  render() {
    const { user } = this.props;
    const { selectedRows } = this.state;
    const columns = getColumns(user.list.data);
    const rowSelection = {
      onChange: this.handleChange,
    };
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!user.filter.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'pull-right': true,
    });
    const users = user.list.error ?
      this.renderError(user.list.error) :
      this.renderUser(rowSelection, columns, user);
    const hasSelected = this.state.selectedRows.length === 1;

    const userEnabled = !!(hasSelected && selectedRows[0].status === true);

    return (
      <div className="table-view">
        <div className="table-actions">
          <Button
            type="ghost"
            size="large"
            disabled={userEnabled}
            onClick={this.enableUser}
          >启用
          </Button>
          <Button
            type="ghost"
            size="large"
            disabled={!userEnabled}
            onClick={this.disableUser}
          >禁用</Button>
          <Button
            type="ghost"
            size="large"
            disabled={!hasSelected}
            onClick={this.resetPassword}
          >重置密码</Button>
          <Button type="ghost" size="large" onClick={this.handleReload}>
            <Icon type="reload" />
          </Button>
          <InputGroup className={searchCls}>
            <Input
              placeholder="输入关键字" size="large"
              value={user.filter} onChange={this.handleInputChange}
            />
            <div className="ant-input-group-wrap">
              <Button className={btnCls} size="large">
                <Icon type="search" />
              </Button>
            </div>
          </InputGroup>
        </div>
        <div className="table">
          {users}
        </div>
      </div>
    );
  }
}

const getFilteredUsers = createSelector(
  state => state.user.list.data,
  state => state.user.filter,
  (listData, filter) => listData.filter(user => includes(user.account, filter))
);

function mapStateToProps(state) {
  return {
    user: {
      ...state.user,
      list: { ...state.user.list, data: getFilteredUsers(state) },
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    filterUsers: (filter) => dispatch(filterUsers(filter)),
    disableUser: (params) => dispatch(disableUser(params)),
    enableUser: (params) => dispatch(enableUser(params)),
    resetUserPassword: (param) => dispatch(resetUserPassword(param)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
