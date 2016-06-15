import React from 'react';
import { Link } from 'react-router';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Select from 'antd/lib/select';
import classNames from 'classnames';
import { Form, Button } from 'antd';
import Popconfirm from 'antd/lib/popconfirm';
import Spin from 'antd/lib/spin';

const FormItem = Form.Item;

export default class Notifications extends React.Component {
  static propTypes = {
    notificationList: React.PropTypes.shape({
      list: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        data: React.PropTypes.arrayOf(React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
        })).isRequired,
      }).isRequired,
    }).isRequired,
    alarm: React.PropTypes.shape({
      config: React.PropTypes.shape({
        data: React.PropTypes.shape({
          status: React.PropTypes.arrayOf(React.PropTypes.shape({
            name: React.PropTypes.string.isRequired,
            value: React.PropTypes.string.isRequired,
          })).isRequired,
        }).isRequired,
      }).isRequired,
      current: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        data: React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          notifications: React.PropTypes.arrayOf(React.PropTypes.shape({
            id: React.PropTypes.string.isRequired,
            status: React.PropTypes.string.isRequired,
            notificationList: React.PropTypes.shape({
              id: React.PropTypes.string.isRequired,
              name: React.PropTypes.string.isRequired,
            }),
          })).isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
    addAlarmNotification: React.PropTypes.func.isRequired,
    deleteAlarmNotification: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      formEditing: false,
      status: '',
      list: '',
    };
  }

  handleAddClick = () => {
    this.setState({
      ...this.state,
      formEditing: true,
    });
  };

  handleSaveClick = (e) => {
    e.preventDefault();

    const pid = this.props.alarm.current.data.id;
    const status = this.state.status === '' ?
      this.props.alarm.config.data.status[0].value : this.state.status;
    const params = this.state.list.map(notificationId => ({
      pid,
      status,
      notificationId,
    }));
    this.props.addAlarmNotification(params);
    this.setState({
      ...this.state,
      formEditing: false,
    });
  };

  handleCancelClick = (e) => {
    e.preventDefault();

    this.setState({
      ...this.state,
      formEditing: false,
    });
  };

  handleDeleteClick = (id) => () => {
    const pid = this.props.alarm.current.data.id;
    this.props.deleteAlarmNotification({ pid, id });
  };

  handleSelectStatus = (value) => {
    this.setState({
      ...this.state,
      status: value,
    });
  };

  handleSelectList = (value) => {
    this.setState({
      ...this.state,
      list: value,
    });
  };

  renderNotices(current) {
    const notices = current.data.notifications;
    return (
      <div>
        {notices.map((notice, i) => <Row key={i}>
          <Col span="4">{notice.status}</Col>
          <Col span="5">{notice.action}</Col>
          <Col span="4">
            <Link to={`/app/notification-lists/${notice.notificationList.id}`}>
              {notice.notificationList.name}
            </Link>
          </Col>
          <Col span="6">{notice.createdAt}</Col>
          <Col span="1">
            <a className="delete">
              <Popconfirm
                title="确定删除通知列表"
                okText="删除"
                cancelText="取消"
                onConfirm={this.handleDeleteClick(notice.id)}
              >
                <i className={ classNames('portalicon', 'portalicon-delete', 'delete') }></i>
              </Popconfirm>
            </a>
          </Col>
        </Row>)}
      </div>
    );
  }

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

  renderAddNotificationForm() {
    const notificationList = this.props.notificationList.list.data;
    const status = this.props.alarm.config.data.status;
    const statusOperation = status.map(data =>
      <Option key={data.value}>{data.name}</Option>
    );
    const formEditing = this.state.formEditing;

    return (
      <div className="basic-info">
        <Row className={classNames({ hide: formEditing }, 'rowHeight')}>
          <Button
            type="primary"
            size="large"
            onClick={this.handleAddClick}
          >
            添加通知列表
          </Button>
        </Row>
        <Form inline>
          <Row className={classNames({ hide: !formEditing }, 'rowHeight')}>
            <FormItem>
              <Select
                style={{ width: '80px' }}
                defaultValue={status[0].name}
                onChange={this.handleSelectStatus}
              >
                {statusOperation}
              </Select>
            </FormItem>
            <FormItem>
              <span className="verticalCenter">发送通知给</span>
            </FormItem>
            <FormItem>
              <Select
                multiple
                style={{ width: 300 }}
                onChange={this.handleSelectList}
                placeholder="请选择通知列表"
              >
                {notificationList.map((list) =>
                  <Option key={list.id} value={list.id}>{list.name}</Option>
                )}
              </Select>
              <a
                className={ classNames('save') }
                onClick={this.handleSaveClick}
              >
                <i className={ classNames('portalicon', 'portalicon-save', 'save') }></i>
              </a>
              <a
                className={ classNames('cancel') }
                onClick={this.handleCancelClick}
              >
                <i className={ classNames('portalicon', 'portalicon-cancel', 'cancel') }></i>
              </a>
            </FormItem>
          </Row>
        </Form>
      </div>
    );
  }

  render() {
    const { alarm } = this.props;
    const config = this.props.alarm.config;
    let addConfigs = '';
    if (alarm.config.isFetching) {
      addConfigs = this.renderFetching();
    } else if (!!alarm.config.error) {
      addConfigs = this.renderError(alarm.config.error);
    } else {
      addConfigs = config.data.status.length > 0 ?
        this.renderAddNotificationForm() : this.renderFetching();
    }

    const current = this.props.alarm.current;
    const showNotices = current.error ?
      this.renderError(current.error) :
      this.renderNotices(current);

    return (
      <div className="instance-snapshots">
        {addConfigs}
        <div className="instance-snapshots-header">
          <Row>
            <Col span="4">触发状态</Col>
            <Col span="5">触发行为</Col>
            <Col span="4">通知列表</Col>
            <Col span="6">创建时间</Col>
            <Col span="4">操作</Col>
            <Col span="1" />
          </Row>
        </div>
        <div className="alarm-basic-info">
          {current.isFetching ? this.renderFetching() : showNotices}
        </div>
      </div>
    );
  }
}
