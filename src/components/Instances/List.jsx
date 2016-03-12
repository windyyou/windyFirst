import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import Table from 'antd/lib/table';
import Icon from 'antd/lib/icon';
import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';
import { Link } from 'react-router';

import data from '../../store/instances.json';

const MenuItem = Menu.Item;

function renderLink(text, row, index) {
  return <Link to={`/instances/${row.key}`}>{text}</Link>;
}

const columns = [
  { title: '名称', dataIndex: 'name', render: renderLink },
  { title: '状态', dataIndex: 'status' },
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
    };
  }

  handleChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  handleCreateClick  = (event) => {
    event.preventDefault();
    this.context.router.push('/instances/new/step-1');
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
        </div>
        <div className="table">
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
          />
        </div>
      </div>
    );
  }
}
