import React from 'react';
import Button from 'antd/lib/button';
import Table from 'antd/lib/table';
import Icon from 'antd/lib/icon';
import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';
import Input from 'antd/lib/input';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import classNames from 'classnames';
import includes from '../../../node_modules/lodash/includes';
import uniq from '../../../node_modules/lodash/uniq';

import { fetchDisks, filterDisks } from '../../actions/disk';

const InputGroup = Input.Group;
const MenuItem = Menu.Item;

function renderLink(text) {
  return <a href="#" >{text}</a>;
}

function renderMount(text, instance) {
  return <Link to={`/instances/${instance.instanceId}`}>{text}</Link>;
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
    { title: '类型', dataIndex: 'type' },
    { title: '挂载到主机', dataIndex: 'mount', render: renderMount },
    { title: '创建时间', dataIndex: 'createdAt' },
  ];
}

function loadData(props) {
  props.fetchDisks();
}

class List extends React.Component {
  static propTypes = {
    disk: React.PropTypes.shape({
      isFetching: React.PropTypes.bool.isRequired,
      error: React.PropTypes.object,
      filter: React.PropTypes.string,
      diskList: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        size: React.PropTypes.string.isRequired,
        status: React.PropTypes.string.isRequired,
        type: React.PropTypes.string.isRequired,
        mount: React.PropTypes.string.isRequired,
        instanceId: React.PropTypes.string.isRequired,
        createdAt: React.PropTypes.string.isRequired,
      })).isRequired,
    }),
    fetchDisks: React.PropTypes.func.isRequired,
    filterDisks: React.PropTypes.func.isRequired,
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

  getMenu(mounted) {
    return (
      <Menu>
        <MenuItem key="1" disabled={!mounted} >
          <a href="#">卸载</a>
        </MenuItem>
        <MenuItem key="2">
          <a href="#">备份</a>
        </MenuItem>
        <MenuItem key="3">
          <a href="#">删除</a>
        </MenuItem>
      </Menu>
    );
  }

  getRowKey(disk) {
    return disk.id;
  }

  handleChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRows });
  };

  handleCreateClick = (event) => {
    event.preventDefault();
  };

  handleInputChange = (e) => {
    this.props.filterDisks(e.target.value);
  };

  renderDisk(rowSelection, columns, showData) {
    return (<Table
      rowKey={this.getRowKey}
      rowSelection={rowSelection}
      columns={columns}
      dataSource={showData}
    />);
  }

  renderFetching(rowSelection, columns, disk) {
    return (
      <Table
        rowKey={this.getRowKey}
        rowSelection={rowSelection}
        columns={columns}
        loading={disk.isFetching}
      />
    );
  }

  renderError(error) {
    return (
      <span>{error.message}</span>
    );
  }

  render() {
    const { disk } = this.props;
    const { selectedRows } = this.state;
    const hasSelected = selectedRows.length === 1;
    const mounted = hasSelected && selectedRows[0].mount;
    const menu = this.getMenu(mounted);
    const columns = getColumns(disk.diskList);
    const rowSelection = {
      onChange: this.handleChange,
    };
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!disk.filter.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'pull-right': true,
    });
    const disks = disk.error ?
      this.renderError(disk.error) :
      this.renderDisk(rowSelection, columns, disk.diskList);

    return (
      <div className="table-view">
        <div className="table-actions">
          <Button type="primary" size="large" onClick={this.handleCreateClick}>创建云硬盘</Button>
          <Button type="ghost" size="large" disabled={!hasSelected || mounted} >挂载到云主机</Button>
          <Dropdown overlay={menu} trigger={['click']}>
            <Button type="ghost" size="large" disabled={!hasSelected}>
              更多 <Icon type="down" />
            </Button>
          </Dropdown>
          <Button type="ghost" size="large">
            <Icon type="reload" />
          </Button>
          <InputGroup className={searchCls}>
            <Input
              placeholder="输入关键字" size="large"
              value={disk.filter} onChange={this.handleInputChange}
            />
            <div className="ant-input-group-wrap">
              <Button className={btnCls} size="large">
                <Icon type="search" />
              </Button>
            </div>
          </InputGroup>
        </div>
        <div className="table">
          {disk.isFetching ? this.renderFetching(rowSelection, columns, disk) : disks}
        </div>
      </div>
    );
  }
}

const getFilteredDisks = createSelector(
  state => state.disk.diskList,
  state => state.disk.filter,
  (diskList, filter) => diskList.filter(disk => includes(disk.name, filter))
);

function mapStateToProps(state) {
  return {
    disk: {
      ...state.disk,
      diskList: getFilteredDisks(state),
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDisks: () => dispatch(fetchDisks()),
    filterDisks: (filter) => dispatch(filterDisks(filter)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
