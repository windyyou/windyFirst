import React from 'react';
import Dropdown from 'antd/lib/dropdown';
import Icon from 'antd/lib/icon';
import Badge from 'antd/lib/badge';

export default class MessageDropdown extends React.Component {
  getContent() {
    const messages = [1, 2, 3, 4, 5];

    return (
      <div className="dropdown-messages open">
        <ul className="dropdown-menu">
          {messages.map((msg, i) =>
              <li key={i}>
                <a href="#">
                  <p>
                    <strong>消息 {i}</strong>
                    <span className="pull-right text-muted"><em>5分钟前</em></span>
                  </p>
                  <div>消息消息消息消息消息消息消息消息</div>
                </a>
              </li>
          )}
          <li>
            <a href="#" className="text-center">
              <strong>更多消息</strong>
              <Icon type="right" />
            </a>
          </li>
        </ul>
      </div>
    );
  }

  render() {
    return (
      <li>
        <Dropdown
          overlay={this.getContent()}
          trigger={['click']}
        >
          <a href="#">
            <Icon type="message"/> <Badge dot={true}>消息</Badge>
          </a>
        </Dropdown>
      </li>
    );
  }
}
