import React from 'react';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';

const SubMenu = Menu.SubMenu;
const MENUS = [
  {
    key: 'compute_network',
    title: '计算和网络',
    icon: 'desktop',
    items: [
      { path: '/app', title: '总览' },
      { path: '/app/instances', title: '云主机' },
      { path: '/app/snapshots', title: '快照' },
      { path: '/app/bare-metals', title: '物理机' },
      { path: '/app/security-groups', title: '安全组' },
    ],
    subs: [
      {
        key: 'network',
        title: '网络',
        items: [
          { path: '/app/networks', title: '私有网络' },
          { path: '/app/subnets', title: '子网' },
          { path: '/app/ports', title: '虚拟网卡' },
          { path: '/app/floating-ips', title: '公网IP' },
          { path: '/app/routers', title: '路由' },
        ],
      },
    ],
  },
  {
    key: 'security',
    title: '安全',
    icon: 'lock',
    items: [
      { path: '/app/keypairs', title: '密钥' },
    ],
  },
  {
    key: 'storage',
    title: '存储',
    icon: 'hdd',
    items: [
      { path: '/app/volumes', title: '云硬盘' },
      { path: '/app/backups', title: '备份' },
    ],
  },
  {
    key: 'service',
    title: '服务',
    icon: 'appstore-o',
    items: [
      { path: '/app/load-balancers', title: '负载均衡' },
      { path: '/app/firewalls', title: '防火墙' },
      { path: '/app/vpns', title: 'VPN' },
      { path: '/app/databases', title: '数据库' },
      { path: '/app/alarms', title: '监控报警' },
    ],
  },
  {
    key: 'deploy',
    title: '部署',
    icon: 'edit',
    items: [
      { path: '/app/pools', title: '资源池' },
    ],
  },
  {
    key: 'notification',
    title: '通知',
    icon: 'notification',
    items: [
      { path: '/app/notifications', title: '通知消息' },
      { path: '/app/operations', title: '操作日志' },
      { path: '/app/notification-lists', title: '通知列表' },
    ],
  },
  {
    key: 'billing',
    title: '计费',
    icon: 'pay-circle-o',
    items: [
      { path: '/app/unit-prices', title: '单价' },
      { path: '/app/bills', title: '账单' },
      { path: '/app/charges', title: '充值' },
    ],
  },
  {
    key: 'management',
    title: '管理',
    icon: 'team',
    items: [
      { path: '/app/users', title: '用户' },
    ],
  },
];

export default function SideNav(props, context) {
  function getSelectedKeys(path) {
    if (path === '/app') {
      return ['/app'];
    }

    return [`/app/${path.split('/').splice(2, 1)}`];
  }

  function getOpenKeys(selectedKeys, openKeys = [], menus = []) {
    for (const menu of menus) {
      openKeys.push(menu.key);

      if (menu.items.some(item => selectedKeys.includes(item.path))) {
        return true;
      }

      if (getOpenKeys(selectedKeys, openKeys, menu.subs)) {
        return true;
      }

      openKeys.pop();
    }

    return false;
  }

  function getSubMenus(menus = []) {
    return menus.map(menu => {
      const { key, title, icon, subs } = menu;
      let { items } = menu;
      if (!Array.isArray(items)) {
        items = [];
      }

      const menuTitle = icon ?
        <span><Icon type={icon} />{title}</span> :
        <span>{title}</span>;
      return (
        <SubMenu key={key} title={menuTitle}>
          {items.map(item => <Menu.Item key={item.path}>{item.title}</Menu.Item>)}
          {getSubMenus(subs)}
        </SubMenu>
      );
    });
  }

  function handleClick(event) {
    context.router.push(event.key);
  }

  const selectedKeys = getSelectedKeys(props.location.pathname);
  const openKeys = [];
  getOpenKeys(selectedKeys, openKeys, MENUS);

  return (
    <aside className="sidebar">
      <nav >
        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={selectedKeys}
          defaultOpenKeys={openKeys}
          onClick={handleClick}
        >
          {getSubMenus(MENUS)}
        </Menu>
      </nav>
    </aside>
  );
}

SideNav.contextTypes = {
  router: React.PropTypes.object,
};

SideNav.propTypes = {
  location: React.PropTypes.shape({
    pathname: React.PropTypes.string.isRequired,
  }).isRequired,
};
