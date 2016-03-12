import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import AggregationInfoPanel from './AggregationInfoPanel';
import TimelinePanel from './TimelinePanel';
import BillingTrendsPanel from './BillingTrendsPanel';
import QuotaPanel from './QuotaPanel';

import billingTrendsData from '../../store/billingTrends.json';
import timelineData from '../../store/timeline.json';
import aggregationData from '../../store/aggregation.json';
import computeQuota from '../../store/computeQuota.json';
import storageQuota from '../../store/storageQuota.json';
import networkQuota from '../../store/networkQuota.json';
import otherQuota from '../../store/otherQuota.json';

const quotaData = {
  '计算': computeQuota,
  '存储': storageQuota,
  '网络': networkQuota,
  '其他': otherQuota,
};

export default class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <Row type="flex">
          {aggregationData.map((data, i) =>
            <Col span="6" key={i}>
              <AggregationInfoPanel
                type={data.type}
                iconType={data.iconType}
                title={data.title}
                value={data.value}
              />
            </Col>
          )}
        </Row>
        <Row type="flex">
          <Col span="16">
            <BillingTrendsPanel data={billingTrendsData} />
            <QuotaPanel data={quotaData} />
          </Col>
          <Col span="8">
            <TimelinePanel data={timelineData} />
          </Col>
        </Row>
      </div>
    );
  }
}
