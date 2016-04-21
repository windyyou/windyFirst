import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Icon from 'antd/lib/icon';

export default class BasicInfo extends React.Component {

  renderBasicInfo() {
    return (
      <div className="basic-info">
        <Row>
          <Col span="2">
            <label>名称</label>
          </Col>
          <Col span="10">
            <span className="content">{this.props.instance.currentInstance.name}</span>
          </Col>
          <Col span="2">
            <label>内网IP</label>
          </Col>
          <Col span="10">
            <span className="content">{this.props.instance.currentInstance.ip}</span>
          </Col>
        </Row>
        <Row>
          <Col span="2">
            <label>状态</label>
          </Col>
          <Col span="10">
          <span className="content">
            <Icon className={this.props.instance.currentInstance.status} type="minus-circle" />
            {this.props.instance.currentInstance.status}
          </span>
          </Col>
          <Col span="2">
            <label>公网IP</label>
          </Col>
          <Col span="10">
            <span className="content">{this.props.instance.currentInstance.floatingIp}</span>
          </Col>
        </Row>
        <Row>
          <Col span="2">
            <label>配置</label>
          </Col>
          <Col span="10">
            <span className="content">{this.props.instance.currentInstance.type}</span>
          </Col>
          <Col span="2">
            <label>镜像</label>
          </Col>
          <Col span="10">
            <span className="content">
              <a href="#">
                {this.props.instance.currentInstance.image}
              </a>
            </span>
          </Col>
        </Row>
        <Row>
          <Col span="2">
            <label>创建时间</label>
          </Col>
          <Col span="10">
            <span className="content">{this.props.instance.currentInstance.createdAt}</span>
          </Col>
        </Row>
      </div>
    );
  }

  renderFetching() {
    return (
      <span>loading...</span>
    );
  }

  renderError(error) {
    return (
      <span>{error.message}</span>
    );
  }

  render() {
    const basic = this.props.instance;

    const basicInfo = basic.error ?
      this.renderError(basic.error) :
      this.renderBasicInfo();

    return (
      <div className="basic-info">
        {this.props.instance.isFetching ? this.renderFetching() : basicInfo}
      </div>
    );
  }
}

BasicInfo.propTypes = {
  instance: React.PropTypes.shape({
    isFetching: React.PropTypes.bool.isRequired,
    error: React.PropTypes.object,
    currentInstance: React.PropTypes.shape({
      createdAt: React.PropTypes.string.isRequired,
      type: React.PropTypes.string.isRequired,
      floatingIp: React.PropTypes.string.isRequired,
      ip: React.PropTypes.string.isRequired,
      image: React.PropTypes.string.isRequired,
      status: React.PropTypes.string.isRequired,
      name: React.PropTypes.string.isRequired,
    }),
  }).isRequired,
};
