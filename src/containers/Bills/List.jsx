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

import { fetchBills, filterBills } from '../../actions/bill';

import AbstractList from '../AbstractList';

const InputGroup = Input.Group;

function renderLink(text, row) {
  return <Link to={`/app/bills/${row.userId}`}>{text}</Link>;
}

function getColumns() {
  return [
    { title: '用户名', dataIndex: 'userName' },
    { title: '消费金额', dataIndex: 'consumption', render: renderLink },
    { title: '创建时间', dataIndex: 'createdAt' },
  ];
}

class List extends AbstractList {
  static propTypes = {
    bill: React.PropTypes.shape({
      filter: React.PropTypes.string,
      list: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        data: React.PropTypes.arrayOf(React.PropTypes.shape({
          userId: React.PropTypes.string.isRequired,
          userName: React.PropTypes.string.isRequired,
          consumption: React.PropTypes.number.isRequired,
          createdAt: React.PropTypes.string.isRequired,
        })).isRequired,
      }).isRequired,
    }).isRequired,
    fetchBills: React.PropTypes.func.isRequired,
    filterBills: React.PropTypes.func.isRequired,
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

  loadData(props) {
    props.fetchBills();
  }

  getRowKey(bill) {
    return bill.userId;
  }

  handleChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  handleInputChange = e => {
    this.props.filterBills(e.target.value);
  };

  handleReload = e => {
    e.preventDefault();
    this.loadData(this.props);
  };

  renderBill(rowSelection, columns, bill) {
    return (<Table
      rowKey={this.getRowKey}
      rowSelection={rowSelection}
      columns={columns}
      dataSource={bill.data}
      loading={bill.isFetching}
    />);
  }

  renderError(error) {
    return (
      <span>{error.message}</span>
    );
  }

  render() {
    const { bill } = this.props;
    const columns = getColumns();
    const rowSelection = {
      onChange: this.handleChange,
    };
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!bill.filter.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'pull-right': true,
    });
    const bills = bill.error ?
      this.renderError(bill.error) :
      this.renderBill(rowSelection, columns, bill.list);

    return (
      <div className="table-view">
        <div className="table-actions">
          <Button type="ghost" size="large" onClick={this.handleReload}>
            <Icon type="reload" />
          </Button>
          <InputGroup className={searchCls}>
            <Input
              placeholder="输入关键字" size="large"
              value={bill.filter} onChange={this.handleInputChange}
            />
            <div className="ant-input-group-wrap">
              <Button className={btnCls} size="large">
                <Icon type="search" />
              </Button>
            </div>
          </InputGroup>
        </div>
        <div className="table">
          {bills}
        </div>
      </div>
    );
  }
}

const getFilteredBills = createSelector(
  state => state.bill.list.data,
  state => state.bill.filter,
  (listData, filter) => listData.filter(bill => includes(bill.userName, filter))
);

function mapStateToProps(state) {
  return {
    bill: {
      ...state.bill,
      list: { ...state.bill.list, data: getFilteredBills(state) },
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchBills: () => dispatch(fetchBills()),
    filterBills: filter => dispatch(filterBills(filter)),
    refresh: () => dispatch(fetchBills(undefined, true)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
