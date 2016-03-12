import React from 'react';
import Icon from 'antd/lib/icon';
import Dropdown from 'antd/lib/dropdown';
import Button from 'antd/lib/button';
import Menu from 'antd/lib/menu';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend
} from 'recharts';

export default class BillingTrendsPanel extends React.Component {
  getContent() {
    return (
      <Menu>
        <Menu.Item>月度</Menu.Item>
        <Menu.Item>日度</Menu.Item>
        <Menu.Item>小时度</Menu.Item>
      </Menu>
    );
  }

  render() {
    return (
      <div className="panel panel-default billing-trends-panel">
        <div className="panel-heading">
          <Icon type="area-chart" /> 消费趋势
          <Dropdown
            overlay={this.getContent()}
            trigger={['click']}
          >
            <Button type="ghost" className="pull-right action-button">
              期间<Icon type="caret-down" />
            </Button>
          </Dropdown>
        </div>
        <div className="panel-body">
          <ResponsiveContainer>
            <AreaChart data={this.props.data}
                       margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <XAxis dataKey="name"/>
              <YAxis />
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip />
              <Legend />
              <Area
                type='monotone'
                dataKey='instance'
                name="计算"
                stackId="1"
                stroke='#8884d8'
                fill='#8884d8'
              />
              <Area
                type='monotone'
                dataKey='storage'
                name="存储"
                stackId="1"
                stroke='#82ca9d'
                fill='#82ca9d'
              />
              <Area
                type='monotone'
                dataKey='network'
                name="网络"
                stackId="1"
                stroke='#ffc658'
                fill='#ffc658'
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}
