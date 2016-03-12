import React from 'react';
import Collapse from 'antd/lib/collapse';

import BasicInfo from './BasicInfo';
import RelatedResources from './RelatedResources';
import Snapshots from './Snapshots';

const Panel = Collapse.Panel;

export default class Description extends React.Component {
  render() {
    return (
      <Collapse defaultActiveKey={['1', '2', '3']}>
        <Panel header="基本属性" key="1">
          <BasicInfo {...this.props} />
        </Panel>
        <Panel header="关联资源" key="2">
          <RelatedResources {...this.props} />
        </Panel>
        <Panel header="快照" key="3">
          <Snapshots {...this.props} />
        </Panel>
      </Collapse>
    );
  }
}
