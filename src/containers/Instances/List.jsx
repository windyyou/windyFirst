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

import { fetchInstances, filterInstances } from '../../actions/instance';

const InputGroup = Input.Group;
const MenuItem = Menu.Item;

function renderLink(text, row) {
  return <Link to={`/instances/${row.id}`}>{text}</Link>;
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
    { title: '内网IP', dataIndex: 'ip' },
    { title: '公网IP', dataIndex: 'floatingIp' },
    { title: '镜像', dataIndex: 'image' },
    { title: '配置', dataIndex: 'type' },
    { title: '创建时间', dataIndex: 'createdAt' },
  ];
}

function loadData(props) {
  props.fetchInstances();
}

class List extends React.Component {
  static propTypes = {
    instance: React.PropTypes.shape({
      isFetching: React.PropTypes.bool.isRequired,
      error: React.PropTypes.object,
      filter: React.PropTypes.string,
      instanceList: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        status: React.PropTypes.string.isRequired,
        ip: React.PropTypes.string.isRequired,
        floatingIp: React.PropTypes.string.isRequired,
        image: React.PropTypes.string.isRequired,
        type: React.PropTypes.string.isRequired,
        createdAt: React.PropTypes.string.isRequired,
      })).isRequired,
    }),
    fetchInstances: React.PropTypes.func.isRequired,
    filterInstances: React.PropTypes.func.isRequired,
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

  getMenu() {
    return (
      <Menu>
        <MenuItem key="1">
          <a href="#">功能</a>
        </MenuItem>
        <MenuItem key="2">
          <a href="#">功能</a>
        </MenuItem>
        <MenuItem key="3">
          <a href="#">功能</a>
        </MenuItem>
        <MenuItem key="4">
          <a href="#">功能</a>
        </MenuItem>
        <MenuItem key="5">
          <a href="#">功能</a>
        </MenuItem>
      </Menu>
    );
  }

  getRowKey(instance) {
    return instance.id;
  }

  handleChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  handleCreateClick = (event) => {
    event.preventDefault();
    this.context.router.push('/instances/new/step-1');
  };

  handleInputChange = (e) => {
    this.props.filterInstances(e.target.value);
  };

  renderInstance(rowSelection, columns, instance) {
    return (<Table
      rowKey={this.getRowKey}
      rowSelection={rowSelection}
      columns={columns}
      dataSource={instance.instanceList}
      loading={instance.isFetching}
    />);
  }

  renderError(error) {
    return (
      <span>{error.message}</span>
    );
  }

  render() {
    const { instance } = this.props;
    const menu = this.getMenu();
    const columns = getColumns(instance.instanceList);
    const rowSelection = {
      onChange: this.handleChange,
    };
    const hasSelected = this.state.selectedRowKeys.length === 1;
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!instance.filter.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'pull-right': true,
    });
    const instances = instance.error ?
      this.renderError(instance.error) :
      this.renderInstance(rowSelection, columns, instance);

    return (
      <div className="table-view">
        <div className="table-actions">
          <Button type="primary" size="large" onClick={this.handleCreateClick}>创建云主机</Button>
          <Button type="ghost" size="large" disabled={!hasSelected}>Console</Button>
          <Button type="ghost" size="large" disabled={!hasSelected}>开机</Button>
          <Button type="ghost" size="large" disabled={!hasSelected}>关机</Button>
          <Dropdown overlay={menu} trigger={['click']}>
            <Button type="ghost" size="large">更多<Icon type="down" /></Button>
          </Dropdown>
          <Button type="ghost" size="large">
            <Icon type="reload" />
          </Button>
          <InputGroup className={searchCls}>
            <Input
              placeholder="输入关键字" size="large"
              value={instance.filter} onChange={this.handleInputChange}
            />
            <div className="ant-input-group-wrap">
              <Button className={btnCls} size="large">
                <Icon type="search" />
              </Button>
            </div>
          </InputGroup>
        </div>
        <div className="table">
          {instances}
        </div>
      </div>
    );
  }
}

const getFilteredInstances = createSelector(
  state => state.instance.instanceList,
  state => state.instance.filter,
  (instanceList, filter) => instanceList.filter(instance => includes(instance.name, filter))
);

function mapStateToProps(state) {
  return {
    instance: {
      ...state.instance,
      instanceList: getFilteredInstances(state),
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchInstances: () => dispatch(fetchInstances()),
    filterInstances: (filter) => dispatch(filterInstances(filter)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
