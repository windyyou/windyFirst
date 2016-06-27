import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';

import classNames from 'classnames';
import lodashValues from 'lodash/values';

export default class TerminalList extends React.Component {
  static propTypes = {
    notificationList: React.PropTypes.shape({
      current: React.PropTypes.shape({
        data: React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          terminals: React.PropTypes.arrayOf(React.PropTypes.shape({
            id: React.PropTypes.string.isRequired,
            type: React.PropTypes.string.isRequired,
            content: React.PropTypes.string.isRequired,
            verified: React.PropTypes.bool.isRequired,
          })).isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
    deleteNotificationListTerminal: React.PropTypes.func.isRequired,
    createNotificationListTerminal: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const timers = this.setTimersInitState();
    this.state = {
      formEditing: false,
      inputType: 'EMail',
      inputValue: '',
      timers,
    };
  }

  componentWillUnmount() {
    lodashValues(this.state.timers).forEach(idTimer => {
      clearInterval(idTimer.timer);
    });
  }

  setTimersInitState = () => {
    const terminals = this.props.notificationList.current.data.terminals;
    const timers = {};
    terminals.forEach(terminal => {
      if (!terminal.verified) {
        timers[terminal.id] = {
          seconds: 0,
        };
      }
    });

    return timers;
  };

  initTimers = (id, initSeconds) => {
    this.setState({
      ...this.state,
      timers: {
        ...this.state.timers,
        [id]: {
          seconds: initSeconds,
          timer: {},
        },
      },
    });
  };

  handleAddClick = () => {
    this.setState({
      ...this.state,
      formEditing: true,
      inputType: 'EMail',
      inputValue: '',
    });
  };

  handleSaveClick = e => {
    e.preventDefault();

    const pid = this.props.notificationList.current.data.id;
    const params = {
      pid,
      type: this.state.inputType,
      content: this.state.inputValue,
    };
    this.props.createNotificationListTerminal(params);
    this.setState({
      ...this.state,
      formEditing: false,
    });
  };

  handleCancelClick = e => {
    e.preventDefault();

    this.setState({
      ...this.state,
      formEditing: false,
    });
  };

  handleDeleteClick = id => () => {
    const pid = this.props.notificationList.current.data.id;
    this.props.deleteNotificationListTerminal({ pid, id });
  };

  handleSelectChange = value => {
    const tips = value === 'EMail' ? '邮箱地址' : '手机号码';

    this.setState({
      ...this.state,
      inputType: value,
      inputTips: tips,
    });
  };

  handleInputChange = e => {
    this.setState({
      ...this.state,
      inputValue: e.target.value,
    });
  };

  handleSendLink = id => () => {
    this.initTimers(id, 60);

    const timer = window.setInterval(() => {
      const seconds = this.state.timers[id].seconds;
      if (seconds > 0) {
        this.setState({
          ...this.state,
          timers: {
            ...this.state.timers,
            [id]: {
              seconds: seconds - 1,
              timer,
            },
          },
        });
      } else {
        clearInterval(this.state.timers[id].timer);
      }
    }, 1000);
  };

  renderAddTerminalForm() {
    const formEditing = this.state.formEditing;
    const tips = this.state.inputType === 'EMail' ? '邮箱地址' : '手机号码';

    return (
      <div>
        <Row className={classNames({ hide: formEditing }, 'rowHeight')}>
          <Button
            type="primary"
            onClick={this.handleAddClick}
          >
            添加终端
          </Button>
        </Row>
        <Row className={classNames({ hide: !formEditing }, 'rowHeight')}>
          <Col span="2" className="marginRight10px">
            <Select
              defaultValue="EMail"
              style={{ width: '100%' }}
              onChange={this.handleSelectChange}
            >
              <Option value="EMail">EMail</Option>
              <Option value="SMS">SMS</Option>
            </Select>
          </Col>
          <Col span="5">
            <Input
              placeholder={tips}
              name="content"
              value={this.state.inputValue}
              onChange={this.handleInputChange}
            />
          </Col>
          <Col span="2" className="lineHeight30px">
            <a
              className={classNames('save', 'marginLeft10px')}
              href="#"
              onClick={this.handleSaveClick}
            >
              <i className={classNames('portalicon', 'portalicon-save', 'save')}></i>
            </a>
            <a
              className={classNames('cancel', 'marginLeft10px')}
              href="#"
              onClick={this.handleCancelClick}
            >
              <i className={classNames('portalicon', 'portalicon-cancel', 'cancel')}></i>
            </a>
          </Col>
        </Row>
      </div>
    );
  }

  renderVerifiedStatus = terminal => (
    <Col span="8">
      {terminal.verified ? '已验证' : '验证码已发送'} <br />
      {terminal.verified ? '' : this.renderSendLink(terminal.id)}
    </Col>
  );

  renderSendLink = id => {
    const seconds = this.state.timers[id].seconds;
    const tips = `${seconds}秒后重新发送`;

    return (
      <span>
        ({seconds === 0 ?
          <a href="#" onClick={this.handleSendLink(id)}>重新发送</a> :
          <span className="resend-count-down">{tips}</span>})
      </span>
    );
  };

  renderTerminalList() {
    const terminals = this.props.notificationList.current.data.terminals;

    return (
      <div>
        {terminals.map((terminal, i) => <Row key={i} className="rowHeight">
          <Col span="4">{terminal.type}</Col>
          <Col span="8">{terminal.content}</Col>
          {this.renderVerifiedStatus(terminal)}
          <Col span="4">
            <a
              className="delete"
              href="#"
              onClick={this.handleDeleteClick(terminal.id)}
            >
              <i className={classNames('portalicon', 'portalicon-delete', 'delete')}></i>
            </a>
          </Col>
        </Row>)}
      </div>
    );
  }

  render() {
    return (
      <div className="notification-list-terminal-list">
        {this.renderAddTerminalForm()}
        <div className="notification-list-terminal-header">
          <Row>
            <Col span="4">类别</Col>
            <Col span="8">终端</Col>
            <Col span="8">验证状态</Col>
            <Col span="4">操作</Col>
          </Row>
        </div>
        <div>
          {this.renderTerminalList()}
        </div>
      </div>
    );
  }
}
