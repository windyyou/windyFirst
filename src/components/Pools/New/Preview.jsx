import React from 'react';

export default function Preview(props) {
  const spec = props.spec;

  const unitPrice = props.pool.config.data.unitPrice;

  const hourly = unitPrice.core * spec.cpus + unitPrice.ram * spec.mems +
    unitPrice.performance * spec.volumes.performance +
    unitPrice.capacity * spec.volumes.capacity +
    unitPrice.CTCCIps * spec.fips.CTCCIps + unitPrice.CMCCIps * spec.fips.CMCCIps +
    unitPrice.CUCCIps * spec.fips.CUCCIps + unitPrice.BGPIps * spec.fips.BGPIps +
    unitPrice.database * (spec.dbaas ? 1 : 0) +
    unitPrice.alarm * (spec.maas ? 1 : 0) +
    unitPrice.VPN * (spec.vpnaas ? 1 : 0) +
    unitPrice.loadbalancers * (spec.lbaas ? 1 : 0) +
    unitPrice.firewalls * (spec.fwaas ? 1 : 0);
  const monthly = hourly * 30;

  const CTCC = spec.fips.CTCCIps > 0 ? (<tr><td>电信：{spec.fips.CTCCIps}个</td></tr>) : null;
  const CMCC = spec.fips.CMCCIps > 0 ? (<tr><td>移动：{spec.fips.CMCCIps}个</td></tr>) : null;
  const CUCC = spec.fips.CUCCIps > 0 ? (<tr><td>联通：{spec.fips.CUCCIps}个</td></tr>) : null;
  const BGP = spec.fips.BGPIps > 0 ? (<tr><td>BGP：{spec.fips.BGPIps}个</td></tr>) : null;

  return (
    <div className="panel panel-default preview">
      <div className="panel-heading">配额与服务</div>
      <div className="panel-body">
        <table className="table pool-table table-hover">
          <tbody>
          <tr>
            <th>CPU</th>
            <td>{spec.cpus}核</td>
          </tr>
          <tr>
            <th>内存</th>
            <td>{spec.mems}GB</td>
          </tr>
          <tr>
            <th>性能型硬盘</th>
            <td>{spec.volumes.performance}GB</td>
          </tr>
          <tr>
            <th>容量型硬盘</th>
            <td>{spec.volumes.capacity}GB</td>
          </tr>
          <tr>
            <th>公网IP</th>
            <td>
              <table>
                <tbody>
                  {CTCC}
                  {CMCC}
                  {CUCC}
                  {BGP}
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <th>数据库服务</th>
            <td>{spec.dbaas === true ? '启用' : '禁用'}</td>
          </tr>
          <tr>
            <th>监控服务</th>
            <td>{spec.maas === true ? '启用' : '禁用'}</td>
          </tr>
          <tr>
            <th>VPN服务</th>
            <td>{spec.vpnaas === true ? '启用' : '禁用'}</td>
          </tr>
          <tr>
            <th>均衡负载服务</th>
            <td>{spec.lbaas === true ? '启用' : '禁用'}</td>
          </tr>
          <tr>
            <th>防火墙服务</th>
            <td>{spec.fwaas === true ? '启用' : '禁用'}</td>
          </tr>
          </tbody>
        </table>
        <hr />
        <div className="price">
          <label>总价格:</label>
          <span className="hourly">{hourly.toFixed(2)} 元/小时</span>
          <span className="monthly">({monthly.toFixed(2)} 元/月)</span>
        </div>
      </div>
    </div>
  );
}

Preview.propTypes = {
  spec: React.PropTypes.shape({
    cpus: React.PropTypes.number.isRequired,
    mems: React.PropTypes.number.isRequired,
    volumes: React.PropTypes.shape({
      performance: React.PropTypes.number,
      capacity: React.PropTypes.number,
    }),
    fips: React.PropTypes.shape({
      CTCCIps: React.PropTypes.number.isRequired,
      CMCCIps: React.PropTypes.number.isRequired,
      CUCCIps: React.PropTypes.number.isRequired,
      BGPIps: React.PropTypes.number.isRequired,
    }).isRequired,
    dbaas: React.PropTypes.bool.isRequired,
    maas: React.PropTypes.bool.isRequired,
    vpnaas: React.PropTypes.bool.isRequired,
    lbaas: React.PropTypes.bool.isRequired,
    fwaas: React.PropTypes.bool.isRequired,
  }).isRequired,
  pool: React.PropTypes.object.isRequired,
};
