import React from 'react';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';

const SubMenu = Menu.SubMenu;

export default function SideNav(props, context) {
  function getSelectedKeys(path) {
    if (path === '/') {
      return ['/'];
    }

    return [`/${path.split('/')[1]}`];
  }

  function handleClick(event) {
    context.router.push(event.key);
  }

  return (
    <aside className="sidebar">
      <nav >
        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={getSelectedKeys(window.location.pathname)}
          defaultOpenKeys={['sub1', 'sub2', 'sub8']}
          onClick={handleClick}
        >
          <SubMenu key="sub1" title={<span><Icon type="desktop" />计算和网络</span>}>
            <Menu.Item key="/">总览</Menu.Item>
            <Menu.Item key="/instances">云主机</Menu.Item>
            <Menu.Item key="/snapshots">快照</Menu.Item>
            <SubMenu key="sub9" title={<span>网络</span>}>
              <Menu.Item key="/networks">私有网络</Menu.Item>
              <Menu.Item key="/subnets">子网</Menu.Item>
              <Menu.Item key="/virtual-nics">虚拟网卡</Menu.Item>
              <Menu.Item key="/floating-ips">公网IP</Menu.Item>
            </SubMenu>
            <Menu.Item key="/routers">路由</Menu.Item>
            <Menu.Item key="/security-groups">安全组</Menu.Item>
            <Menu.Item key="/bare-metals">物理机</Menu.Item>
          </SubMenu>
          <SubMenu key="sub8" title={<span><Icon type="lock" />安全</span>}>
            <Menu.Item key="/keypairs">密钥</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="hdd" />存储</span>}>
            <Menu.Item key="/disks">云硬盘</Menu.Item>
            <Menu.Item key="/backups">备份</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" title={<span><Icon type="appstore-o" />服务</span>}>
            <Menu.Item key="8">负载均衡</Menu.Item>
            <Menu.Item key="/firewalls">防火墙</Menu.Item>
            <Menu.Item key="10">VPN</Menu.Item>
            <Menu.Item key="11">数据库</Menu.Item>
            <Menu.Item key="/alarms">监控报警</Menu.Item>
          </SubMenu>

          <SubMenu key="sub5" title={<span><Icon type="edit" />Auto Design</span>}>
            <Menu.Item key="16">模板</Menu.Item>
          </SubMenu>
          <SubMenu key="sub4" title={<span><Icon type="notification" />通知</span>}>
            <Menu.Item key="/notifications">通知消息</Menu.Item>
            <Menu.Item key="14">日志</Menu.Item>
            <Menu.Item key="15">警报</Menu.Item>
            <Menu.Item key="/notification-lists">通知列表</Menu.Item>
          </SubMenu>
          <SubMenu key="sub6" title={<span><Icon type="pay-circle-o" />计费</span>}>
            <Menu.Item key="17">单价</Menu.Item>
            <Menu.Item key="18">账单</Menu.Item>
            <Menu.Item key="19">充值</Menu.Item>
          </SubMenu>
          <SubMenu key="sub7" title={<span><Icon type="team" />管理</span>}>
            <Menu.Item key="20">用户</Menu.Item>
          </SubMenu>
        </Menu>
      </nav>
    </aside>
  );
}

SideNav.contextTypes = {
  router: React.PropTypes.object,
};
