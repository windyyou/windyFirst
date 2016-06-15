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
import uniq from '../../../node_modules/lodash/uniq';

import { fetchPorts, filterPorts, deletePort } from '../../actions/port';
import { fetchSubnetsCount } from '../../actions/subnet';

const InputGroup = Input.Group;

function renderLink(text, row) {
  return <Link to={`/app/ports/${row.id}`}>{text}</Link>;
}

function renderSubnet(text, row) {
  let link = '';
  if (row.subnet) {
    const { id, name } = row.subnet;
    link = <Link to={`/app/subnets/${id}`}>{name}</Link>;
  }

  return link;
}

function renderInstance(text, row) {
  let link = '';
  if (row.instance) {
    const { id, name } = row.instance;
    link = <Link to={`/app/instances/${id}`}>{name}</Link>;
  }

  return link;
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
    { title: 'IP地址', dataIndex: 'ip' },
    { title: '子网', dataIndex: 'subnet', render: renderSubnet },
    { title: '云主机', dataIndex: 'instance', render: renderInstance },
    { title: '创建时间', dataIndex: 'createdAt' },
  ];
}

function loadData(props) {
  props.fetchPorts();
  props.fetchSubnetsCount();
}

class List extends React.Component {
  static propTypes = {
    port: React.PropTypes.shape({
      filter: React.PropTypes.string,
      list: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        data: React.PropTypes.arrayOf(React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
          status: React.PropTypes.string.isRequired,
          ip: React.PropTypes.string.isRequired,
          subnet: React.PropTypes.object.isRequired,
          instance: React.PropTypes.object,
          createdAt: React.PropTypes.string.isRequired,
        })),
      }),
    }),
    subnet: React.PropTypes.object.isRequired,
    fetchPorts: React.PropTypes.func.isRequired,
    filterPorts: React.PropTypes.func.isRequired,
    fetchSubnetsCount: React.PropTypes.func.isRequired,
    deletePort: React.PropTypes.func.isRequired,
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

  handleDelete = () => {
    this.props.deletePort(this.state.selectedRows[0].id);
    this.setState({ ...this.state, selectedRows: [] });
    this.context.router.push('/app/ports/');
  };

  handleChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRows });
  };

  handleCreateClick = (event) => {
    event.preventDefault();
    this.context.router.push('/app/ports/new/step-1');
  };

  handleReload = (e) => {
    e.preventDefault();
    loadData(this.props);
  };

  handleInputChange = (e) => {
    this.props.filterPorts(e.target.value);
  };

  renderFloatingIp(rowSelection, columns, showData) {
    return (<Table
      rowKey={this.getRowKey}
      rowSelection={rowSelection}
      columns={columns}
      dataSource={showData}
      loading={this.props.port.list.isFetching}
    />);
  }

  renderError(error) {
    return (
      <span>{error.message}</span>
    );
  }

  render() {
    const { port, subnet } = this.props;
    const { selectedRows } = this.state;
    const columns = getColumns(port.list.data);
    const rowSelection = {
      onChange: this.handleChange,
    };

    const hasSubnet = subnet.count.data.count > 0;
    const hasSelected = selectedRows.length === 1;
    const hasInstance = !!(hasSelected && selectedRows[0].instance);

    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!port.filter.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'pull-right': true,
    });
    const ports = port.list.error ?
      this.renderError(port.list.error) :
      this.renderFloatingIp(rowSelection, columns, port.list.data);

    return (
      <div className="table-view">
        <div className="table-actions">
          <Button
            type="primary"
            size="large"
            disabled={!hasSubnet}
            onClick={this.handleCreateClick}
          >创建虚拟网卡</Button>
          <Button type="ghost" size="large" disabled={!hasSelected || hasInstance}>绑定到云主机</Button>
          <Button type="ghost" size="large" disabled={!hasInstance}>解除绑定</Button>
          <Popconfirm title="确定要删除这个虚拟网卡吗？" onConfirm={this.handleDelete}>
            <Button type="dashed" size="large" disabled={!hasSelected}>删除</Button>
          </Popconfirm>
          <Button type="ghost" size="large" onClick={this.handleReload}>
            <Icon type="reload" />
          </Button>
          <InputGroup className={searchCls}>
            <Input
              placeholder="输入关键字" size="large"
              value={port.filter} onChange={this.handleInputChange}
            />
            <div className="ant-input-group-wrap">
              <Button className={btnCls} size="large">
                <Icon type="search" />
              </Button>
            </div>
          </InputGroup>
        </div>
        <div className="table">
          {ports}
        </div>
      </div>
    );
  }
}

const getFilteredPorts = createSelector(
  state => state.port.list.data,
  state => state.port.filter,
  (listData, filter) => listData.filter(port => includes(port.name, filter))
);

function mapStateToProps(state) {
  return {
    port: {
      ...state.port,
      list: { ...state.port.list, data: getFilteredPorts(state) },
    },
    subnet: { ...state.subnet },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPorts: () => dispatch(fetchPorts()),
    filterPorts: (filter) => dispatch(filterPorts(filter)),
    fetchSubnetsCount: () => dispatch(fetchSubnetsCount()),
    deletePort: (id) => dispatch(deletePort(id)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
