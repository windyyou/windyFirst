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
import { fetchAlarms, filterAlarms } from '../../actions/alarm';

const InputGroup = Input.Group;

function nameLink(text, row) {
  return <Link to={`/alarms/${row.id}`}>{text}</Link>;
}

function resourceLink(row) {
  return <Link to={`/${row.type}s/${row.id}`}>{row.name}</Link>;
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
    { title: '资源', dataIndex: 'resource', render: resourceLink },
    { title: '创建时间', dataIndex: 'createdAt' },
  ];
}

function loadData(props) {
  props.fetchAlarms();
}

class List extends React.Component {
  static propTypes = {
    alarm: React.PropTypes.shape({
      isFetching: React.PropTypes.bool.isRequired,
      error: React.PropTypes.object,
      filter: React.PropTypes.string,
      entities: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        status: React.PropTypes.string.isRequired,
        enable: React.PropTypes.string.isRequired,
        resource: React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          type: React.PropTypes.string.isRequired,
        }),
        createdAt: React.PropTypes.string.isRequired,
      })),
    }),
    fetchAlarms: React.PropTypes.func.isRequired,
    filterAlarms: React.PropTypes.func.isRequired,
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

  getRowKey(alarm) {
    return alarm.id;
  }

  handleChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRows });
  };

  handleCreateClick = (event) => {
    event.preventDefault();
    this.context.router.push('/alarms/new/step-1');
  };

  handleInputChange = (e) => {
    this.props.filterAlarms(e.target.value);
  };

  renderAlarm(rowSelection, columns, showData) {
    return (<Table
      rowKey={this.getRowKey}
      rowSelection={rowSelection}
      columns={columns}
      dataSource={showData}
      loading={this.props.alarm.isFetching}
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
    const columns = getColumns(alarm.entities);
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
    const alarms = alarm.error ?
      this.renderError(alarm.error) :
      this.renderAlarm(rowSelection, columns, alarm.entities);

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
          <Button type="dashed" size="large" disabled={!hasSelected}>删除</Button>
          <Button type="ghost" size="large">
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
  state => state.alarm.entities,
  state => state.alarm.filter,
  (entities, filter) => entities.filter(alarm => includes(alarm.name, filter))
);

function mapStateToProps(state) {
  return {
    alarm: {
      ...state.alarm,
      entities: getFilteredAlarms(state),
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAlarms: () => dispatch(fetchAlarms()),
    filterAlarms: (filter) => dispatch(filterAlarms(filter)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
