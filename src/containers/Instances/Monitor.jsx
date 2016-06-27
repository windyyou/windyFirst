import React from 'react';
import Radio from 'antd/lib/radio';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MonitorChart from './../../components/Instances/MonitorChart';

import { fetchMonitors } from '../../actions/monitor';
import { INSTANCE, CPU, MEMORY, DISKREAD,
  DISKWRITE, NETWORKIN, NETWORKOUT } from '../../constants/monitor';

const Button = Radio.Button;
const Group = Radio.Group;

const propTypes = {
  monitor: React.PropTypes.object.isRequired,
  fetchMonitors: React.PropTypes.func.isRequired,
};
function loadData(props) {
  props.fetchMonitors({ resource: INSTANCE, id: props.params.key, type: CPU });
  props.fetchMonitors({ resource: INSTANCE, id: props.params.key, type: MEMORY });
  props.fetchMonitors({ resource: INSTANCE, id: props.params.key, type: DISKWRITE });
  props.fetchMonitors({ resource: INSTANCE, id: props.params.key, type: DISKREAD });
  props.fetchMonitors({ resource: INSTANCE, id: props.params.key, type: NETWORKIN });
  props.fetchMonitors({ resource: INSTANCE, id: props.params.key, type: NETWORKOUT });
}

class Monitor extends React.Component {
  componentDidMount() {
    loadData(this.props);
  }

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
                data={this.props.monitor.cpu}
                xaxis="timestamp"
              />
            </Col>
            <Col span="12">
              <MonitorChart
                {...this.props}
                title="内存利用率 (%)"
                data={this.props.monitor.memory}
                xaxis="timestamp"
              />
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <MonitorChart
                {...this.props}
                title="硬盘 - 读 (B/s)"
                data={this.props.monitor.diskread}
                xaxis="timestamp"
              />
            </Col>
            <Col span="12">
              <MonitorChart
                {...this.props}
                title="硬盘 - 写 (B/s)"
                data={this.props.monitor.diskwrite}
                xaxis="timestamp"
              />
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <MonitorChart
                {...this.props}
                title="网络 - 进 (B/s)"
                data={this.props.monitor.networkin}
                xaxis="timestamp"
              />
            </Col>
            <Col span="12">
              <MonitorChart
                {...this.props}
                title="网络 - 出 (B/s)"
                data={this.props.monitor.networkout}
                xaxis="timestamp"
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

Monitor.propTypes = propTypes;

function mapStateToProps() {
  return createStructuredSelector({
    monitor: state => state.monitor,
  });
}

function mapDispatchToProps(dispatch) {
  return {
    fetchMonitors: params => dispatch(fetchMonitors(params)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Monitor);
