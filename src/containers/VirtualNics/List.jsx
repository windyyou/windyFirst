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
import uniq from '../../../node_modules/lodash/uniq';

import { fetchVirtualNics, filterVirtualNics } from '../../actions/virtualNic';
import { fetchSubnetsCount } from '../../actions/subnet';

const InputGroup = Input.Group;

function renderLink(text, row) {
  return <Link to={`/virtual-nics/${row.id}`}>{text}</Link>;
}

function renderSubnet(text, row) {
  let link = '';
  if (row.subnet) {
    const { id, name } = row.subnet;
    link = <Link to={`/subnets/${id}`}>{name}</Link>;
  }

  return link;
}

function renderInstance(text, row) {
  let link = '';
  if (row.instance) {
    const { id, name } = row.instance;
    link = <Link to={`/instances/${id}`}>{name}</Link>;
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
  props.fetchVirtualNics();
  props.fetchSubnetsCount();
}

class List extends React.Component {
  static propTypes = {
    virtualNic: React.PropTypes.shape({
      isFetching: React.PropTypes.bool.isRequired,
      error: React.PropTypes.object,
      filter: React.PropTypes.string,
      entities: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        status: React.PropTypes.string.isRequired,
        ip: React.PropTypes.string.isRequired,
        subnet: React.PropTypes.object,
        instance: React.PropTypes.object,
        createdAt: React.PropTypes.string.isRequired,
      })),
    }),
    subnet: React.PropTypes.object.isRequired,
    fetchVirtualNics: React.PropTypes.func.isRequired,
    filterVirtualNics: React.PropTypes.func.isRequired,
    fetchSubnetsCount: React.PropTypes.func.isRequired,
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

  handleCreateClick = (event) => {
    event.preventDefault();
    this.context.router.push('/virtual-nics/new/step-1');
  };

  handleInputChange = (e) => {
    this.props.filterVirtualNics(e.target.value);
  };

  renderFloatingIp(rowSelection, columns, showData) {
    return (<Table
      rowKey={this.getRowKey}
      rowSelection={rowSelection}
      columns={columns}
      dataSource={showData}
      loading={this.props.virtualNic.isFetching}
    />);
  }

  renderError(error) {
    return (
      <span>{error.message}</span>
    );
  }

  render() {
    const { virtualNic, subnet } = this.props;
    const { selectedRows } = this.state;
    const columns = getColumns(virtualNic.entities);
    const rowSelection = {
      onChange: this.handleChange,
    };

    const hasSubnet = subnet.count.count > 0;
    const hasSelected = selectedRows.length === 1;
    const hasInstance = !!(hasSelected && selectedRows[0].instance);

    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!virtualNic.filter.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'pull-right': true,
    });
    const virtualNics = virtualNic.error ?
      this.renderError(virtualNic.error) :
      this.renderFloatingIp(rowSelection, columns, virtualNic.entities);

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
          <Button type="dashed" size="large" disabled={!hasSelected}>删除</Button>
          <Button type="ghost" size="large">
            <Icon type="reload" />
          </Button>
          <InputGroup className={searchCls}>
            <Input
              placeholder="输入关键字" size="large"
              value={virtualNic.filter} onChange={this.handleInputChange}
            />
            <div className="ant-input-group-wrap">
              <Button className={btnCls} size="large">
                <Icon type="search" />
              </Button>
            </div>
          </InputGroup>
        </div>
        <div className="table">
          {virtualNics}
        </div>
      </div>
    );
  }
}

const getFilteredFloatingIps = createSelector(
  state => state.virtualNic.entities,
  state => state.virtualNic.filter,
  (entities, filter) => entities.filter(entity => includes(entity.name, filter))
);

function mapStateToProps(state) {
  return {
    virtualNic: {
      ...state.virtualNic,
      entities: getFilteredFloatingIps(state),
    },
    subnet: { ...state.subnet },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchVirtualNics: () => dispatch(fetchVirtualNics()),
    filterVirtualNics: (filter) => dispatch(filterVirtualNics(filter)),
    fetchSubnetsCount: () => dispatch(fetchSubnetsCount()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
