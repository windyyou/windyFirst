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
import { fetchAlarms, filterAlarms, deleteAlarm } from '../../actions/alarm';

import AbstractList from '../AbstractList';

const InputGroup = Input.Group;

function nameLink(text, row) {
  return <Link to={`/app/alarms/${row.id}`}>{text}</Link>;
}

function renderResource(resources, record) {
  const prop = resources.filter(resource => resource);

  return prop.reduce((prev, curr, index) => {
    prev.push(<Link key={curr.id} to={`/${record.type}/${curr.id}`}>{curr.name}</Link>);

    if (index !== prop.length - 1) {
      prev.push(', ');
    }

    return prev;
  }, []);
}

function getColumns(data) {
  const statusFilter = uniq(data.map(record => record.status))
    .map(st => ({ text: st, value: st }));
  const enableFilter = uniq(data.map(record => record.enable))
    .map(st => ({ text: st, value: st }));

  return [
    { title: '名称', dataIndex: 'name', render: nameLink },
    { title: '启用状态', dataIndex: 'enable', filters: enableFilter,
      onFilter(value, record) {
        return record.enable === value;
      },
    },
    { title: '状态', dataIndex: 'status', filters: statusFilter,
      onFilter(value, record) {
        return record.status === value;
      },
    },
    { title: '对象', dataIndex: 'resources', render: renderResource },
    { title: '创建时间', dataIndex: 'createdAt' },
  ];
}

class List extends AbstractList {
  static propTypes = {
    alarm: React.PropTypes.object.isRequired,
    fetchAlarms: React.PropTypes.func.isRequired,
    filterAlarms: React.PropTypes.func.isRequired,
    deleteAlarm: React.PropTypes.func.isRequired,
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
    props.fetchAlarms();
  }

  getRowKey(alarm) {
    return alarm.id;
  }

  handleChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRows });
  };

  handleCreateClick = event => {
    event.preventDefault();
    this.context.router.push('/app/alarms/new/step-1');
  };

  handleReload = e => {
    e.preventDefault();
    this.loadData(this.props);
  };

  handleInputChange = e => {
    this.props.filterAlarms(e.target.value);
  };

  handleDelete = () => {
    this.props.deleteAlarm(this.state.selectedRows[0].id);
    this.setState({ ...this.state, selectedRows: [] });
    this.context.router.push('/app/alarms');
  };

  renderAlarm(rowSelection, columns, alarm) {
    return (<Table
      rowKey={this.getRowKey}
      rowSelection={rowSelection}
      columns={columns}
      dataSource={alarm.data}
      loading={alarm.isFetching}
    />);
  }

  renderError(error) {
    return (
      <span>{error.message}</span>
    );
  }

  render() {
    const { alarm } = this.props;
    const { selectedRows } = this.state;
    const columns = getColumns(alarm.list.data);
    const hasSelected = this.state.selectedRows.length === 1;
    const enabled = hasSelected && selectedRows[0].enable === '启用';
    const unEnabled = hasSelected && selectedRows[0].enable === '未启用';
    const rowSelection = {
      onChange: this.handleChange,
    };
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!alarm.filter.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'pull-right': true,
    });
    const alarms = alarm.list.error ?
      this.renderError(alarm.list.error) :
      this.renderAlarm(rowSelection, columns, alarm.list);

    return (
      <div className="table-view">
        <div className="table-actions">
          <Button
            type="primary"
            size="large"
            onClick={this.handleCreateClick}
          >
            创建报警
          </Button>
          <Button type="ghost" size="large" disabled={!hasSelected || enabled}>启用</Button>
          <Button type="ghost" size="large" disabled={!hasSelected || unEnabled}>禁用</Button>
          <Popconfirm title="确定要删除这个监控吗？" onConfirm={this.handleDelete}>
            <Button type="dashed" size="large" disabled={!hasSelected}>删除</Button>
          </Popconfirm>
          <Button type="ghost" size="large" onClick={this.handleReload}>
            <Icon type="reload" />
          </Button>
          <InputGroup className={searchCls}>
            <Input
              placeholder="输入关键字" size="large"
              value={alarm.filter} onChange={this.handleInputChange}
            />
            <div className="ant-input-group-wrap">
              <Button className={btnCls} size="large">
                <Icon type="search" />
              </Button>
            </div>
          </InputGroup>
        </div>
        <div className="table">
          {alarms}
        </div>
      </div>
    );
  }
}

const getFilteredAlarms = createSelector(
  state => state.alarm.list.data,
  state => state.alarm.filter,
  (listData, filter) => listData.filter(alarm => includes(alarm.name, filter))
);

function mapStateToProps(state) {
  return {
    alarm: {
      ...state.alarm,
      list: { ...state.alarm.list, data: getFilteredAlarms(state) },
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAlarms: () => dispatch(fetchAlarms()),
    filterAlarms: filter => dispatch(filterAlarms(filter)),
    deleteAlarm: id => dispatch(deleteAlarm(id)),
    refresh: () => dispatch(fetchAlarms(undefined, true)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
