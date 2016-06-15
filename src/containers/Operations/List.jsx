import React from 'react';
import Button from 'antd/lib/button';
import Table from 'antd/lib/table';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import classNames from 'classnames';
import includes from '../../../node_modules/lodash/includes';
import uniq from '../../../node_modules/lodash/uniq';

import { fetchOperations, filterOperations } from '../../actions/operation';

const InputGroup = Input.Group;

function renderResource(resources) {
  return resources.reduce((prev, curr, index) => {
    prev.push(<Link key={curr.id} to={`/${curr.type}/${curr.id}`}>{curr.name}</Link>);

    if (index !== resources.length - 1) {
      prev.push(', ');
    }

    return prev;
  }, []);
}

function renderLink(text, row) {
  return <Link to={`/app/operations/${row.id}`}>{text}</Link>;
}

function getColumns(data) {
  const statusFilter = uniq(data.map(record => record.status))
    .map(st => ({ text: st, value: st }));

  return [
    { title: '操作', dataIndex: 'title', render: renderLink },
    { title: '资源', dataIndex: 'resource', render: renderResource },
    { title: '操作者', dataIndex: 'user' },
    { title: '状态', dataIndex: 'status', filters: statusFilter,
      onFilter(value, record) {
        return record.status === value;
      },
    },
    { title: '操作时间', dataIndex: 'timestamp' },
  ];
}

function loadData(props) {
  props.fetchOperations();
}

class List extends React.Component {
  static propTypes = {
    operation: React.PropTypes.shape({
      filter: React.PropTypes.string,
      list: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        data: React.PropTypes.arrayOf(React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          title: React.PropTypes.string.isRequired,
          status: React.PropTypes.string.isRequired,
          user: React.PropTypes.string.isRequired,
          timestamp: React.PropTypes.string.isRequired,
          resource: React.PropTypes.arrayOf(React.PropTypes.shape({
            id: React.PropTypes.string.isRequired,
            type: React.PropTypes.string.isRequired,
            name: React.PropTypes.string.isRequired,
          })).isRequired,
        })).isRequired,
      }).isRequired,
    }).isRequired,
    fetchOperations: React.PropTypes.func.isRequired,
    filterOperations: React.PropTypes.func.isRequired,
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

  getRowKey(operation) {
    return operation.id;
  }

  handleChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  handleCreateClick = (event) => {
    event.preventDefault();
    this.context.router.push('/app/operations/new/step-1');
  };

  handleReload = (e) => {
    e.preventDefault();
    loadData(this.props);
  };

  handleInputChange = (e) => {
    this.props.filterOperations(e.target.value);
  };

  renderOperation(rowSelection, columns, operation) {
    return (<Table
      rowKey={this.getRowKey}
      rowSelection={rowSelection}
      columns={columns}
      dataSource={operation.data}
      loading={operation.isFetching}
    />);
  }

  renderError(error) {
    return (
      <span>{error.message}</span>
    );
  }

  render() {
    const { operation } = this.props;
    const columns = getColumns(operation.list.data);
    const rowSelection = {
      onChange: this.handleChange,
    };
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!operation.filter.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'pull-right': true,
    });
    const operations = operation.list.error ?
      this.renderError(operation.list.error) :
      this.renderOperation(rowSelection, columns, operation.list);

    return (
      <div className="table-view">
        <div className="table-actions">
          <Button type="ghost" size="large" onClick={this.handleReload}>
            <Icon type="reload" />
          </Button>
          <InputGroup className={searchCls}>
            <Input
              placeholder="输入关键字" size="large"
              value={operation.filter} onChange={this.handleInputChange}
            />
            <div className="ant-input-group-wrap">
              <Button className={btnCls} size="large">
                <Icon type="search" />
              </Button>
            </div>
          </InputGroup>
        </div>
        <div className="table">
          {operations}
        </div>
      </div>
    );
  }
}

const getFilteredOperations = createSelector(
  state => state.operation.list.data,
  state => state.operation.filter,
  (listData, filter) => listData.filter(operation => includes(operation.title, filter))
);

function mapStateToProps(state) {
  return {
    operation: {
      ...state.operation,
      list: { ...state.operation.list, data: getFilteredOperations(state) },
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchOperations: () => dispatch(fetchOperations()),
    filterOperations: (filter) => dispatch(filterOperations(filter)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
