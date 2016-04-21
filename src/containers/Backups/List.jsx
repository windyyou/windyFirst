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

import { fetchBackups, filterBackups } from '../../actions/backup';

const InputGroup = Input.Group;

function renderLink(text, row) {
  return <Link to={`/backups/${row.id}`}>{text}</Link>;
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
    { title: '云硬盘', dataIndex: 'cloudDisk', render: renderLink },
    { title: '创建时间', dataIndex: 'ago' },
  ];
}

function loadData(props) {
  props.fetchBackups();
}

class List extends React.Component {
  static propTypes = {
    backup: React.PropTypes.shape({
      isFetching: React.PropTypes.bool.isRequired,
      error: React.PropTypes.object,
      filter: React.PropTypes.string,
      backupList: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        name: React.PropTypes.string.isRequired,
        status: React.PropTypes.string.isRequired,
        size: React.PropTypes.string.isRequired,
        cloudDisk: React.PropTypes.string.isRequired,
        ago: React.PropTypes.string.isRequired,
      })),
    }),
    fetchBackups: React.PropTypes.func.isRequired,
    filterBackups: React.PropTypes.func.isRequired,
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

  getRowKey(backup) {
    return backup.id;
  }

  handleChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  handleCreateClick = (event) => {
    event.preventDefault();
    this.context.router.push('/instances/new/step-1');
  };

  handleInputChange = (e) => {
    this.props.filterBackups(e.target.value);
  };

  renderBackup(rowSelection, columns, showData) {
    return (<Table
      rowKey={this.getRowKey}
      rowSelection={rowSelection}
      columns={columns}
      dataSource={showData}
      loading={this.props.backup.isFetching}
    />);
  }

  renderError(error) {
    return (
      <span>{error.message}</span>
    );
  }

  render() {
    const { backup } = this.props;
    const columns = getColumns(backup.backupList);
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
      this.renderBackup(rowSelection, columns, backup.backupList);

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
          <Button type="dashed" size="large" disabled={!hasSelected}>删除</Button>
          <Button type="ghost" size="large">
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
  state => state.backup.entities,
  state => state.backup.filter,
  (entities, filter) => entities.filter(backup => includes(backup.name, filter))
);

function mapStateToProps(state) {
  return {
    backup: {
      ...state.backup,
      backupList: getFilteredBackups(state),
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchBackups: () => dispatch(fetchBackups()),
    filterBackups: (filter) => dispatch(filterBackups(filter)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
