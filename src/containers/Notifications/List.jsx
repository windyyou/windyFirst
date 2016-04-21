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

import { fetchNotifications, filterNotifications, putNotification } from '../../actions/notification';

const InputGroup = Input.Group;

function loadData(props) {
  props.fetchNotifications();
}

class List extends React.Component {
  static propTypes = {
    notification: React.PropTypes.shape({
      isFetching: React.PropTypes.bool.isRequired,
      error: React.PropTypes.object,
      filter: React.PropTypes.string,
      entities: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        type: React.PropTypes.string.isRequired,
        status: React.PropTypes.string.isRequired,
        createdAt: React.PropTypes.string.isRequired,
      })),
    }),

    // currentEntity: React.PropTypes.object.isRequired,
    fetchNotifications: React.PropTypes.func.isRequired,
    filterNotifications: React.PropTypes.func.isRequired,

    // putNotification: React.PropTypes.func.isRequired,
    route: React.PropTypes.object,
  };

  static contextTypes = {
    router: React.PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      selectedRowKeys: [],
    };
  }

  componentDidMount() {
    loadData(this.props);

    // this.context.router.setRouteLeaveHook(this.props.route, this.routerWillLeave);
  }

  getRowKey(notification) {
    return notification.id;
  }

/*  routerWillLeave = (nextLocation) => {
    // TODO check path
    const id = nextLocation.pathname.substring(nextLocation.pathname.lastIndexOf('/')+1, nextLocation.pathname.length);
    // TODO changeStatus action
    this.props.putNotification({...this.props.currentEntity, id: id, status: "已读"});
  }*/

  renderLink = (text, row) => {
    return <Link to={`/notifications/${row.id}`}>{text}</Link>;
  };

  renderBold = (text, row) => {
    let returnVal = '';
    if (row.status === '未读') {
      returnVal = <b>{text}</b>;
    } else {
      returnVal = `${text}`;
    }

    return returnVal;
  };

  getColumns = () => {
    return [
      { title: '类别', dataIndex: 'type', render: this.renderBold },
      { title: '标题', dataIndex: 'name', render: this.renderLink },
      { title: '状态', dataIndex: 'status', render: this.renderBold },
      { title: '创建时间', dataIndex: 'createdAt', render: this.renderBold },
    ];
  };

  handleClick = (id) =>
    () => {
      this.props.fetchNotification(id);
    };

  handleChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  handleInputChange = (e) => {
    this.props.filterNotifications(e.target.value);
  };

  handlePageChange = (noop) => {
    this.setState({
      ...this.state,
      currentPage: noop,
      selectedRowKeys: [],
    });
  };

  renderNotification(rowSelection, columns, showData, pagination) {
    return (<Table
      rowKey={this.getRowKey}
      rowSelection={rowSelection}
      pagination={pagination}
      columns={columns}
      dataSource={showData}
      loading={this.props.notification.isFetching}
    />);
  }

  renderError(error) {
    return (
      <span>{error.message}</span>
    );
  }

  render() {
    const { notification } = this.props;
    const columns = this.getColumns();
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.handleChange,
    };
    const pagination = {
      onChange: this.handlePageChange,
      current: this.state.currentPage,
    };

    const hasSelected = this.state.selectedRowKeys.length > 0;
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!notification.filter.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'pull-right': true,
    });
    const notifications = notification.error ?
      this.renderError(notification.error) :
      this.renderNotification(rowSelection, columns, notification.entities, pagination);

    return (
      <div className="table-view">
        <div className="table-actions">
          <Button type="ghost" size="large" disabled={!hasSelected}>标记为已读</Button>
          <Button type="ghost" size="large" disabled={!hasSelected}>标记为未读</Button>
          <Button type="ghost" size="large">
            <Icon type="reload" />
          </Button>
          <InputGroup className={searchCls}>
            <Input
              placeholder="输入关键字" size="large"
              value={notification.filter} onChange={this.handleInputChange}
            />
            <div className="ant-input-group-wrap">
              <Button className={btnCls} size="large">
                <Icon type="search" />
              </Button>
            </div>
          </InputGroup>
        </div>
        <div className="table">
          {notifications}
        </div>
      </div>
    );
  }
}

const getFilteredNotifications = createSelector(
  state => state.notification.entities,
  state => state.notification.filter,
  (entities, filter) => entities.filter(notification => includes(notification.name, filter))
);

function mapStateToProps(state) {
  return {
    notification: {
      ...state.notification,
      entities: getFilteredNotifications(state),
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchNotifications: () => dispatch(fetchNotifications()),
    filterNotifications: (filter) => dispatch(filterNotifications(filter)),

    // putNotification: (params) => dispatch(putNotification(params)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
