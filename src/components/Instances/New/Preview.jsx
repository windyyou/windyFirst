import React from 'react';
import { dict } from '../../../utils/data';

export default function Preview(props) {
  const spec = props.spec;
  const { instance, image, snapshot, subnet } = props;

  const isFetching = instance.config.isFetching;
  const error = instance.config.error;

  let unit = 0;

  if (isFetching) {
    unit = 0;
  } else if (error) {
    unit = 0;
  } else {
    const coreUnit = spec.core * instance.config.data.core.unitPrice;
    const ramUnit = spec.ram * instance.config.data.ram.unitPrice;
    const volumeType = instance.config.data.volume.type.filter(type => type.id === spec.volumeType);
    const volumeUnit = volumeType.length > 0 ?
      instance.config.data.volume.size * volumeType[0].unitPrice : 0;
    unit = coreUnit + ramUnit + volumeUnit;
  }

  const hourly = unit * spec.quantity;
  const monthly = hourly * 24 * 30;

  const source = spec.sourceType === 'image' ? image : snapshot;

  return (
    <div className="panel panel-default preview">
      <div className="panel-heading">配置详情</div>
      <div className="panel-body">
        <table className="table table-hover">
          <tbody>
            <tr>
              <th>名称</th>
              <td>{spec.name}</td>
            </tr>
            <tr>
              <th>镜像</th>
              <td>{dict(spec.source, source.list.data, 'id', 'name')}</td>
            </tr>
            <tr>
              <th>CPU</th>
              <td>{spec.core}核</td>
            </tr>
            <tr>
              <th>内存</th>
              <td>{spec.ram}G</td>
            </tr>
            <tr>
              <th>系统盘类型</th>
              <td>{dict(spec.volumeType, instance.config.data.volume.type, 'id', 'name')}</td>
            </tr>
            <tr>
              <th>系统盘容量</th>
              <td>{instance.config.data.volume.size}G</td>
            </tr>
            <tr>
              <th>子网</th>
              <td>{spec.networkType === 'basic' ?
                '基础网络' :
                dict(spec.subnet, subnet.list.data, 'id', 'name')}
              </td>
            </tr>
          </tbody>
        </table>
        <hr />
        <div className="price">
          <label>总价格:</label>
          <span className="quantity">{spec.quantity}</span> X <span className="unit">
          {unit.toFixed(2)} 元/小时</span> = <span className="hourly">
          {hourly.toFixed(2)} 元/小时</span> <span className="monthly">
          ({monthly.toFixed(2)} 元/月)</span>
        </div>
        <div>
          删除云主机会导致系统盘数据丢失，重要数据请存储于云硬盘。<a href="#">了解更多</a>
        </div>
      </div>
    </div>
  );
}

Preview.propTypes = {
  spec: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    sourceType: React.PropTypes.string.isRequired,
    source: React.PropTypes.string.isRequired,
    core: React.PropTypes.number.isRequired,
    ram: React.PropTypes.number.isRequired,
    networkType: React.PropTypes.string.isRequired,
    subnet: React.PropTypes.string.isRequired,
    username: React.PropTypes.string.isRequired,
    credentialType: React.PropTypes.string.isRequired,
    password: React.PropTypes.string.isRequired,
    keypair: React.PropTypes.string.isRequired,
    quantity: React.PropTypes.number.isRequired,
  }),
  instance: React.PropTypes.object.isRequired,
  image: React.PropTypes.object.isRequired,
  snapshot: React.PropTypes.object.isRequired,
  subnet: React.PropTypes.object.isRequired,
};
