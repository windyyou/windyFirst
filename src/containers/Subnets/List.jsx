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
import { fetchNetworksCount } from '../../actions/network';
import { fetchSubnets, filterSubnets } from '../../actions/subnet';

const InputGroup = Input.Group;

function renderLink(text, subnet) {
  return <Link to={`/subnets/${subnet.id}`}>{text}</Link>;
}

function renderNetWork(net) {
  let link = '';
  if (net) {
    const { id, name } = net;
    link = (<Link to={`/networks/${id}`}>{name}</Link>);
  }

  return link;
}

function getColumns(data) {
  const statusFilter = uniq(data.map(record => record.ipVersion))
    .map(st => ({ text: st, value: st }));

  return [
    { title: '名称', dataIndex: 'name', render: renderLink },
    { title: '私有网络', dataIndex: 'network', render: renderNetWork },
    { title: 'CIDR网段', dataIndex: 'segment' },
    { title: 'IP版本', dataIndex: 'ipVersion', filters: statusFilter,
      onFilter(value, record) {
        return record.ipVersion === value;
      },
    },
    { title: '网关', dataIndex: 'gateway' },
    { title: '创建时间', dataIndex: 'createdAt' },
  ];
}

function loadData(props) {
  props.fetchSubnets();
  props.fetchNetworksCount();
}

class List extends React.Component {
  static propTypes = {
    subnet: React.PropTypes.shape({
      isFetching: React.PropTypes.bool.isRequired,
      error: React.PropTypes.object,
      filter: React.PropTypes.string,
      entities: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        segment: React.PropTypes.string.isRequired,
        ipVersion: React.PropTypes.string.isRequired,
        gateway: React.PropTypes.string.isRequired,
        createdAt: React.PropTypes.string.isRequired,
        network: React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
        }),
      })).isRequired,
    }),
    fetchSubnets: React.PropTypes.func.isRequired,
    filterSubnets: React.PropTypes.func.isRequired,
    fetchNetworksCount: React.PropTypes.func.isRequired,
    network: React.PropTypes.object.isRequired,
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

  getRowKey(record) {
    return record.id;
  }

  handleChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  handleCreateClick = (event) => {
    event.preventDefault();
    this.context.router.push('/subnets/new/step-1');
  };

  handleCreateChildClick = (event) => {
    event.preventDefault();
    this.context.router.push('/subnets/child/step-1');
  };

  handleInputChange = (e) => {
    this.props.filterSubnets(e.target.value);
  };

  renderSubnet(rowSelection, columns, subnet) {
    return (<Table
      rowKey={this.getRowKey}
      rowSelection={rowSelection}
      columns={columns}
      dataSource={subnet.entities}
      loading={subnet.isFetching}
    />);
  }

  renderError(error) {
    return (
      <span>{error.message}</span>
    );
  }

  render() {
    const { subnet, network } = this.props;
    const columns = getColumns(subnet.entities);
    const rowSelection = {
      onChange: this.handleChange,
    };
    const hasSelected = this.state.selectedRowKeys.length === 1;
    const hasNetworks = network.count.count > 0;
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!subnet.filter.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'pull-right': true,
    });
    const subnets = subnet.error ?
      this.renderError(subnet.error) :
      this.renderSubnet(rowSelection, columns, subnet);

    return (
      <div className="table-view">
        <div className="table-actions">
          <Button
            type="primary"
            size="large"
            onClick={this.handleCreateClick}
            disabled={!hasNetworks}
          >创建子网
          </Button>
          <Button
            type="ghost"
            size="large"
            disabled={!hasSelected}
            onClick={this.handleCreateChildClick}
          >关联路由</Button>
          <Button
            type="ghost"
            size="large"
            disabled={!hasSelected}
            onClick={this.handleCreateChildClick}
          >断开路由</Button>
          <Button type="dashed" size="large" disabled={!hasSelected}>删除</Button>
          <Button type="ghost" size="large">
            <Icon type="reload" />
          </Button>
          <InputGroup className={searchCls}>
            <Input
              placeholder="输入关键字" size="large"
              value={subnet.filter} onChange={this.handleInputChange}
            />
            <div className="ant-input-group-wrap">
              <Button className={btnCls} size="large">
                <Icon type="search" />
              </Button>
            </div>
          </InputGroup>
        </div>
        <div className="table">
          {subnet.isFetching ? this.renderSubnet(rowSelection, columns, subnet) : subnets}
        </div>
      </div>
    );
  }
}

const getFilteredSubnets = createSelector(
  state => state.subnet.entities,
  state => state.subnet.filter,
  (entities, filter) => entities.filter(subnet => includes(subnet.name, filter))
);

function mapStateToProps(state) {
  return {
    subnet: {
      ...state.subnet,
      entities: getFilteredSubnets(state),
    },
    network: { ...state.network },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchSubnets: () => dispatch(fetchSubnets()),
    filterSubnets: (filter) => dispatch(filterSubnets(filter)),
    fetchNetworksCount: () => dispatch(fetchNetworksCount()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
