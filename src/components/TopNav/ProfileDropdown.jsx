import React from 'react';
import Dropdown from 'antd/lib/dropdown';
import Icon from 'antd/lib/icon';
import Menu from 'antd/lib/menu';

const MenuItem = Menu.Item;
const MenuDivider = Menu.Divider;

export default class ProfileDropdown extends React.Component {
  static propTypes = {
    auth: React.PropTypes.shape({
      user: React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
      }).isRequired,
    }),
    handleLogout: React.PropTypes.func.isRequired,
  };

  getContent() {
    return (
      <div className="dropdown-profile open">
        <div className="dropdown-menu">
          <Menu>
            <MenuItem>
              <a><Icon type="setting" /> 个人设置</a>
            </MenuItem>
            <MenuDivider />
            <MenuItem>
              <a onClick={this.props.handleLogout}><Icon type="logout" /> 注销</a>
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
          overlay={this.getContent()}
          trigger={['click']}
        >
          <a ><Icon type="user" />{this.props.auth.user.name}</a>
        </Dropdown>
      </li>
    );
  }
}
