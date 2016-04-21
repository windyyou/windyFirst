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

import { fetchFirewalls, filterFirewalls } from '../../actions/firewall';

const InputGroup = Input.Group;

function renderLink(text, row) {
  return <Link to={`/firewalls/${row.id}`}>{text}</Link>;
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
    { title: '容量', dataIndex: 'describe' },
    { title: '创建时间', dataIndex: 'createdAt' },
  ];
}

function loadData(props) {
  props.fetchFirewalls();
}

class List extends React.Component {
  static propTypes = {
    firewall: React.PropTypes.shape({
      isFetching: React.PropTypes.bool.isRequired,
      error: React.PropTypes.object,
      filter: React.PropTypes.string,
      entities: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        status: React.PropTypes.string.isRequired,
        describe: React.PropTypes.string.isRequired,
        createdAt: React.PropTypes.string.isRequired,
      })),
    }),
    fetchFirewalls: React.PropTypes.func.isRequired,
    filterFirewalls: React.PropTypes.func.isRequired,
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

  getRowKey(firewall) {
    return firewall.id;
  }

  handleChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  handleCreateClick = (event) => {
    event.preventDefault();
    this.context.router.push('/instances/new/step-1');
  };

  handleInputChange = (e) => {
    this.props.filterFirewalls(e.target.value);
  };

  renderFirewall(rowSelection, columns, showData) {
    return (<Table
      rowKey={this.getRowKey}
      rowSelection={rowSelection}
      columns={columns}
      dataSource={showData}
      loading={this.props.firewall.isFetching}
    />);
  }

  renderError(error) {
    return (
      <span>{error.message}</span>
    );
  }

  render() {
    const { firewall } = this.props;
    const columns = getColumns(firewall.entities);
    const rowSelection = {
      onChange: this.handleChange,
    };
    const hasSelected = this.state.selectedRowKeys.length === 1;
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!firewall.filter.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'pull-right': true,
    });
    const firewalls = firewall.error ?
      this.renderError(firewall.error) :
      this.renderFirewall(rowSelection, columns, firewall.entities);

    return (
      <div className="table-view">
        <div className="table-actions">
          <Button
            type="primary"
            size="large"
            onClick={this.handleCreateClick}
          >
            创建防火墙
          </Button>
          <Button type="dashed" size="large" disabled={!hasSelected}>删除</Button>
          <Button type="ghost" size="large">
            <Icon type="reload" />
          </Button>
          <InputGroup className={searchCls}>
            <Input
              placeholder="输入关键字" size="large"
              value={firewall.filter} onChange={this.handleInputChange}
            />
            <div className="ant-input-group-wrap">
              <Button className={btnCls} size="large">
                <Icon type="search" />
              </Button>
            </div>
          </InputGroup>
        </div>
        <div className="table">
          {firewalls}
        </div>
      </div>
    );
  }
}

const getFilteredFirewalls = createSelector(
  state => state.firewall.entities,
  state => state.firewall.filter,
  (entities, filter) => entities.filter(firewall => includes(firewall.name, filter))
);

function mapStateToProps(state) {
  return {
    firewall: {
      ...state.firewall,
      entities: getFilteredFirewalls(state),
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchFirewalls: () => dispatch(fetchFirewalls()),
    filterFirewalls: (filter) => dispatch(filterFirewalls(filter)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
