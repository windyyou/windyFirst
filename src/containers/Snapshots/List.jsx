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
import AbstractList from '../AbstractList';
import { fetchSnapshots, filterSnapshots, deleteSnapshot } from '../../actions/snapshot';

const InputGroup = Input.Group;

function renderLink(text, row) {
  return <Link to={`/app/snapshots/${row.id}`}>{text}</Link>;
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
    { title: '创建时间', dataIndex: 'createdAt' },
  ];
}

class List extends AbstractList {
  static propTypes = {
    snapshot: React.PropTypes.shape({
      filter: React.PropTypes.string,
      list: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        data: React.PropTypes.arrayOf(React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
          status: React.PropTypes.string.isRequired,
          size: React.PropTypes.string.isRequired,
          createdAt: React.PropTypes.string.isRequired,
        })),
      }),
    }),
    fetchSnapshots: React.PropTypes.func.isRequired,
    filterSnapshots: React.PropTypes.func.isRequired,
    deleteSnapshot: React.PropTypes.func.isRequired,
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
    props.fetchSnapshots();
  }

  getRowKey(snapshot) {
    return snapshot.id;
  }

  handleDelete = () => {
    this.props.deleteSnapshot(this.state.selectedRowKeys[0]);
    this.setState({ ...this.state, selectedRowKeys: [] });
    this.context.router.push('/app/snapshots');
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
    this.props.filterSnapshots(e.target.value);
  };

  renderSnapshot(rowSelection, columns, showData) {
    return (<Table
      rowKey={this.getRowKey}
      rowSelection={rowSelection}
      columns={columns}
      dataSource={showData}
      loading={this.props.snapshot.list.isFetching}
    />);
  }

  renderError(error) {
    return (
      <span>{error.message}</span>
    );
  }

  render() {
    const { snapshot } = this.props;
    const columns = getColumns(snapshot.list.data);
    const rowSelection = {
      onChange: this.handleChange,
    };
    const hasSelected = this.state.selectedRowKeys.length === 1;
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!snapshot.filter.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'pull-right': true,
    });
    const snapshots = snapshot.list.error ?
      this.renderError(snapshot.list.error) :
      this.renderSnapshot(rowSelection, columns, snapshot.list.data);

    return (
      <div className="table-view">
        <div className="table-actions">
          <Button
            type="primary"
            size="large"
            disabled={!hasSelected}
            onClick={this.handleCreateClick}
          >
            创建云主机
          </Button>
          <Popconfirm title="确定要删除这个快照吗？" onConfirm={this.handleDelete}>
            <Button type="dashed" size="large" disabled={!hasSelected}>删除</Button>
          </Popconfirm>
          <Button type="ghost" size="large" onClick={this.handleReload}>
            <Icon type="reload" />
          </Button>
          <InputGroup className={searchCls}>
            <Input
              placeholder="输入关键字" size="large"
              value={snapshot.filter} onChange={this.handleInputChange}
            />
            <div className="ant-input-group-wrap">
              <Button className={btnCls} size="large">
                <Icon type="search" />
              </Button>
            </div>
          </InputGroup>
        </div>
        <div className="table">
          {snapshots}
        </div>
      </div>
    );
  }
}

const getFilteredSnapshots = createSelector(
  state => state.snapshot.list.data,
  state => state.snapshot.filter,
  (listData, filter) => listData.filter(snapshot => includes(snapshot.name, filter))
);

function mapStateToProps(state) {
  return {
    snapshot: {
      ...state.snapshot,
      list: { ...state.snapshot.list, data: getFilteredSnapshots(state) },
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchSnapshots: () => dispatch(fetchSnapshots()),
    filterSnapshots: filter => dispatch(filterSnapshots(filter)),
    deleteSnapshot: id => dispatch(deleteSnapshot(id)),
    refresh: () => dispatch(fetchSnapshots(undefined, true)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
