import React from 'react';
import Button from 'antd/lib/button';
import Table from 'antd/lib/table';
import Icon from 'antd/lib/icon';
import Dropdown from 'antd/lib/dropdown';
import Input from 'antd/lib/input';
import Menu from 'antd/lib/menu';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import classNames from 'classnames';
import includes from '../../../node_modules/lodash/includes';
import uniq from '../../../node_modules/lodash/uniq';

import { fetchFloatingIps, filterFloatingIps } from '../../actions/floatingIp';

const InputGroup = Input.Group;
const MenuItem = Menu.Item;

function renderLink(text, row) {
  return <Link to={`/floating-ips/${row.id}`}>{text}</Link>;
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
  const lineFilter = uniq(data.map(record => record.line))
    .map(st => ({ text: st, value: st }));
  return [
    { title: '名称', dataIndex: 'name', render: renderLink },
    { title: '状态', dataIndex: 'status', filters: statusFilter,
      onFilter(value, record) {
        return record.status === value;
      },
    },
    { title: 'IP地址', dataIndex: 'ip' },
    { title: '资源', dataIndex: 'resource', render: renderRsource },
    { title: '带宽', dataIndex: 'bandwidth', render: renderBandwidth },
    { title: 'IP线路', dataIndex: 'line', filters: lineFilter,
      onFilter(value, record) {
        return record.line === value;
      },
    },
    { title: '创建时间', dataIndex: 'createdAt' },
  ];
}

function loadData(props) {
  props.fetchFloatingIps();
}

class List extends React.Component {
  static propTypes = {
    floatingIp: React.PropTypes.shape({
      isFetching: React.PropTypes.bool.isRequired,
      error: React.PropTypes.object,
      filter: React.PropTypes.string,
      entities: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        status: React.PropTypes.string.isRequired,
        ip: React.PropTypes.string.isRequired,
        bandwidth: React.PropTypes.number.isRequired,
        line: React.PropTypes.string.isRequired,
        createdAt: React.PropTypes.string.isRequired,
        resource: React.PropTypes.object,
      })),
    }),
    fetchFloatingIps: React.PropTypes.func.isRequired,
    filterFloatingIps: React.PropTypes.func.isRequired,
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
          <a href="#">删除</a>
        </MenuItem>
      </Menu>
    );
  }

  handleChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRows });
  };

  handleCreateClick = (event) => {
    event.preventDefault();
    this.context.router.push('/floating-ips/new/step-1');
  };

  handleInputChange = (e) => {
    this.props.filterFloatingIps(e.target.value);
  };

  renderFloatingIp(rowSelection, columns, showData) {
    return (<Table
      rowKey={this.getRowKey}
      rowSelection={rowSelection}
      columns={columns}
      dataSource={showData}
      loading={this.props.floatingIp.isFetching}
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
    const columns = getColumns(floatingIp.entities);
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
      this.renderFloatingIp(rowSelection, columns, floatingIp.entities);

    return (
      <div className="table-view">
        <div className="table-actions">
          <Button type="primary" size="large" onClick={this.handleCreateClick}>创建公网IP</Button>
          <Button type="ghost" size="large" disabled={!hasSelected || hasLinked}>绑定到主机</Button>
          <Button type="ghost" size="large" disabled={!hasSelected || hasLinked}>绑定到路由</Button>
          <Dropdown overlay={menu} trigger={['click']}>
            <Button type="ghost" size="large">更多<Icon type="down" /></Button>
          </Dropdown>
          <Button type="ghost" size="large">
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
  state => state.floatingIp.entities,
  state => state.floatingIp.filter,
  (entities, filter) => entities.filter(entity => includes(entity.name, filter))
);

function mapStateToProps(state) {
  return {
    floatingIp: {
      ...state.floatingIp,
      entities: getFilteredFloatingIps(state),
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchFloatingIps: () => dispatch(fetchFloatingIps()),
    filterFloatingIps: (filter) => dispatch(filterFloatingIps(filter)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
