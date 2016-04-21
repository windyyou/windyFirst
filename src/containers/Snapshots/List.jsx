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

import { fetchSnapshots, filterSnapshots } from '../../actions/snapshot';

const InputGroup = Input.Group;

function renderLink(text, row) {
  return <Link to={`/snapshots/${row.id}`}>{text}</Link>;
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
    { title: '创建时间', dataIndex: 'ago' },
  ];
}

function loadData(props) {
  props.fetchSnapshots();
}

class List extends React.Component {
  static propTypes = {
    snapshot: React.PropTypes.shape({
      isFetching: React.PropTypes.bool.isRequired,
      error: React.PropTypes.object,
      filter: React.PropTypes.string,
      snapshotList: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        name: React.PropTypes.string.isRequired,
        status: React.PropTypes.string.isRequired,
        size: React.PropTypes.string.isRequired,
        ago: React.PropTypes.string.isRequired,
        datetime: React.PropTypes.string.isRequired,
      })),
    }),
    fetchSnapshots: React.PropTypes.func.isRequired,
    filterSnapshots: React.PropTypes.func.isRequired,
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

  getRowKey(snapshot) {
    return snapshot.id;
  }

  handleChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  handleCreateClick = (event) => {
    event.preventDefault();
    this.context.router.push('/instances/new/step-1');
  };

  handleInputChange = (e) => {
    this.props.filterSnapshots(e.target.value);
  };

  renderSnapshot(rowSelection, columns, showData) {
    return (<Table
      rowKey={this.getRowKey}
      rowSelection={rowSelection}
      columns={columns}
      dataSource={showData}
      loading={this.props.snapshot.isFetching}
    />);
  }

  renderError(error) {
    return (
      <span>{error.message}</span>
    );
  }

  render() {
    const { snapshot } = this.props;
    const columns = getColumns(snapshot.snapshotList);
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
    const snapshots = snapshot.error ?
      this.renderError(snapshot.error) :
      this.renderSnapshot(rowSelection, columns, snapshot.snapshotList);

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
          <Button type="dashed" size="large" disabled={!hasSelected}>删除</Button>
          <Button type="ghost" size="large">
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
  state => state.snapshot.entities,
  state => state.snapshot.filter,
  (entities, filter) => entities.filter(snapshot => includes(snapshot.name, filter))
);

function mapStateToProps(state) {
  return {
    snapshot: {
      ...state.snapshot,
      snapshotList: getFilteredSnapshots(state),
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchSnapshots: () => dispatch(fetchSnapshots()),
    filterSnapshots: (filter) => dispatch(filterSnapshots(filter)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
