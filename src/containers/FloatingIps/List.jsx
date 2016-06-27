import React from 'react';
import Button from 'antd/lib/button';
import Table from 'antd/lib/table';
import Icon from 'antd/lib/icon';
import Dropdown from 'antd/lib/dropdown';
import Input from 'antd/lib/input';
import Menu from 'antd/lib/menu';
import Popconfirm from 'antd/lib/popconfirm';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import classNames from 'classnames';
import includes from '../../../node_modules/lodash/includes';
import uniq from '../../../node_modules/lodash/uniq';

import { fetchFloatingIps, filterFloatingIps, deleteFloatingIp } from '../../actions/floatingIp';

import AbstractList from '../AbstractList';

const InputGroup = Input.Group;
const MenuItem = Menu.Item;

function renderLink(text, row) {
  return <Link to={`/app/floating-ips/${row.id}`}>{text}</Link>;
}

function renderBandwidth(text) {
  const MB = ' Mbps';
  return text + MB;
}

function renderRsource(text, row) {
  let link = '';
  if (row.resource) {
    const { type, id, name } = row.resource;
    link = <Link to={`/${type}/${id}`}>{name}</Link>;
  }

  return link;
}

function getColumns(data) {
  const statusFilter = uniq(data.map(record => record.status))
    .map(st => ({ text: st, value: st }));
  const typeFilter = uniq(data.map(record => record.type))
    .map(st => ({ text: st, value: st }));
  return [
    { title: '名称', dataIndex: 'name', render: renderLink },
    { title: '状态', dataIndex: 'status', filters: statusFilter,
      onFilter(value, record) {
        return record.status === value;
      },
    },
    { title: 'IP地址', dataIndex: 'floatingIpAddress' },
    { title: '资源', dataIndex: 'resource', render: renderRsource },
    { title: '带宽', dataIndex: 'bandwidth', render: renderBandwidth },
    { title: 'IP线路', dataIndex: 'type', filters: typeFilter,
      onFilter(value, record) {
        return record.type === value;
      },
    },
    { title: '创建时间', dataIndex: 'createdAt' },
  ];
}

class List extends AbstractList {
  static propTypes = {
    floatingIp: React.PropTypes.shape({
      filter: React.PropTypes.string,
      list: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        data: React.PropTypes.arrayOf(React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
          status: React.PropTypes.string.isRequired,
          floatingIpAddress: React.PropTypes.string.isRequired,
          bandwidth: React.PropTypes.number.isRequired,
          type: React.PropTypes.string.isRequired,
          createdAt: React.PropTypes.string.isRequired,
          resource: React.PropTypes.object,
        })).isRequired,
      }).isRequired,
    }).isRequired,
    fetchFloatingIps: React.PropTypes.func.isRequired,
    filterFloatingIps: React.PropTypes.func.isRequired,
    deleteFloatingIp: React.PropTypes.func.isRequired,
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

  loadData(props) {
    props.fetchFloatingIps();
  }

  getRowKey(record) {
    return record.id;
  }

  getMenu(hasSelected, hasLinked) {
    return (
      <Menu>
        <MenuItem key="1" disabled={!hasSelected || hasLinked}>
          <a href="#">绑定到负载均衡</a>
        </MenuItem>
        <MenuItem key="2" disabled={!hasLinked}>
          <a href="#">解除绑定</a>
        </MenuItem>
        <MenuItem key="3" disabled={!hasSelected}>
          <Popconfirm title="确定要删除这个ip吗？" onConfirm={this.handleDelete}>
            <a href="">删除</a>
          </Popconfirm>
        </MenuItem>
      </Menu>
    );
  }

  handleDelete = () => {
    this.props.deleteFloatingIp(this.state.selectedRows[0].id);
    this.setState({ ...this.state, selectedRows: [] });
    this.context.router.push('/app/floating-ips');
  };

  handleChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRows });
  };

  handleCreateClick = event => {
    event.preventDefault();
    this.context.router.push('/app/floating-ips/new/step-1');
  };

  handleReload = e => {
    e.preventDefault();
    this.loadData(this.props);
  };

  handleInputChange = e => {
    this.props.filterFloatingIps(e.target.value);
  };

  renderFloatingIp(rowSelection, columns, floatingIp) {
    return (<Table
      rowKey={this.getRowKey}
      rowSelection={rowSelection}
      columns={columns}
      dataSource={floatingIp.data}
      loading={floatingIp.isFetching}
    />);
  }

  renderError(error) {
    return (
      <span>{error.message}</span>
    );
  }

  render() {
    const { floatingIp } = this.props;
    const { selectedRows } = this.state;
    const columns = getColumns(floatingIp.list.data);
    const rowSelection = {
      onChange: this.handleChange,
    };
    const hasSelected = selectedRows.length === 1;
    const hasLinked = !!(hasSelected && selectedRows[0].resource);

    const menu = this.getMenu(hasSelected, hasLinked);
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!floatingIp.filter.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'pull-right': true,
    });
    const floatingIps = floatingIp.error ?
      this.renderError(floatingIp.error) :
      this.renderFloatingIp(rowSelection, columns, floatingIp.list);

    return (
      <div className="table-view">
        <div className="table-actions">
          <Button type="primary" size="large" onClick={this.handleCreateClick}>创建公网IP</Button>
          <Button type="ghost" size="large" disabled={!hasSelected || hasLinked}>绑定到主机</Button>
          <Button type="ghost" size="large" disabled={!hasSelected || hasLinked}>绑定到路由</Button>
          <Dropdown overlay={menu} trigger={['click']}>
            <Button type="ghost" size="large">更多<Icon type="down" /></Button>
          </Dropdown>
          <Button type="ghost" size="large" onClick={this.handleReload}>
            <Icon type="reload" />
          </Button>
          <InputGroup className={searchCls}>
            <Input
              placeholder="输入关键字" size="large"
              value={floatingIp.filter} onChange={this.handleInputChange}
            />
            <div className="ant-input-group-wrap">
              <Button className={btnCls} size="large">
                <Icon type="search" />
              </Button>
            </div>
          </InputGroup>
        </div>
        <div className="table">
          {floatingIps}
        </div>
      </div>
    );
  }
}

const getFilteredFloatingIps = createSelector(
  state => state.floatingIp.list.data,
  state => state.floatingIp.filter,
  (entities, filter) => entities.filter(entity => includes(entity.name, filter))
);

function mapStateToProps(state) {
  return {
    floatingIp: {
      ...state.floatingIp,
      list: { ...state.floatingIp.list, data: getFilteredFloatingIps(state) },
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchFloatingIps: () => dispatch(fetchFloatingIps()),
    filterFloatingIps: filter => dispatch(filterFloatingIps(filter)),
    deleteFloatingIp: id => dispatch(deleteFloatingIp(id)),
    refresh: () => dispatch(fetchFloatingIps(undefined, true)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
