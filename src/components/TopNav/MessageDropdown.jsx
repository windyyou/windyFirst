import React from 'react';
import { Link } from 'react-router';
import Dropdown from 'antd/lib/dropdown';
import Icon from 'antd/lib/icon';
import Badge from 'antd/lib/badge';
import truncate from 'lodash/truncate';

export default class MessageDropdown extends React.Component {
  static propTypes = {
    notification: React.PropTypes.shape({
      list: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        filter: React.PropTypes.string.isRequired,
        data: React.PropTypes.arrayOf(React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
          type: React.PropTypes.string.isRequired,
          read: React.PropTypes.bool.isRequired,
          createdAt: React.PropTypes.string.isRequired,
        })).isRequired,
      }).isRequired,
    }),
    fetchNotification: React.PropTypes.func.isRequired,
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
              <Link to={`/app/notifications/${msg.id}`} onClick={this.handleClick(msg.id)}>
                <p>
                  <strong>{msg.name}</strong>
                  <span className="pull-right text-muted"><em>{msg.createdAt}</em></span>
                </p>
                <div>{truncate(msg.text, { length: 24 })}</div>
              </Link>
            </li>
          )}
          <li>
            <Link to="/app/notifications" className="text-center">
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
    };

  render() {
    const messages = this.props.notification.list.data;
    const unReadMessages = messages.filter((message) => !message.read);
    const hasDot = unReadMessages.length > 0;

    return (
      <li>
        <Dropdown
          overlay={this.getContent(unReadMessages.slice(0, 5))}
          trigger={['click']}
        >
          <a href="#" >
            <Icon type="message" /> <Badge dot={hasDot}>消息</Badge>
          </a>
        </Dropdown>
      </li>
    );
  }
}
