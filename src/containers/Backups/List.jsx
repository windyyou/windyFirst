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

import { fetchBackups, filterBackups, deleteBackup } from '../../actions/backup';

import AbstractList from '../AbstractList';

const InputGroup = Input.Group;

function renderLink(text, row) {
  return <Link to={`/app/backups/${row.id}`}>{text}</Link>;
}

function renderVolume(text) {
  return <Link to={`/app/backups/${text.id}`}>{text.name}</Link>;
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
    { title: '容量', dataIndex: 'size' },
    { title: '云硬盘', dataIndex: 'volume', render: renderVolume },
    { title: '创建时间', dataIndex: 'createdAt' },
  ];
}

class List extends AbstractList {
  static propTypes = {
    backup: React.PropTypes.shape({
      filter: React.PropTypes.string,
      list: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        data: React.PropTypes.arrayOf(React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
          status: React.PropTypes.string.isRequired,
          size: React.PropTypes.string.isRequired,
          volume: React.PropTypes.object.isRequired,
          createdAt: React.PropTypes.string.isRequired,
        })).isRequired,
      }).isRequired,
    }).isRequired,
    fetchBackups: React.PropTypes.func.isRequired,
    filterBackups: React.PropTypes.func.isRequired,
    deleteBackup: React.PropTypes.func.isRequired,
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
    props.fetchBackups();
  }

  getRowKey(backup) {
    return backup.id;
  }

  handleDelete = () => {
    this.props.deleteBackup(this.state.selectedRowKeys[0]);
    this.setState({ ...this.state, selectedRowKeys: [] });
    this.context.router.push('/app/backups');
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
    this.props.filterBackups(e.target.value);
  };

  renderBackup(rowSelection, columns, backup) {
    return (<Table
      rowKey={this.getRowKey}
      rowSelection={rowSelection}
      columns={columns}
      dataSource={backup.data}
      loading={backup.isFetching}
    />);
  }

  renderError(error) {
    return (
      <span>{error.message}</span>
    );
  }

  render() {
    const { backup } = this.props;
    const columns = getColumns(backup.list.data);
    const rowSelection = {
      onChange: this.handleChange,
    };
    const hasSelected = this.state.selectedRowKeys.length === 1;
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!backup.filter.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'pull-right': true,
    });
    const backups = backup.error ?
      this.renderError(backup.error) :
      this.renderBackup(rowSelection, columns, backup.list);

    return (
      <div className="table-view">
        <div className="table-actions">
          <Button
            type="primary"
            size="large"
            disabled={!hasSelected}
            onClick={this.handleCreateClick}
          >
            创建云硬盘
          </Button>
          <Popconfirm title="确定要删除这个备份吗？" onConfirm={this.handleDelete}>
            <Button type="dashed" size="large" disabled={!hasSelected}>删除</Button>
          </Popconfirm>
          <Button type="ghost" size="large" onClick={this.handleReload}>
            <Icon type="reload" />
          </Button>
          <InputGroup className={searchCls}>
            <Input
              placeholder="输入关键字" size="large"
              value={backup.filter} onChange={this.handleInputChange}
            />
            <div className="ant-input-group-wrap">
              <Button className={btnCls} size="large">
                <Icon type="search" />
              </Button>
            </div>
          </InputGroup>
        </div>
        <div className="table">
          {backups}
        </div>
      </div>
    );
  }
}

const getFilteredBackups = createSelector(
  state => state.backup.list.data,
  state => state.backup.filter,
  (listData, filter) => listData.filter(backup => includes(backup.name, filter))
);

function mapStateToProps(state) {
  return {
    backup: {
      ...state.backup,
      list: { ...state.backup.list, data: getFilteredBackups(state) },
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchBackups: () => dispatch(fetchBackups()),
    filterBackups: filter => dispatch(filterBackups(filter)),
    deleteBackup: id => dispatch(deleteBackup(id)),
    refresh: () => dispatch(fetchBackups(undefined, true)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
