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

import { fetchFirewalls, filterFirewalls, deleteFirewall } from '../../actions/firewall';

import AbstractList from '../AbstractList';

const InputGroup = Input.Group;

function renderLink(text, row) {
  return <Link to={`/app/firewalls/${row.id}`}>{text}</Link>;
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
    { title: '描述', dataIndex: 'description' },
    { title: '创建时间', dataIndex: 'createdAt' },
  ];
}

class List extends AbstractList {
  static propTypes = {
    firewall: React.PropTypes.shape({
      filter: React.PropTypes.string,
      list: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        data: React.PropTypes.arrayOf(React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
          status: React.PropTypes.string.isRequired,
          description: React.PropTypes.string.isRequired,
          createdAt: React.PropTypes.string.isRequired,
        })).isRequired,
      }).isRequired,
    }).isRequired,
    fetchFirewalls: React.PropTypes.func.isRequired,
    filterFirewalls: React.PropTypes.func.isRequired,
    deleteFirewall: React.PropTypes.func.isRequired,
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
    props.fetchFirewalls();
  }

  getRowKey(firewall) {
    return firewall.id;
  }

  handleDelete = () => {
    this.props.deleteFirewall(this.state.selectedRowKeys[0]);
    this.setState({ ...this.state, selectedRowKeys: [] });
    this.context.router.push('/app/firewalls');
  };

  handleChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  handleCreateClick = event => {
    event.preventDefault();
    this.context.router.push('/app/instances/new/step-1');
  };

  handleReload = e => {
    e.preventDefault();
    this.loadData(this.props);
  };

  handleInputChange = e => {
    this.props.filterFirewalls(e.target.value);
  };

  renderFirewall(rowSelection, columns, firewall) {
    return (<Table
      rowKey={this.getRowKey}
      rowSelection={rowSelection}
      columns={columns}
      dataSource={firewall.data}
      loading={firewall.isFetching}
    />);
  }

  renderError(error) {
    return (
      <span>{error.message}</span>
    );
  }

  render() {
    const { firewall } = this.props;
    const columns = getColumns(firewall.list.data);
    const rowSelection = {
      onChange: this.handleChange,
    };
    const hasSelected = this.state.selectedRowKeys.length === 1;
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!firewall.filter.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'pull-right': true,
    });
    const firewalls = firewall.error ?
      this.renderError(firewall.error) :
      this.renderFirewall(rowSelection, columns, firewall.list);

    return (
      <div className="table-view">
        <div className="table-actions">
          <Button
            type="primary"
            size="large"
            onClick={this.handleCreateClick}
          >
            创建防火墙
          </Button>
          <Popconfirm title="确定要删除这个防火墙吗？" onConfirm={this.handleDelete}>
            <Button type="dashed" size="large" disabled={!hasSelected}>删除</Button>
          </Popconfirm>
          <Button type="ghost" size="large" onClick={this.handleReload}>
            <Icon type="reload" />
          </Button>
          <InputGroup className={searchCls}>
            <Input
              placeholder="输入关键字" size="large"
              value={firewall.filter} onChange={this.handleInputChange}
            />
            <div className="ant-input-group-wrap">
              <Button className={btnCls} size="large">
                <Icon type="search" />
              </Button>
            </div>
          </InputGroup>
        </div>
        <div className="table">
          {firewalls}
        </div>
      </div>
    );
  }
}

const getFilteredFirewalls = createSelector(
  state => state.firewall.list.data,
  state => state.firewall.filter,
  (listData, filter) => listData.filter(firewall => includes(firewall.name, filter))
);

function mapStateToProps(state) {
  return {
    firewall: {
      ...state.firewall,
      list: { ...state.firewall.list, data: getFilteredFirewalls(state) },
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchFirewalls: () => dispatch(fetchFirewalls()),
    filterFirewalls: filter => dispatch(filterFirewalls(filter)),
    deleteFirewall: id => dispatch(deleteFirewall(id)),
    refresh: () => dispatch(fetchFirewalls(undefined, true)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
