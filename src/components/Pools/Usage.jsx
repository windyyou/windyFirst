import React from 'react';
import { Progress } from 'antd';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Spin from 'antd/lib/spin';

export default class Usage extends React.Component {
  static propTypes = {
    pool: React.PropTypes.shape({
      list: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        data: React.PropTypes.arrayOf(React.PropTypes.shape({
          t_cpus: React.PropTypes.number,
          t_mems: React.PropTypes.number.isRequired,
          t_volumes: React.PropTypes.shape({
            performance: React.PropTypes.number,
            capacity: React.PropTypes.number,
          }),
          t_fips: React.PropTypes.shape({
            CTCCIps: React.PropTypes.number.isRequired,
            CMCCIps: React.PropTypes.number.isRequired,
            CUCCIps: React.PropTypes.number.isRequired,
            BGPIps: React.PropTypes.number.isRequired,
          }).isRequired,
          u_cpus: React.PropTypes.number.isRequired,
          u_mems: React.PropTypes.number.isRequired,
          u_volumes: React.PropTypes.shape({
            performance: React.PropTypes.number,
            capacity: React.PropTypes.number,
          }),
          u_fips: React.PropTypes.shape({
            CTCCIps: React.PropTypes.number.isRequired,
            CMCCIps: React.PropTypes.number.isRequired,
            CUCCIps: React.PropTypes.number.isRequired,
            BGPIps: React.PropTypes.number.isRequired,
          }).isRequired,
        })).isRequired,
      }).isRequired,
    }).isRequired,
    fetchPools: React.PropTypes.func.isRequired,
  };

  renderBasicInfo() {
    const usage = this.props.pool.list.data[0];

    const umems = (usage.u_mems / 1024).toFixed(1);
    const ufloatingIps = usage.u_fips.CTCCIps + usage.u_fips.CMCCIps
      + usage.u_fips.CUCCIps + usage.u_fips.BGPIps;
    const tfloatingIps = usage.t_fips.CTCCIps + usage.t_fips.CMCCIps
      + usage.t_fips.CUCCIps + usage.t_fips.BGPIps;

    const cpuPercent = usage.u_cpus === 0 ? 0 : usage.u_cpus / usage.t_cpus;
    const memsPercent = usage.u_mems === 0 ? 0 : usage.u_mems / usage.t_mems;
    const performancePercent = usage.u_volumes.performance === 0 ?
      0 : usage.u_volumes.performance / usage.t_volumes.performance;
    const capacityPercent = usage.u_volumes.capacity === 0 ?
      0 : usage.u_volumes.capacity / usage.t_volumes.capacity;
    const fipsPercent = tfloatingIps === 0 ? 0 : ufloatingIps / tfloatingIps;

    const cpu = (<Col span="4" className="colCenter">
      <Progress
        width={150}
        type="circle"
        percent={cpuPercent * 100}
        format={() => `${usage.u_cpus}`}
      />
      <span className="spanCenter">CPU(总计:{usage.t_cpus || '-'} 核)</span>
    </Col>);

    const memory = (<Col offset="1" span="4" className="colCenter">
      <Progress
        width={150}
        type="circle"
        percent={memsPercent * 100}
        format={() => `${umems}`}
      />
      <span className="spanCenter">内存(总计:{usage.t_mems || '-'} GB)</span>
    </Col>);

    const performancVolumes = (<Col offset="1" span="4" className="colCenter">
      <Progress
        width={150}
        type="circle"
        percent={performancePercent * 100}
        format={() => `${usage.u_volumes.performance}`}
      />
      <span className="spanCenter">性能型硬盘(总计:{usage.t_volumes.performance || '-'} GB)</span>
    </Col>);

    const capacityVolumes = (<Col offset="1" span="4" className="colCenter">
      <Progress
        width={150}
        type="circle"
        percent={capacityPercent * 100}
        format={() => `${usage.u_volumes.capacity}`}
      />
      <span className="spanCenter">容量型硬盘(总计:{usage.u_volumes.capacity || '-'} GB)</span>
    </Col>);

    const fIps = (<Col offset="1" span="4" className="colCenter">
      <Progress
        width={150}
        type="circle"
        percent={fipsPercent * 100}
        format={() => `${ufloatingIps}`}
      />
      <span className="spanCenter">公网IP(总计:{tfloatingIps || '-'} 个)</span>
    </Col>);

    return (
      <div className="pool-usage">
        <Row>
          {usage.t_cpus === 0 ? null : cpu}

          {usage.t_mems === 0 ? null : memory}

          {usage.t_volumes.performance === 0 ? null : performancVolumes}

          {usage.t_volumes.capacity === 0 ? null : capacityVolumes}

          {tfloatingIps === 0 ? null : fIps}
        </Row>
      </div>
    );
  }

  renderFetching() {
    return (
      <Spin size="default" />
    );
  }

  renderError(error) {
    return (
      <span>{error.message}</span>
    );
  }

  render() {
    const basicInfo = this.renderBasicInfo();
    return (
      <div className="basic-info">
        {basicInfo}
      </div>
    );
  }
}
