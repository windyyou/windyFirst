import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Form from 'antd/lib/form';
import Select from 'antd/lib/select';
import Radio from 'antd/lib/radio';
import Button from 'antd/lib/button';
import Spin from 'antd/lib/spin';

import FormButtonArea from '../../common/FormButtonArea';
import classNames from 'classnames';

import { dict } from '../../../utils/data';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class Step3 extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    spec: React.PropTypes.object.isRequired,
    alarm: React.PropTypes.object.isRequired,
    notificationList: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
    handleSpecChange: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      formEditing: false,
      status: '',
      to: '',
    };
  }

  handleAddClick = () => {
    this.setState({
      ...this.state,
      formEditing: true,
    });
  };

  handleStatusChange = value => {
    this.setState({
      ...this.state,
      status: value,
    });
  };

  handleToChange = value => {
    this.setState({
      ...this.state,
      to: value,
    });
  };

  handleSaveClick = () => {
    // 判断state是否有值，无值的情况下设置初始值
    const statusConfig = this.props.alarm.config.data.status.length > 0 ?
      this.props.alarm.config.data.status[0].value : '';
    const status = this.state.status === '' ? statusConfig : this.state.status;
    const notificationLists = this.props.notificationList.list.data.length > 0 ?
      this.props.notificationList.list.data[0].id : '';
    const to = this.state.to === '' ? notificationLists : this.state.to;

    // const createAt = new Date().toString();

    this.setState({
      ...this.state,
      status,
      to,
      formEditing: false,
    });

    const notifications = this.props.spec.notifications.slice(0);
    notifications.push({
      status,
      to,

      // createAt,
    });

    const event = {
      target: {
        name: 'notifications',
        value: notifications,
      },
    };
    this.props.handleSpecChange(event);
  };

  handleCancelClick = e => {
    e.preventDefault();

    this.setState({
      ...this.state,
      formEditing: false,
    });
  };

  handleDeleteClick = index => () => {
    const notifications = this.props.spec.notifications.slice(0);
    notifications.splice(index, 1);

    const event = {
      target: {
        name: 'notifications',
        value: notifications,
      },
    };
    this.props.handleSpecChange(event);
  };

  handleSubmit = e => {
    this.props.form.validateFields(errors => {
      if (!!errors) {
        return;
      }

      this.props.handleSubmit(e);
    });
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

  renderStatusSelect(alarm) {
    const defaultVal = alarm.config.data.status.length > 0 ?
      alarm.config.data.status[0].value : '';
    return (
      <Select
        style={{ width: '110px' }}
        defaultValue={defaultVal}
        onChange={this.handleStatusChange}
      >
        {alarm.config.data.status.map(data =>
          <Option key={data.value}>{data.name}</Option>
        )}
      </Select>
    );
  }

  renderNotificationListSelect(notificationList) {
    const defaultVal = notificationList.list.data.length > 0 ?
      notificationList.list.data[0].id : '';
    return (
      <Select
        style={{ width: '110px' }}
        defaultValue={defaultVal}
        onChange={this.handleToChange}
      >
        {notificationList.list.data.map(data =>
          <Option key={data.id}>{data.name}</Option>
        )}
      </Select>
    );
  }

  renderNotification() {
    const { spec, notificationList, alarm } = this.props;
    const formEditing = this.state.formEditing;

    let status = '';
    let notificationLists = '';

    if (notificationList.list.isFetching) {
      notificationLists = this.renderFetching();
    } else if (!!notificationList.list.error) {
      notificationLists = this.renderError(notificationList.list.error);
    } else {
      notificationLists = this.renderNotificationListSelect(notificationList);
    }

    if (alarm.config.isFetching) {
      status = this.renderFetching();
    } else if (!!alarm.config.error) {
      status = this.renderError(alarm.config.error);
    } else {
      status = this.renderStatusSelect(alarm);
    }

    return (
      <div>
        <Form inline form={this.props.form}>
          <Row className={classNames({ hide: formEditing }, 'add-item')}>
            <FormItem>
              <Button
                type="primary"
                onClick={this.handleAddClick}
              >
                添加报警通知
              </Button>
            </FormItem>
          </Row>
          <Row className={classNames({ hide: !formEditing }, 'add-item')}>
            <FormItem>
              {status}
            </FormItem>
            <FormItem>
              <span>发送通知给</span>
            </FormItem>
            <FormItem>
              {notificationLists}
            </FormItem>
            <FormItem>
              <a
                className={classNames('save')}
                onClick={this.handleSaveClick}
              >
                <i className={classNames('portalicon', 'portalicon-save', 'save')}></i>
              </a>
              <a
                className={classNames('cancel')}
                onClick={this.handleCancelClick}
              >
                <i className={classNames('portalicon', 'portalicon-cancel', 'cancel')}></i>
              </a>
            </FormItem>
          </Row>
        </Form>
        <div className="list-item">
          <Row type="flex" justify="center" className="header">
            <Col span="6">触发状态</Col>
            <Col span="4">触发行为</Col>
            <Col span="6">通知列表</Col>
            <Col span="4">创建时间</Col>
            <Col span="4">操作</Col>
          </Row>
        </div>
        <div>
            {spec.notifications.map((data, i) =>
              <Row key={i} type="flex" justify="center" className="list-data">
                <Col span="6">
                  <span>{dict(data.status, alarm.config.data.status, 'value', 'name')}</span>
                </Col>
                <Col span="4">发送通知</Col>
                <Col span="6">
                  <span>{dict(data.to, notificationList.list.data, 'value', 'name')}</span>
                </Col>
                <Col span="4">{data.createAt}</Col>
                <Col span="4">
                  <a
                    className="delete"
                    href="#"
                    onClick={this.handleDeleteClick(i)}
                  >
                    <i className={classNames('portalicon', 'portalicon-delete', 'delete')}></i>
                  </a>
                </Col>
              </Row>)}
        </div>
      </div>
    );
  }

  render() {
    const { spec } = this.props;
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8, offset: 1 },
    };

    return (
      <div>
        <div className="form-area">
          <Form horizontal form={this.props.form}>
            <FormItem {...formItemLayout} className="textAlignLeft" label="发送通知:">
              <RadioGroup
                name="isSend"
                value={spec.isSend}
                onChange={this.props.handleSpecChange}
              >
                <Radio name="isSend" value="Y">是</Radio>
                <Radio name="isSend" value="N">否</Radio>
              </RadioGroup>
            </FormItem>
          </Form>
            {spec.isSend === 'Y' ?
              this.renderNotification() : ''}
        </div>
        <Form horizontal form={this.props.form}>
          <FormButtonArea {...this.props} handleSubmit={this.handleSubmit} />
        </Form>
      </div>
    );
  }
}

export default Form.create()(Step3);
