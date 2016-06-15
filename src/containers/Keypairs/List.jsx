import React from 'react';
import Button from 'antd/lib/button';
import Table from 'antd/lib/table';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Popconfirm from 'antd/lib/popconfirm';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import classNames from 'classnames';
import includes from '../../../node_modules/lodash/includes';

import { fetchKeypairs, filterKeypairs, deleteKeypair } from '../../actions/keypair';

const InputGroup = Input.Group;

function getColumns() {
  return [
    { title: '名称', dataIndex: 'name' },
    { title: '指纹', dataIndex: 'fingerprint' },
    { title: '创建时间', dataIndex: 'createdAt' },
  ];
}

function loadData(props) {
  props.fetchKeypairs();
}

class List extends React.Component {
  static propTypes = {
    keypair: React.PropTypes.shape({
      filter: React.PropTypes.string,
      list: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        data: React.PropTypes.arrayOf(React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
          fingerprint: React.PropTypes.string.isRequired,
          createdAt: React.PropTypes.string.isRequired,
        })).isRequired,
      }),
    }),
    fetchKeypairs: React.PropTypes.func.isRequired,
    filterKeypairs: React.PropTypes.func.isRequired,
    deleteKeypair: React.PropTypes.func.isRequired,
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

  getRowKey(keypair) {
    return keypair.id;
  }

  handleDelete = () => {
    this.props.deleteKeypair(this.state.selectedRowKeys[0]);
    this.setState({ ...this.state, selectedRowKeys: [] });
    this.context.router.push('/app/keypairs/');
  };

  handleChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  handleCreateClick = (event) => {
    event.preventDefault();
  };

  handleReload = (e) => {
    e.preventDefault();
    loadData(this.props);
  };

  handleInputChange = (e) => {
    this.props.filterKeypairs(e.target.value);
  };

  renderKeypair(rowSelection, columns, showData) {
    return (<Table
      rowKey={this.getRowKey}
      rowSelection={rowSelection}
      columns={columns}
      dataSource={showData}
    />);
  }

  renderFetching(rowSelection, columns, keypair) {
    return (
      <Table
        rowKey={this.getRowKey}
        rowSelection={rowSelection}
        columns={columns}
        loading={keypair.list.isFetching}
      />
    );
  }

  renderError(error) {
    return (
      <span>{error.message}</span>
    );
  }

  render() {
    const { keypair } = this.props;
    const { selectedRowKeys } = this.state;
    const hasSelected = selectedRowKeys.length === 1;
    const columns = getColumns(keypair.list.data);
    const rowSelection = {
      onChange: this.handleChange,
    };
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!keypair.filter.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'pull-right': true,
    });
    const keypairs = keypair.error ?
      this.renderError(keypair.error) :
      this.renderKeypair(rowSelection, columns, keypair.list.data);

    return (
      <div className="table-view">
        <div className="table-actions">
          <Button type="primary" size="large" onClick={this.handleCreateClick}>创建密钥</Button>
          <Popconfirm title="确定要删除这个密钥吗？" onConfirm={this.handleDelete}>
            <Button type="dashed" size="large" disabled={!hasSelected}>删除</Button>
          </Popconfirm>
          <Button type="ghost" size="large" onClick={this.handleReload}>
            <Icon type="reload" />
          </Button>
          <InputGroup className={searchCls}>
            <Input
              placeholder="输入关键字" size="large"
              value={keypair.filter} onChange={this.handleInputChange}
            />
            <div className="ant-input-group-wrap">
              <Button className={btnCls} size="large">
                <Icon type="search" />
              </Button>
            </div>
          </InputGroup>
        </div>
        <div className="table">
          {keypairs}
        </div>
      </div>
    );
  }
}

const getFilteredKeypairs = createSelector(
  state => state.keypair.list.data,
  state => state.keypair.filter,
  (listData, filter) => listData.filter(keypair => includes(keypair.name, filter))
);

function mapStateToProps(state) {
  return {
    keypair: {
      ...state.keypair,
      list: { ...state.keypair.list, data: getFilteredKeypairs(state) },
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchKeypairs: () => dispatch(fetchKeypairs()),
    filterKeypairs: (filter) => dispatch(filterKeypairs(filter)),
    deleteKeypair: (id) => dispatch(deleteKeypair(id)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
