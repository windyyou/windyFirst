import React from 'react';
import Button from 'antd/lib/button';
import Table from 'antd/lib/table';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Popconfirm from 'antd/lib/popconfirm';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import classNames from 'classnames';
import includes from '../../../node_modules/lodash/includes';

import {
  fetchSecurityGroups,
  filterSecurityGroups,
  deleteSecurityGroup,
} from '../../actions/securityGroup';

const InputGroup = Input.Group;

function renderLink(text, row) {
  return <Link to={`/app/security-groups/${row.id}`}>{text}</Link>;
}

function getColumns() {
  return [
    { title: '名称', dataIndex: 'name', render: renderLink },
    { title: '描述', dataIndex: 'description' },
    { title: '创建时间', dataIndex: 'createdAt' },
  ];
}

function loadData(props) {
  props.fetchSecurityGroups();
}

class List extends React.Component {
  static propTypes = {
    securityGroup: React.PropTypes.shape({
      filter: React.PropTypes.string,
      list: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        data: React.PropTypes.arrayOf(React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
          description: React.PropTypes.string.isRequired,
          createdAt: React.PropTypes.string.isRequired,
        })),
      }),
    }),
    fetchSecurityGroups: React.PropTypes.func.isRequired,
    filterSecurityGroups: React.PropTypes.func.isRequired,
    deleteSecurityGroup: React.PropTypes.func.isRequired,
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

  getRowKey(securityGroup) {
    return securityGroup.id;
  }

  handleDelete = () => {
    this.props.deleteSecurityGroup(this.state.selectedRowKeys[0]);
    this.setState({ ...this.state, selectedRowKeys: [] });
    this.context.router.push('/app/security-groups/');
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
    this.props.filterSecurityGroups(e.target.value);
  };

  renderSecurityGroup(rowSelection, columns, showData) {
    return (<Table
      rowKey={this.getRowKey}
      rowSelection={rowSelection}
      columns={columns}
      dataSource={showData}
      loading={this.props.securityGroup.list.isFetching}
    />);
  }

  renderError(error) {
    return (
      <span>{error.message}</span>
    );
  }

  render() {
    const { securityGroup } = this.props;
    const columns = getColumns();
    const rowSelection = {
      getCheckboxProps(record) {
        return {
          disabled: record.name === 'default',
        };
      },

      onChange: this.handleChange,
    };
    const hasSelected = this.state.selectedRowKeys.length === 1;
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!securityGroup.filter.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'pull-right': true,
    });
    const securityGroups = securityGroup.list.error ?
      this.renderError(securityGroup.list.error) :
      this.renderSecurityGroup(rowSelection, columns, securityGroup.list.data);

    return (
      <div className="table-view">
        <div className="table-actions">
          <Button
            type="primary"
            size="large"
            onClick={this.handleCreateClick}
          >
            创建安全组
          </Button>
          <Popconfirm title="确定要删除这个监控吗？" onConfirm={this.handleDelete}>
            <Button type="dashed" size="large" disabled={!hasSelected}>删除</Button>
          </Popconfirm>
          <Button type="ghost" size="large" onClick={this.handleReload}>
            <Icon type="reload" />
          </Button>
          <InputGroup className={searchCls}>
            <Input
              placeholder="输入关键字" size="large"
              value={securityGroup.filter} onChange={this.handleInputChange}
            />
            <div className="ant-input-group-wrap">
              <Button className={btnCls} size="large">
                <Icon type="search" />
              </Button>
            </div>
          </InputGroup>
        </div>
        <div className="table">
          {securityGroups}
        </div>
      </div>
    );
  }
}

const getFilteredSecurityGroups = createSelector(
  state => state.securityGroup.list.data,
  state => state.securityGroup.filter,
  (listData, filter) => listData.filter(securityGroup => includes(securityGroup.name, filter))
);

function mapStateToProps(state) {
  return {
    securityGroup: {
      ...state.securityGroup,
      list: { ...state.securityGroup.list, data: getFilteredSecurityGroups(state) },
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchSecurityGroups: () => dispatch(fetchSecurityGroups()),
    filterSecurityGroups: (filter) => dispatch(filterSecurityGroups(filter)),
    deleteSecurityGroup: (id) => dispatch(deleteSecurityGroup(id)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
