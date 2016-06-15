import React from 'react';
import Tabs from 'antd/lib/tabs';

import Description from '../../../containers/Pools/Stacks/Description';
import Resource from '../../../containers/Pools/Stacks/Resource.jsx';
import Topology from '../../../containers/Instances/Topology';

const TabPane = Tabs.TabPane;

export default function Detail(props) {
  return (
    <div className="tab-view">
      <Tabs defaultActiveKey="1">
        <TabPane tab="详细信息" key="1"><Description {...props} /></TabPane>
        <TabPane tab="资源" key="2"><Resource {...props} /></TabPane>
        <TabPane tab="拓扑" key="3"><Topology /></TabPane>
      </Tabs>
    </div>
  );
}
