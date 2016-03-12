import React from 'react';
import Icon from 'antd/lib/icon';
import Select from 'antd/lib/select';

import TaskDropdown from './TaskDropdown';
import MessageDropdown from './MessageDropdown';
import ProfileDropdown from './ProfileDropdown';

const Option = Select.Option;

export default class TopNav extends React.Component {
  render() {
    return (
      <header>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="navbar-header">
            <a href="/" className="navbar-brand"><Icon type="cloud-o"/> 云海私有云</a>
          </div>
          <span className="region">
            <Select defaultValue='区域-1'
                    style={{ width: 100 }}
                    showSearch={false}
            >
              <Option value={1}>区域-1</Option>
              <Option value={2}>区域-2</Option>
              <Option value={3}>区域-3</Option>
              <Option value={4}>区域-4</Option>
            </Select>
          </span>
          <ul className="nav navbar-top-links navbar-right">
            <MessageDropdown />
            <TaskDropdown />
            <ProfileDropdown />
          </ul>
        </nav>
      </header>
    );
  }
}
