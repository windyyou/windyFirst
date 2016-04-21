import React from 'react';
import Button from 'antd/lib/button';
import Table from 'antd/lib/table';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import classNames from 'classnames';
import includes from '../../../node_modules/lodash/includes';

import { fetchKeypairs, filterKeypairs } from '../../actions/keypair';

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
      isFetching: React.PropTypes.bool.isRequired,
      error: React.PropTypes.object,
      filter: React.PropTypes.string,
      entities: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        fingerprint: React.PropTypes.string.isRequired,
        createdAt: React.PropTypes.string.isRequired,
      })).isRequired,
    }),
    fetchKeypairs: React.PropTypes.func.isRequired,
    filterKeypairs: React.PropTypes.func.isRequired,
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

  handleChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  handleCreateClick = (event) => {
    event.preventDefault();
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
        loading={keypair.isFetching}
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
    const columns = getColumns(keypair.entities);
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
      this.renderKeypair(rowSelection, columns, keypair.entities);

    return (
      <div className="table-view">
        <div className="table-actions">
          <Button type="primary" size="large" onClick={this.handleCreateClick}>创建密钥</Button>
          <Button type="dashed" size="large" disabled={!hasSelected} >删除</Button>
          <Button type="ghost" size="large">
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
          {keypair.isFetching ? this.renderFetching(rowSelection, columns, keypair) : keypairs}
        </div>
      </div>
    );
  }
}

const getFilteredKeypairs = createSelector(
  state => state.keypair.entities,
  state => state.keypair.filter,
  (entities, filter) => entities.filter(keypair => includes(keypair.name, filter))
);

function mapStateToProps(state) {
  return {
    keypair: {
      ...state.keypair,
      entities: getFilteredKeypairs(state),
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchKeypairs: () => dispatch(fetchKeypairs()),
    filterKeypairs: (filter) => dispatch(filterKeypairs(filter)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
