import React from 'react';
import Tabs from 'antd/lib/tabs';

import Description from './Description';
import Monitor from './Monitor';

const TabPane = Tabs.TabPane;

export default class Detail extends React.Component {
  render() {
    return (
      <div className="tab-view">
        <Tabs defaultActiveKey="1">
          <TabPane tab="详细信息" key="1"><Description {...this.props} /></TabPane>
          <TabPane tab="监控" key="2"><Monitor {...this.props} /></TabPane>
          <TabPane tab="终端日志" key="3" disabled>终端日志</TabPane>
          <TabPane tab="终端" key="4" disabled>终端</TabPane>
          <TabPane tab="拓扑" key="5">拓扑</TabPane>
        </Tabs>
      </div>
    );
  }
}
