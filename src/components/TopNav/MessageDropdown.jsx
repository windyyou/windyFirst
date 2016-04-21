import React from 'react';
import { Link } from 'react-router';
import Dropdown from 'antd/lib/dropdown';
import Icon from 'antd/lib/icon';
import Badge from 'antd/lib/badge';

export default class MessageDropdown extends React.Component {
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
    fetchNotifications: React.PropTypes.func.isRequired,
    fetchNotification: React.PropTypes.func.isRequired,
    putNotification: React.PropTypes.func.isRequired,
  };

  static contextTypes = {
    router: React.PropTypes.object,
  };
  getContent(unReadMessages) {
    return (
      <div className="dropdown-messages open">
        <ul className="dropdown-menu">
          {unReadMessages.map((msg, i) =>
            <li key={i}>
              <Link to={`/notifications/${msg.id}`} onClick={this.handleClick(msg.id)}>
                <p>
                  <strong>{msg.name}</strong>
                  <span className="pull-right text-muted"><em>{msg.createdAt}</em></span>
                </p>
                <div>{msg.text.substr(0, 20)}...</div>
              </Link>
            </li>
          )}
          <li>
            <Link to={'/notifications'} className="text-center">
              <strong>全部消息</strong>
              <Icon type="right" />
            </Link>
          </li>
        </ul>
      </div>
    );
  }

  handleClick = (id) =>
    () => {
      this.props.fetchNotification(id);
      this.props.putNotification({ ...this.props.notification.currentEntity, id: id, status: '已读' });
    };

  render() {
    const messages = this.props.notification.entities;
    const unReadMessages = messages.filter((message) => message.status === '未读');
    const message = unReadMessages.length === 0 ? <Badge>消息</Badge> : <Badge dot>消息</Badge>;

    return (
      <li>
        <Dropdown
          overlay={this.getContent(unReadMessages)}
          trigger={['click']}
        >
          <a href="#" >
            <Icon type="message" /> {message}
          </a>
        </Dropdown>
      </li>
    );
  }
}
