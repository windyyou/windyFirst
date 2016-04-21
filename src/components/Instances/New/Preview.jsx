import React from 'react';

export default function Preview(props) {
  const spec = props.spec;
  const unit = (spec.cpu * 0.25 + spec.memory * 0.15).toFixed(2);
  const hourly = (unit * spec.quantity).toFixed(2);
  const monthly = (hourly * 24 * 30).toFixed(2);

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
            <td>{spec.image}</td>
          </tr>
          <tr>
            <th>CPU</th>
            <td>{spec.cpu}核</td>
          </tr>
          <tr>
            <th>内存</th>
            <td>{spec.memory}G</td>
          </tr>
          <tr>
            <th>子网</th>
            <td>{spec.networkType === 'basic' ? '基础网络' : spec.subnet}</td>
          </tr>
          </tbody>
        </table>
        <hr />
        <div className="price">
          <label>总价格:</label>
          <span className="quantity">{spec.quantity}</span> X <span className="unit">
          {unit} 元/小时</span> = <span className="hourly">
          {hourly} 元/小时</span> <span className="monthly">
          ({monthly} 元/月)</span>
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
    imageType: React.PropTypes.string.isRequired,
    image: React.PropTypes.string.isRequired,
    cpu: React.PropTypes.number.isRequired,
    memory: React.PropTypes.number.isRequired,
    networkType: React.PropTypes.string.isRequired,
    subnet: React.PropTypes.string.isRequired,
    username: React.PropTypes.string.isRequired,
    credentialType: React.PropTypes.string.isRequired,
    password: React.PropTypes.string.isRequired,
    keypair: React.PropTypes.string.isRequired,
    quantity: React.PropTypes.number.isRequired,
  }),
};
