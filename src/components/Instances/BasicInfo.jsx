import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Icon from 'antd/lib/icon';

export default class BasicInfo extends React.Component {
  render () {
    return (
      <div className="basic-info">
        <Row>
          <Col span="2">
            <label>名称</label>
          </Col>
          <Col span="10">
            <span className="content">laboris</span>
          </Col>
          <Col span="2">
            <label>内网IP</label>
          </Col>
          <Col span="10">
            <span className="content">28.254.168.179</span>
          </Col>
        </Row>
        <Row>
          <Col span="2">
            <label>状态</label>
          </Col>
          <Col span="10">
            <span className="content">
              <Icon style={{ color: '#FAC450' }} type="minus-circle"/> shutdown
            </span>
          </Col>
          <Col span="2">
            <label>公网IP</label>
          </Col>
          <Col span="10">
            <span className="content">62.143.237.212</span>
          </Col>
        </Row>
        <Row>
          <Col span="2">
            <label>配置</label>
          </Col>
          <Col span="10">
            <span className="content">ea</span>
          </Col>
          <Col span="2">
            <label>镜像</label>
          </Col>
          <Col span="10">
            <span className="content"><a href="#">do</a></span>
          </Col>
        </Row>
        <Row>
          <Col span="2">
            <label>创建时间</label>
          </Col>
          <Col span="10">
            <span className="content">Sunday, February 28, 2016 6:35 PM</span>
          </Col>
        </Row>
      </div>
    );
  }
}
