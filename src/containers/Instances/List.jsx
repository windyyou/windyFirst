import React from 'react';
import Button from 'antd/lib/button';
import Table from 'antd/lib/table';
import Icon from 'antd/lib/icon';
import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';
import Input from 'antd/lib/input';
import Popconfirm from 'antd/lib/popconfirm';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import classNames from 'classnames';
import includes from '../../../node_modules/lodash/includes';
import uniq from '../../../node_modules/lodash/uniq';

import { fetchInstances, filterInstances, deleteInstance } from '../../actions/instance';

const InputGroup = Input.Group;
const MenuItem = Menu.Item;

function renderLink(text, row) {
  return <Link to={`/app/instances/${row.id}`}>{text}</Link>;
}

function renderIp(text) {
  return text.join(', ');
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
    { title: '内网IP', dataIndex: 'ips', render: renderIp },
    { title: '公网IP', dataIndex: 'floatingIps', render: renderIp },
    { title: '系统', dataIndex: 'systemName' },
    { title: '类型', dataIndex: 'type' },
    { title: '创建时间', dataIndex: 'createdAt' },
  ];
}

function loadData(props) {
  props.fetchInstances();
}

class List extends React.Component {
  static propTypes = {
    instance: React.PropTypes.shape({
      filter: React.PropTypes.string,
      list: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        data: React.PropTypes.arrayOf(React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
          status: React.PropTypes.string.isRequired,
          ips: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
          floatingIps: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
          image: React.PropTypes.shape({
            id: React.PropTypes.string.isRequired,
            name: React.PropTypes.string.isRequired,
          }),
          type: React.PropTypes.string.isRequired,
          createdAt: React.PropTypes.string.isRequired,
        })).isRequired,
      }).isRequired,
    }).isRequired,
    fetchInstances: React.PropTypes.func.isRequired,
    filterInstances: React.PropTypes.func.isRequired,
    deleteInstance: React.PropTypes.func.isRequired,
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

  getMenu(hasSelected) {
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
        <MenuItem key="5" disabled={!hasSelected}>
          <Popconfirm title="确定要删除这个主机吗？" onConfirm={this.handleDelete}>
            <a>删除</a>
          </Popconfirm>
        </MenuItem>
      </Menu>
    );
  }

  getRowKey(instance) {
    return instance.id;
  }

  handleDelete = () => {
    this.props.deleteInstance(this.state.selectedRowKeys[0]);
    this.setState({ ...this.state, selectedRowKeys: [] });
    this.context.router.push('/app/instances');
  };

  handleChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  handleCreateClick = (event) => {
    event.preventDefault();
    this.context.router.push('/app/instances/new/step-1');
  };

  handleReload = (e) => {
    e.preventDefault();
    loadData(this.props);
  };

  handleInputChange = (e) => {
    this.props.filterInstances(e.target.value);
  };

  renderInstance(rowSelection, columns, instance) {
    return (<Table
      rowKey={this.getRowKey}
      rowSelection={rowSelection}
      columns={columns}
      dataSource={instance.data}
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
    const columns = getColumns(instance.list.data);
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.handleChange,
    };
    const hasSelected = this.state.selectedRowKeys.length === 1;
    const menu = this.getMenu(hasSelected);
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!instance.filter.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'pull-right': true,
    });
    const instances = instance.list.error ?
      this.renderError(instance.list.error) :
      this.renderInstance(rowSelection, columns, instance.list);

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
          <Button type="ghost" size="large" onClick={this.handleReload}>
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
  state => state.instance.list.data,
  state => state.instance.filter,
  (listData, filter) => listData.filter(instance => includes(instance.name, filter))
);

function mapStateToProps(state) {
  return {
    instance: {
      ...state.instance,
      list: { ...state.instance.list, data: getFilteredInstances(state) },
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchInstances: () => dispatch(fetchInstances()),
    filterInstances: (filter) => dispatch(filterInstances(filter)),
    deleteInstance: (id) => dispatch(deleteInstance(id)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
