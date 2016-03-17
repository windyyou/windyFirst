import React from 'react';
import Icon from 'antd/lib/icon';
import Radio from 'antd/lib/radio';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import MonitorChart from './MonitorChart';

import cpu from '../../api/mock/cpuMonitor.json';
import memory from '../../api/mock/memoryMonitor.json';
import diskRead from '../../api/mock/diskReadMonitor.json';
import diskWrite from '../../api/mock/diskWriteMonitor.json';
import netIn from '../../api/mock/networkInMonitor.json';
import netOut from '../../api/mock/networkOutMonitor.json';

const Button = Radio.Button;
const Group = Radio.Group;

export default class Monitor extends React.Component {
  render() {
    return (
      <div className="instance-monitor">
        <div className="instance-monitor-actions">
          <Group defaultValue="5">
            <Button value="1">最近三小时</Button>
            <Button value="2">最近一天</Button>
            <Button value="3">最近一周</Button>
            <Button value="4">最近一月</Button>
            <Button value="5">实时</Button>
          </Group>
        </div>
        <div className="instance-monitor-charts">
          <Row>
            <Col span="12">
              <MonitorChart
                {...this.props}
                title="CPU利用率 (%)"
                data={cpu}
                xaxis="timestamp"
                line={['cpu1', 'cpu2']}
                lineColor={['#8884d8', '#82ca9d']}
              />
            </Col>
            <Col span="12">
              <MonitorChart
                {...this.props}
                title="内存利用率 (%)"
                data={memory}
                xaxis="timestamp"
                line={['memory']}
                lineColor={['#8884d8']}
              />
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <MonitorChart
                {...this.props}
                title="硬盘 - 读 (B/s)"
                data={diskRead}
                xaxis="timestamp"
                line={['disk1', 'disk2']}
                lineColor={['#8884d8', '#82ca9d']}
              />
            </Col>
            <Col span="12">
              <MonitorChart
                {...this.props}
                title="硬盘 - 写 (B/s)"
                data={diskWrite}
                xaxis="timestamp"
                line={['disk1', 'disk2']}
                lineColor={['#8884d8', '#82ca9d']}
              />
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <MonitorChart
                {...this.props}
                title="网络 - 进 (B/s)"
                data={netIn}
                xaxis="timestamp"
                line={['net1', 'net2']}
                lineColor={['#8884d8', '#82ca9d']}
              />
            </Col>
            <Col span="12">
              <MonitorChart
                {...this.props}
                title="网络 - 出 (B/s)"
                data={netOut}
                xaxis="timestamp"
                line={['net1', 'net2']}
                lineColor={['#8884d8', '#82ca9d']}
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
