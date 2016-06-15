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
import { fetchNetworksCount } from '../../actions/network';
import { fetchSubnets, filterSubnets, deleteSubnet } from '../../actions/subnet';

const InputGroup = Input.Group;

function renderLink(text, subnet) {
  return <Link to={`/app/subnets/${subnet.id}`}>{text}</Link>;
}

function renderNetWork(net) {
  let link = '';
  if (net) {
    const { id, name } = net;
    link = (<Link to={`/app/networks/${id}`}>{name}</Link>);
  }

  return link;
}

function renderIpVersion(ipVersion) {
  return {
    4: 'IP v4',
    6: 'IP v6',
  }[ipVersion];
}

function getColumns(data) {
  const ipVersionFilter = uniq(data.map(record => record.ipVersion))
    .map(ver => ({ text: renderIpVersion(ver), value: ver }));

  return [
    { title: '名称', dataIndex: 'name', render: renderLink },
    { title: '私有网络', dataIndex: 'network', render: renderNetWork },
    { title: 'CIDR网段', dataIndex: 'cidr' },
    { title: 'IP版本', dataIndex: 'ipVersion', render: renderIpVersion, filters: ipVersionFilter,
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
      filter: React.PropTypes.string,
      list: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        data: React.PropTypes.arrayOf(React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
          cidr: React.PropTypes.string,
          ipVersion: React.PropTypes.string.isRequired,
          gateway: React.PropTypes.string.isRequired,
          createdAt: React.PropTypes.string.isRequired,
          network: React.PropTypes.shape({
            id: React.PropTypes.string.isRequired,
            name: React.PropTypes.string.isRequired,
          }),
        })).isRequired,
      }),
    }),
    fetchSubnets: React.PropTypes.func.isRequired,
    filterSubnets: React.PropTypes.func.isRequired,
    fetchNetworksCount: React.PropTypes.func.isRequired,
    network: React.PropTypes.object.isRequired,
    deleteSubnet: React.PropTypes.func.isRequired,
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

  handleDelete = () => {
    this.props.deleteSubnet(this.state.selectedRowKeys[0]);
    this.setState({ ...this.state, selectedRowKeys: [] });
    this.context.router.push('/app/subnets/');
  };

  handleChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  handleCreateClick = (event) => {
    event.preventDefault();
    this.context.router.push('/app/subnets/new/step-1');
  };

  handleReload = (e) => {
    e.preventDefault();
    loadData(this.props);
  };

  handleCreateChildClick = (event) => {
    event.preventDefault();
    this.context.router.push('/app/subnets/child/step-1');
  };

  handleInputChange = (e) => {
    this.props.filterSubnets(e.target.value);
  };

  renderSubnet(rowSelection, columns, subnet) {
    return (<Table
      rowKey={this.getRowKey}
      rowSelection={rowSelection}
      columns={columns}
      dataSource={subnet.list.data}
      loading={subnet.list.isFetching}
    />);
  }

  renderError(error) {
    return (
      <span>{error.message}</span>
    );
  }

  render() {
    const { subnet, network } = this.props;
    const columns = getColumns(subnet.list.data);
    const rowSelection = {
      onChange: this.handleChange,
    };
    const hasSelected = this.state.selectedRowKeys.length === 1;
    const hasNetworks = network.count.data.count > 0;
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!subnet.filter.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'pull-right': true,
    });
    const subnets = subnet.list.error ?
      this.renderError(subnet.list.error) :
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
          <Popconfirm title="确定要删除这个子网吗？" onConfirm={this.handleDelete}>
            <Button type="dashed" size="large" disabled={!hasSelected}>删除</Button>
          </Popconfirm>
          <Button type="ghost" size="large" onClick={this.handleReload}>
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
          {subnets}
        </div>
      </div>
    );
  }
}

const getFilteredSubnets = createSelector(
  state => state.subnet.list.data,
  state => state.subnet.filter,
  (listData, filter) => listData.filter(subnet => includes(subnet.name, filter))
);

function mapStateToProps(state) {
  return {
    subnet: {
      ...state.subnet,
      list: { ...state.subnet.list, data: getFilteredSubnets(state) },
    },
    network: { ...state.network },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchSubnets: () => dispatch(fetchSubnets()),
    filterSubnets: (filter) => dispatch(filterSubnets(filter)),
    fetchNetworksCount: () => dispatch(fetchNetworksCount()),
    deleteSubnet: (id) => dispatch(deleteSubnet(id)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
