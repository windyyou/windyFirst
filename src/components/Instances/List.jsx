import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import Table from 'antd/lib/table';
import Icon from 'antd/lib/icon';
import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';
import Input from 'antd/lib/input';
import { Link } from 'react-router';

import classNames from 'classnames';
import includes from 'lodash/includes';
import uniq from 'lodash/uniq';

import data from '../../api/mock/instances.json';

const InputGroup = Input.Group;
const MenuItem = Menu.Item;

function renderLink(text, row, index) {
  return <Link to={`/instances/${row.key}`}>{text}</Link>;
}

//去重
const status = uniq(data.map((record) => record.status));
let statusFilter = new Array();
status.forEach((value) => statusFilter.push({ text:value, value:value }));

const columns = [
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

export default class List extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedRowKeys: [],
      value: '',
      data: data,
    };
  }

  handleChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  handleCreateClick  = (event) => {
    event.preventDefault();
    this.context.router.push('/instances/new/step-1');
  };

  handleInputChange=(e)=> {
    this.setState({
      value: e.target.value,
    });
  };

  handleSearch = () => {
    const filterData = this.state.value == '' ?
      data : data.filter(da => includes(da.name, this.state.value));
    this.setState({
      data:filterData,
    });
  };

  render() {
    const menu = (
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

    const rowSelection = {
      onChange: this.handleChange,
    };
    const hasSelected = this.state.selectedRowKeys.length > 0;

    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!this.state.value.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'pull-right': true,
    });

    const showData = this.state.data;

    return (
      <div className="table-view">
        <div className="table-actions">
          <Button type="primary" size="large" onClick={this.handleCreateClick}>创建云主机</Button>
          <Button type="primary" size="large" disabled={!hasSelected}>Console</Button>
          <Button type="primary" size="large" disabled={!hasSelected}>开机</Button>
          <Button type="primary" size="large" disabled={!hasSelected}>关机</Button>
          <Dropdown overlay={menu} trigger={['click']}>
            <Button type="primary" size="large">更多</Button>
          </Dropdown>
          <Button type="primary" size="large">
            <Icon type="reload" />
          </Button>
          <InputGroup className={searchCls}>
            <Input placeholder="输入关键字" size="large"
                   value={this.state.value} onChange={this.handleInputChange} />
            <div className="ant-input-group-wrap">
              <Button className={btnCls} size="large" onClick={this.handleSearch}>
                <Icon type="search" />
              </Button>
            </div>
          </InputGroup>
        </div>
        <div className="table">
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={showData}
          />
        </div>
      </div>
    );
  }
}
