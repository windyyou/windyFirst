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

import { fetchNetworks, filterNetworks, deleteNetwork } from '../../actions/network';

const InputGroup = Input.Group;

function renderLink(text, row) {
  return <Link to={`/app/networks/${row.id}`}>{text}</Link>;
}

function renderSubNets(subnets) {
  if (!Array.isArray(subnets)) return [];
  return subnets.reduce((prev, curr, index) => {
    prev.push(<Link key={curr.id} to={`/app/subnets/${curr.id}`}>{curr.name}</Link>);

    if (index !== subnets.length - 1) {
      prev.push(', ');
    }

    return prev;
  }, []);
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
    { title: '子网', dataIndex: 'subnets', render: renderSubNets },
    { title: '创建时间', dataIndex: 'createdAt' },
  ];
}

function loadData(props) {
  props.fetchNetworks();
}

class List extends React.Component {
  static propTypes = {
    network: React.PropTypes.shape({
      filter: React.PropTypes.string,
      list: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        data: React.PropTypes.arrayOf(React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
          status: React.PropTypes.string.isRequired,
          createdAt: React.PropTypes.string.isRequired,
          subnets: React.PropTypes.array.isRequired,
        })).isRequired,
      }),
    }),
    fetchNetworks: React.PropTypes.func.isRequired,
    filterNetworks: React.PropTypes.func.isRequired,
    deleteNetwork: React.PropTypes.func.isRequired,
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
    this.props.deleteNetwork(this.state.selectedRowKeys[0]);
    this.setState({ ...this.state, selectedRowKeys: [] });
    this.context.router.push('/app/networks');
  };

  handleChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  handleCreateClick = (event) => {
    event.preventDefault();
    this.context.router.push('/app/networks/new');
  };

  handleCreateChildClick = (event) => {
    event.preventDefault();
    this.context.router.push(`/app/subnets/new?networkId=${this.state.selectedRowKeys[0]}`);
  };

  handleReload = (e) => {
    e.preventDefault();
    loadData(this.props);
  };

  handleInputChange = (e) => {
    this.props.filterNetworks(e.target.value);
  };

  renderNetwork(rowSelection, columns, network) {
    return (<Table
      rowKey={this.getRowKey}
      rowSelection={rowSelection}
      columns={columns}
      dataSource={network.list.data}
      loading={network.list.isFetching}
    />);
  }

  renderError(error) {
    return (
      <span>{error.message}</span>
    );
  }

  render() {
    const { network } = this.props;
    const columns = getColumns(network.list.data);
    const rowSelection = {
      onChange: this.handleChange,
    };
    const hasSelected = this.state.selectedRowKeys.length === 1;
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!network.filter.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'pull-right': true,
    });
    const networks = network.list.error ?
      this.renderError(network.list.error) :
      this.renderNetwork(rowSelection, columns, network);

    return (
      <div className="table-view">
        <div className="table-actions">
          <Button type="primary" size="large" onClick={this.handleCreateClick}>创建私有网络</Button>
          <Button
            type="ghost"
            size="large"
            disabled={!hasSelected}
            onClick={this.handleCreateChildClick}
          >创建子网</Button>
          <Popconfirm title="确定要删除这个监控吗？" onConfirm={this.handleDelete}>
            <Button type="dashed" size="large" disabled={!hasSelected}>删除</Button>
          </Popconfirm>
          <Button type="ghost" size="large" onClick={this.handleReload}>
            <Icon type="reload" />
          </Button>
          <InputGroup className={searchCls}>
            <Input
              placeholder="输入关键字" size="large"
              value={network.filter} onChange={this.handleInputChange}
            />
            <div className="ant-input-group-wrap">
              <Button className={btnCls} size="large">
                <Icon type="search" />
              </Button>
            </div>
          </InputGroup>
        </div>
        <div className="table">
          {networks}
        </div>
      </div>
    );
  }
}

const getFilteredNetworks = createSelector(
  state => state.network.list.data,
  state => state.network.filter,
  (listData, filter) => listData.filter(network => includes(network.name, filter))
);

function mapStateToProps(state) {
  return {
    network: {
      ...state.network,
      list: { ...state.network.list, data: getFilteredNetworks(state) },
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchNetworks: () => dispatch(fetchNetworks()),
    filterNetworks: (filter) => dispatch(filterNetworks(filter)),
    deleteNetwork: (id) => dispatch(deleteNetwork(id)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
