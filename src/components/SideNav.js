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
            <Menu.Item key="3">快照</Menu.Item>
            <Menu.Item key="4">网络</Menu.Item>
            <Menu.Item key="5">路由</Menu.Item>
            <Menu.Item key="21">安全组</Menu.Item>
          </SubMenu>
          <SubMenu key="sub8" title={<span><Icon type="lock" />安全</span>}>
            <Menu.Item key="22">密钥</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="hdd" />存储</span>}>
            <Menu.Item key="6">云硬盘</Menu.Item>
            <Menu.Item key="7">备份</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" title={<span><Icon type="appstore-o" />服务</span>}>
            <Menu.Item key="8">负载均衡</Menu.Item>
            <Menu.Item key="9">防火墙</Menu.Item>
            <Menu.Item key="10">VPN</Menu.Item>
            <Menu.Item key="11">数据库</Menu.Item>
            <Menu.Item key="12">监控</Menu.Item>
          </SubMenu>

          <SubMenu key="sub5" title={<span><Icon type="edit" />Auto Design</span>}>
            <Menu.Item key="16">模板</Menu.Item>
          </SubMenu>
          <SubMenu key="sub4" title={<span><Icon type="notification" />通知</span>}>
            <Menu.Item key="13">消息</Menu.Item>
            <Menu.Item key="14">日志</Menu.Item>
            <Menu.Item key="15">警报</Menu.Item>
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
