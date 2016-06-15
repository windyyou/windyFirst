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

import { fetchVolumes, filterVolumes, deleteVolume } from '../../actions/volume';

const InputGroup = Input.Group;
const MenuItem = Menu.Item;

function renderLink(text, row) {
  return <Link to={`/app/volumes/${row.id}`}>{text}</Link>;
}

function renderInstances(resources) {
  const prop = resources.filter(resource => resource);

  return prop.reduce((prev, curr, index) => {
    prev.push(<Link key={curr.id} to={`/app/instances/${curr.id}`}>{curr.name}</Link>);

    if (index !== prop.length - 1) {
      prev.push(', ');
    }

    return prev;
  }, []);
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
    { title: '挂载到主机', dataIndex: 'instances', render: renderInstances },
    { title: '创建时间', dataIndex: 'createdAt' },
  ];
}

function loadData(props) {
  props.fetchVolumes();
}

class List extends React.Component {
  static propTypes = {
    volume: React.PropTypes.shape({
      filter: React.PropTypes.string,
      list: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        data: React.PropTypes.arrayOf(React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
          size: React.PropTypes.string.isRequired,
          status: React.PropTypes.string.isRequired,
          type: React.PropTypes.string,
          instances: React.PropTypes.arrayOf(React.PropTypes.shape({
            id: React.PropTypes.string.isRequired,
            name: React.PropTypes.string.isRequired,
          })).isRequired,
          createdAt: React.PropTypes.string.isRequired,
        })).isRequired,
      }).isRequired,
    }).isRequired,
    fetchVolumes: React.PropTypes.func.isRequired,
    filterVolumes: React.PropTypes.func.isRequired,
    deleteVolume: React.PropTypes.func.isRequired,
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

  getMenu(mounted, hasSelected) {
    return (
      <Menu>
        <MenuItem key="1" disabled={!mounted} >
          <a href="#">卸载</a>
        </MenuItem>
        <MenuItem key="2">
          <a href="#">备份</a>
        </MenuItem>
        <MenuItem key="3" disabled={!hasSelected}>
          <Popconfirm title="确定要删除这个硬盘吗？" onConfirm={this.handleDelete}>
            <a href="">删除</a>
          </Popconfirm>
        </MenuItem>
      </Menu>
    );
  }

  getRowKey(volume) {
    return volume.id;
  }

  handleDelete = () => {
    this.props.deleteVolume(this.state.selectedRows[0].id);
    this.setState({ ...this.state, selectedRows: [] });
    this.context.router.push('/app/volumes/');
  };

  handleChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRows });
  };

  handleCreateClick = (event) => {
    event.preventDefault();
    this.context.router.push('/app/volumes/new');
  };

  handleReload = (e) => {
    e.preventDefault();
    loadData(this.props);
  };

  handleInputChange = (e) => {
    this.props.filterVolumes(e.target.value);
  };

  renderVolume(rowSelection, columns, volume) {
    return (<Table
      rowKey={this.getRowKey}
      rowSelection={rowSelection}
      columns={columns}
      dataSource={volume.data}
    />);
  }

  renderFetching(rowSelection, columns, volume) {
    return (
      <Table
        rowKey={this.getRowKey}
        rowSelection={rowSelection}
        columns={columns}
        loading={volume.isFetching}
      />
    );
  }

  renderError(error) {
    return (
      <span>{error.message}</span>
    );
  }

  render() {
    const { volume } = this.props;
    const { selectedRows } = this.state;
    const hasSelected = selectedRows.length === 1;
    const mounted = hasSelected && selectedRows[0].instances.length > 0;
    const menu = this.getMenu(mounted, hasSelected);
    const columns = getColumns(volume.list.data);
    const rowSelection = {
      onChange: this.handleChange,
    };
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!volume.filter.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'pull-right': true,
    });
    const volumes = volume.error ?
      this.renderError(volume.error) :
      this.renderVolume(rowSelection, columns, volume.list);

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
          <Button type="ghost" size="large" onClick={this.handleReload}>
            <Icon type="reload" />
          </Button>
          <InputGroup className={searchCls}>
            <Input
              placeholder="输入关键字" size="large"
              value={volume.filter} onChange={this.handleInputChange}
            />
            <div className="ant-input-group-wrap">
              <Button className={btnCls} size="large">
                <Icon type="search" />
              </Button>
            </div>
          </InputGroup>
        </div>
        <div className="table">
          {volume.isFetching ? this.renderFetching(rowSelection, columns, volume) : volumes}
        </div>
      </div>
    );
  }
}

const getFilteredVolumes = createSelector(
  state => state.volume.list.data,
  state => state.volume.filter,
  (listData, filter) => listData.filter(volume => includes(volume.name, filter))
);

function mapStateToProps(state) {
  return {
    volume: {
      ...state.volume,
      list: { ...state.volume.list, data: getFilteredVolumes(state) },
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchVolumes: () => dispatch(fetchVolumes()),
    filterVolumes: (filter) => dispatch(filterVolumes(filter)),
    deleteVolume: (id) => dispatch(deleteVolume(id)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
