import React from 'react';
import { Link } from 'react-router';
import Button from 'antd/lib/button';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Icon from 'antd/lib/icon';

import snapshots from '../../api/mock/snapshots.json';

export default class Snapshots extends React.Component {
  render() {
    return (
      <div className="instance-snapshots">
        <div className="instance-snapshots-action">
          <Button type="primary">创建主机快照</Button>
        </div>
        <div className="instance-snapshots-header">
          <Row>
            <Col span="4">创建于</Col>
            <Col span="5">名称</Col>
            <Col span="4">容量</Col>
            <Col span="6">创建时间</Col>
            <Col span="4">状态</Col>
            <Col span="1"></Col>
          </Row>
        </div>
        <div className="instance-snapshots-body">
          {snapshots.map((snapshot, i) => <Row key={i}>
            <Col span="4">{snapshot.ago}</Col>
            <Col span="5"><Link to="#">{snapshot.name}</Link></Col>
            <Col span="4">{snapshot.size}</Col>
            <Col span="6">{snapshot.datetime}</Col>
            <Col span="4">
              <Icon style={{ color: '#60BE29' }} type="check-circle" /> {snapshot.status}
            </Col>
            <Col span="1"><a className="delete" href="#"><Icon type="minus-circle-o"/></a></Col>
          </Row>)}
        </div>
      </div>

    );
  }
}
