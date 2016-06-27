import React from 'react';
import Button from 'antd/lib/button';
import Table from 'antd/lib/table';
import Icon from 'antd/lib/icon';
import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';
import Input from 'antd/lib/input';
import Popconfirm from 'antd/lib/popconfirm';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import classNames from 'classnames';
import includes from '../../../node_modules/lodash/includes';
import uniq from '../../../node_modules/lodash/uniq';
import AbstractList from '../AbstractList';
import { fetchRouters, filterRouters, deleteRouter } from '../../actions/router';

const InputGroup = Input.Group;
const MenuItem = Menu.Item;

function renderLink(text, row) {
  return <Link to={`/app/routers/${row.id}`}>{text}</Link>;
}

function renderPublicGateway(text) {
  return text ? '启用' : '关闭';
}

function getColumns(data) {
  const statusFilter = uniq(data.map(record => record.status))
    .map(st => ({ text: st, value: st }));

  return [
    { title: '名称', dataIndex: 'name', render: renderLink },
    { title: '状态', dataIndex: 'status', filters: statusFilter,
      onFilter(value, record) {
        return record.status === value;
      },
    },
    { title: '公网IP', dataIndex: 'floatingIp' },
    { title: '公网网关', dataIndex: 'gateway', render: renderPublicGateway },
    { title: '创建时间', dataIndex: 'createdAt' },
  ];
}

class List extends AbstractList {
  static propTypes = {
    router: React.PropTypes.shape({
      filter: React.PropTypes.string,
      list: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        data: React.PropTypes.arrayOf(React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
          status: React.PropTypes.string.isRequired,
          floatingIp: React.PropTypes.string.isRequired,
          gateway: React.PropTypes.string.isRequired,
          createdAt: React.PropTypes.string.isRequired,
        })),
      }),
    }),
    fetchRouters: React.PropTypes.func.isRequired,
    filterRouters: React.PropTypes.func.isRequired,
    deleteRouter: React.PropTypes.func.isRequired,
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
    props.fetchRouters();
  }

  getMenu(hasOneSelected) {
    return (
      <Menu>
        <MenuItem key="1">
          <a href="#">开启公网网关</a>
        </MenuItem>
        <MenuItem key="2">
          <a href="#">关闭公网网关</a>
        </MenuItem>
        <MenuItem key="3">
          <a href="#">绑定公网IP</a>
        </MenuItem>
        <MenuItem key="4">
          <a href="#">解除公网IP</a>
        </MenuItem>
        <MenuItem key="5">
          <a href="#">关联子网</a>
        </MenuItem>
        <MenuItem key="6">
          <a href="#">断开子网</a>
        </MenuItem>
        <MenuItem key="7" disabled={!hasOneSelected}>
          <Popconfirm title="确定要删除这个路由吗？" onConfirm={this.handleDelete}>
            <a href="">删除</a>
          </Popconfirm>
        </MenuItem>
      </Menu>
    );
  }

  getRowKey(router) {
    return router.id;
  }

  handleDelete = () => {
    this.props.deleteRouter(this.state.selectedRowKeys[0]);
    this.setState({ ...this.state, selectedRowKeys: [] });
    this.context.router.push('/app/routers');
  };

  handleChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  handleCreateClick = event => {
    event.preventDefault();
    this.context.router.push('/app/routers/new/step-1');
  };

  handleReload = e => {
    e.preventDefault();
    this.loadData(this.props);
  };

  handleInputChange = e => {
    this.props.filterRouters(e.target.value);
  };

  renderRouter(rowSelection, columns, showData) {
    return (<Table
      rowKey={this.getRowKey}
      rowSelection={rowSelection}
      columns={columns}
      dataSource={showData}
      loading={this.props.router.list.isFetching}
    />);
  }

  renderError(error) {
    return (
      <span>{error.message}</span>
    );
  }

  render() {
    const { router } = this.props;
    const columns = getColumns(router.list.data);
    const rowSelection = {
      onChange: this.handleChange,
    };
    const hasOneSelected = this.state.selectedRowKeys.length === 1;
    const menu = this.getMenu(hasOneSelected);
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!router.filter.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'pull-right': true,
    });
    const routers = router.list.error ?
      this.renderError(router.list.error) :
      this.renderRouter(rowSelection, columns, router.list.data);

    return (
      <div className="table-view">
        <div className="table-actions">
          <Button type="primary" size="large" onClick={this.handleCreateClick}>
            创建路由
          </Button>
          <Dropdown overlay={menu} trigger={['click']}>
            <Button type="ghost" size="large" disabled={!hasOneSelected}>
              更多<Icon type="down" />
            </Button>
          </Dropdown>
          <Button type="ghost" size="large" onClick={this.handleReload}>
            <Icon type="reload" />
          </Button>
          <InputGroup className={searchCls}>
            <Input
              placeholder="输入关键字" size="large"
              value={router.filter} onChange={this.handleInputChange}
            />
            <div className="ant-input-group-wrap">
              <Button className={btnCls} size="large">
                <Icon type="search" />
              </Button>
            </div>
          </InputGroup>
        </div>
        <div className="table">
          {routers}
        </div>
      </div>
    );
  }
}

const getFilteredRouters = createSelector(
  state => state.router.list.data,
  state => state.router.filter,
  (listData, filter) => listData.filter(router => includes(router.name, filter))
);

function mapStateToProps(state) {
  return {
    router: {
      ...state.router,
      list: { ...state.router.list, data: getFilteredRouters(state) },
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchRouters: () => dispatch(fetchRouters()),
    filterRouters: filter => dispatch(filterRouters(filter)),
    deleteRouter: id => dispatch(deleteRouter(id)),
    refresh: () => dispatch(fetchRouters(undefined, true)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
