import React from 'react';
import Tabs from 'antd/lib/tabs';

import Description from '../../containers/Ports/Description';

const TabPane = Tabs.TabPane;

export default function Detail(props) {
  return (
    <div className="tab-view">
      <Tabs defaultActiveKey="1">
        <TabPane tab="详细信息" key="1"><Description {...props} /></TabPane>
      </Tabs>
    </div>
  );
}
