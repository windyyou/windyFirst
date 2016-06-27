import React from 'react';
import uniq from '../../../node_modules/lodash/uniq';
import classNames from 'classnames';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Popconfirm from 'antd/lib/popconfirm';
import Input from 'antd/lib/input';
import Icon from 'antd/lib/icon';
import { Link } from 'react-router';
import Spin from 'antd/lib/spin';

const InputGroup = Input.Group;

export default class Stack extends React.Component {
  static propTypes = {
    stack: React.PropTypes.shape({
      filter: React.PropTypes.string,
      list: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        data: React.PropTypes.arrayOf(React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
          status: React.PropTypes.string.isRequired,
          createdAt: React.PropTypes.string.isRequired,
          updatedAt: React.PropTypes.string,
        })).isRequired,
      }).isRequired,
    }).isRequired,
    fetchStacks: React.PropTypes.func.isRequired,
    filterStacks: React.PropTypes.func.isRequired,
    deleteStack: React.PropTypes.func.isRequired,
    pool: React.PropTypes.object.isRequired,
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

  getRowKey(record) {
    return record.id;
  }

  getColumns(data) {
    const statusFilter = uniq(data.map(record => record.status))
      .map(st => ({ text: st, value: st }));

    return [
      { title: '名称', dataIndex: 'name', render: this.renderLink },
      { title: '状态', dataIndex: 'status', filters: statusFilter,
        onFilter(value, record) {
          return record.status === value;
        },
      },
      { title: '创建时间', dataIndex: 'createdAt' },
      { title: '更新时间', dataIndex: 'updatedAt' },
    ];
  }

  handleDelete = () => {
    this.props.deleteStack(this.state.selectedRowKeys[0]);
    this.setState({ ...this.state, selectedRowKeys: [] });
    this.context.router.push('/app/stacks');
  };

  handleChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  handleCreateClick = event => {
    event.preventDefault();
    const poolId = !this.props.pool.list.isFetching ? this.props.pool.list.data[0].id : '';
    this.context.router.push(`/app/pools/${poolId}/stacks/new/step-1`);
  };

  handleInputChange = e => {
    this.props.filterStacks(e.target.value);
  };

  renderLink = (text, stack) => {
    const poolId = this.props.pool.list.data[0].id;
    return <Link to={`/app/pools/${poolId}/stacks/${stack.id}`}>{text}</Link>;
  };

  renderFetching() {
    return (
      <Spin size="default" />
    );
  }

  renderError(error) {
    return (
      <span>{error.message}</span>
    );
  }

  renderStack(rowSelection, columns, stack) {
    return (<Table
      rowKey={this.getRowKey}
      rowSelection={rowSelection}
      columns={columns}
      dataSource={stack.list.data}
      loading={stack.list.isFetching}
    />);
  }

  render() {
    const { stack } = this.props;
    const columns = this.getColumns(stack.list.data);
    const rowSelection = {
      onChange: this.handleChange,
    };
    const hasSelected = this.state.selectedRowKeys.length === 1;
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!stack.filter.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'pull-right': true,
    });

    const stacks = stack.list.error ?
      this.renderError(stack.list.error) :
      this.renderStack(rowSelection, columns, stack);

    return (
      <div className="template-table-view">
        <div className="table-actions">
          <Button
            type="primary"
            size="large"
            onClick={this.handleCreateClick}
          >创建模板
          </Button>
          <Button
            type="ghost"
            size="large"
            disabled={!hasSelected}
          >挂起</Button>
          <Button
            type="ghost"
            size="large"
            disabled={!hasSelected}
          >恢复</Button>
          <Popconfirm title="确定要删除这个模板吗？" onConfirm={this.handleDelete}>
            <Button type="dashed" size="large" disabled={!hasSelected}>删除</Button>
          </Popconfirm>
          <Button type="ghost" size="large" onClick={this.props.fetchStacks}>
            <Icon type="reload" />
          </Button>
          <InputGroup className={searchCls}>
            <Input
              placeholder="输入关键字" size="large"
              value={stack.filter} onChange={this.handleInputChange}
            />
            <div className="ant-input-group-wrap">
              <Button className={btnCls} size="large">
                <Icon type="search" />
              </Button>
            </div>
          </InputGroup>
        </div>
        <div className="table">
          {stacks}
        </div>
      </div>
    );
  }
}
