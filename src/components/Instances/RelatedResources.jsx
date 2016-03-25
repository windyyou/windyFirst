import React from 'react';
import { Link } from 'react-router';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Icon from 'antd/lib/icon';

import RelatedResource from './RelatedResource';

const keypairs = [
  { name: 'secret1' },
  { name: 'secret2' },
];
const keypairHeader = (<Row>
  <Col span="23">名称</Col>
</Row>);
const keypairBody = keypairs.map((keypair, i) => <Row key={i}>
  <Col span="23"><Link to="#">{keypair.name}</Link></Col>
  <Col span="1"><a className="delete" href="#"><Icon type="minus-circle-o" /></a></Col>
</Row>);

const volumes = [
  { name: 'vol1', size: '10GB' },
  { name: 'vol2', size: '10GB' },
];
const volumeHeader = (<Row>
  <Col span="8">名称</Col>
  <Col span="15">容量</Col>
</Row>);
const volumeBody = volumes.map((vol, i) => <Row key={i}>
  <Col span="8"><Link to="#">{vol.name}</Link></Col>
  <Col span="15">{vol.size}</Col>
  <Col span="1"><a className="delete" href="#"><Icon type="minus-circle-o" /></a></Col>
</Row>);

const networks = [
  { name: 'network1', subnet: 'subnet1', securityGroup: 'default', floatingIp: 'x.x.x.x' },
  { name: 'network1', subnet: 'subnet1', securityGroup: 'default', floatingIp: 'x.x.x.x' },
];
const networkHeader = (<Row>
  <Col span="6">虚拟网卡</Col>
  <Col span="6">子网</Col>
  <Col span="6">安全组</Col>
  <Col span="5">公网IP</Col>
</Row>);

const networkBody = networks.map((net, i) => <Row key={i}>
  <Col span="6"><Link to="#">{net.name}</Link></Col>
  <Col span="6">{net.subnet}</Col>
  <Col span="6"><Link to="#">{net.securityGroup}</Link></Col>
  <Col span="5">{net.floatingIp}</Col>
  <Col span="1"><a className="delete" href="#"><Icon type="minus-circle-o" /></a></Col>
</Row>);

export default class RelatedResources extends React.Component {
  render() {
    return (
      <div className="related-resources">
        <Row>
          <Col span="12">
            <RelatedResource
              type="密钥"
              header={keypairHeader}
              body={keypairBody}
            />
          </Col>
          <Col span="12">
            <RelatedResource
              type="云硬盘"
              header={volumeHeader}
              body={volumeBody}
            />
          </Col>
          <Col span="12">
            <RelatedResource
              type="网络"
              header={networkHeader}
              body={networkBody}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
