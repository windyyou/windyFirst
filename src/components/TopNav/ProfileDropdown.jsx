import React from 'react';
import Dropdown from 'antd/lib/dropdown';
import Icon from 'antd/lib/icon';
import Menu from 'antd/lib/menu';

const MenuItem = Menu.Item;
const MenuDivider = Menu.Divider;

export default class ProfileDropdown extends React.Component {
  getContent() {
    return (
      <div className="dropdown-profile open">
        <div className="dropdown-menu">
          <Menu>
            <MenuItem>
              <a href="#"><Icon type="setting" /> 选项1</a>
            </MenuItem>
            <MenuItem>
              <a href="#"><Icon type="setting" /> 选项2</a>
            </MenuItem>
            <MenuDivider />
            <MenuItem>
              <a href="#"><Icon type="logout" /> 退出</a>
            </MenuItem>
          </Menu>
        </div>
      </div>
    );
  }

  render() {
    return (
      <li>
        <Dropdown
          overlay={ this.getContent() }
          trigger={ ['click'] }
        >
          <a href="#"><Icon type="user" /> Admin</a>
        </Dropdown>
      </li>
    );
  }
}
