import React from 'react';
import Button from 'antd/lib/button';
import Table from 'antd/lib/table';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import classNames from 'classnames';
import includes from '../../../node_modules/lodash/includes';
import uniq from '../../../node_modules/lodash/uniq';

import { fetchBareMetals, filterBareMetals } from '../../actions/bareMetal';

const InputGroup = Input.Group;
const MenuItem = Menu.Item;

function renderLink(text, row) {
  return <Link to={`/bare-metals/${row.id}`}>{text}</Link>;
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
    { title: 'IP', dataIndex: 'ip' },
    { title: '配置', dataIndex: 'config' },
    { title: '注册时间', dataIndex: 'createdAt' },
  ];
}

function loadData(props) {
  props.fetchBareMetals();
}

class List extends React.Component {
  static propTypes = {
    bareMetal: React.PropTypes.shape({
      isFetching: React.PropTypes.bool.isRequired,
      error: React.PropTypes.object,
      filter: React.PropTypes.string,
      entities: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        status: React.PropTypes.string.isRequired,
        ip: React.PropTypes.string.isRequired,
        config: React.PropTypes.string.isRequired,
        createdAt: React.PropTypes.string.isRequired,
      })),
    }),
    fetchBareMetals: React.PropTypes.func.isRequired,
    filterBareMetals: React.PropTypes.func.isRequired,
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

  getRowKey(record) {
    return record.id;
  }

  getMenu(hasSelected, runningSelected) {
    return (
      <Menu>
        <MenuItem key="1" disabled={!runningSelected}>
          <a href="#">重启</a>
        </MenuItem>
        <MenuItem key="2" disabled={!hasSelected}>
          <a href="#">删除</a>
        </MenuItem>
      </Menu>
    );
  }

  handleChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRows });
  };

  handleCreateClick = (event) => {
    event.preventDefault();
    this.context.router.push('/bare-metals/new/step-1');
  };

  handleInputChange = (e) => {
    this.props.filterBareMetals(e.target.value);
  };

  renderBareMetal(rowSelection, columns, showData) {
    return (<Table
      rowKey={this.getRowKey}
      rowSelection={rowSelection}
      columns={columns}
      dataSource={showData}
      loading={this.props.bareMetal.isFetching}
    />);
  }

  renderError(error) {
    return (
      <span>{error.message}</span>
    );
  }

  render() {
    const { bareMetal } = this.props;
    const { selectedRows } = this.state;
    const columns = getColumns(bareMetal.entities);
    const rowSelection = {
      onChange: this.handleChange,
    };

    const hasSelected = selectedRows.length === 1;
    const runningSelected = !!(hasSelected && selectedRows[0].status === '运行中');
    const shutdownSelected = !!(hasSelected && selectedRows[0].status === '已关机');

    const menu = this.getMenu(hasSelected, runningSelected);

    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!bareMetal.filter.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'pull-right': true,
    });
    const bareMetals = bareMetal.error ?
      this.renderError(bareMetal.error) :
      this.renderBareMetal(rowSelection, columns, bareMetal.entities);

    return (
      <div className="table-view">
        <div className="table-actions">
          <Button
            type="primary"
            size="large"
            onClick={this.handleCreateClick}
          >注册物理机</Button>
          <Button type="ghost" size="large" disabled={!shutdownSelected}>开机</Button>
          <Button type="ghost" size="large" disabled={!runningSelected}>关机</Button>
          <Dropdown overlay={menu} trigger={['click']}>
            <Button type="ghost" size="large">更多<Icon type="down" /></Button>
          </Dropdown>
          <Button type="ghost" size="large">
            <Icon type="reload" />
          </Button>
          <InputGroup className={searchCls}>
            <Input
              placeholder="输入关键字" size="large"
              value={bareMetal.filter} onChange={this.handleInputChange}
            />
            <div className="ant-input-group-wrap">
              <Button className={btnCls} size="large">
                <Icon type="search" />
              </Button>
            </div>
          </InputGroup>
        </div>
        <div className="table">
          {bareMetals}
        </div>
      </div>
    );
  }
}

const getFilteredBareMetals = createSelector(
  state => state.bareMetal.entities,
  state => state.bareMetal.filter,
  (entities, filter) => entities.filter(entity => includes(entity.name, filter))
);

function mapStateToProps(state) {
  return {
    bareMetal: {
      ...state.bareMetal,
      entities: getFilteredBareMetals(state),
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchBareMetals: () => dispatch(fetchBareMetals()),
    filterBareMetals: (filter) => dispatch(filterBareMetals(filter)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
