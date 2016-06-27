import React from 'react';
import { Link } from 'react-router';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Spin from 'antd/lib/spin';

export default class BasicInfo extends React.Component {
  static propTypes = {
    port: React.PropTypes.shape({
      current: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        data: React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
          ip: React.PropTypes.string.isRequired,
          mac: React.PropTypes.string.isRequired,
          createdAt: React.PropTypes.string.isRequired,
          status: React.PropTypes.string.isRequired,
          instance: React.PropTypes.shape({
            id: React.PropTypes.string.isRequired,
            name: React.PropTypes.string.isRequired,
          }),
          subnet: React.PropTypes.shape({
            id: React.PropTypes.string.isRequired,
            name: React.PropTypes.string.isRequired,
          }),
          floatingIp: React.PropTypes.shape({
            id: React.PropTypes.string.isRequired,
            name: React.PropTypes.string.isRequired,
          }),
          securityGroup: React.PropTypes.shape({
            id: React.PropTypes.string.isRequired,
            name: React.PropTypes.string.isRequired,
          }),
        }).isRequired,
      }).isRequired,
    }).isRequired,
    updatePort: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      nameEditing: false,
      name: props.port.current.data.name,
    };
  }

  renderInstance(data) {
    if (data.instance) {
      return <Link to={`/app/instances/${data.instance.id}`}>{data.instance.name}</Link>;
    }

    return '-';
  }

  renderSubnet(data) {
    if (data.subnet) {
      return <Link to={`/app/subnets/${data.subnet.id}`}>{data.subnet.name}</Link>;
    }

    return '-';
  }

  renderFloatingIp(data) {
    if (data.floatingIp) {
      return <Link to={`/app/floating-ips/${data.floatingIp.id}`}>{data.floatingIp.name}</Link>;
    }

    return '-';
  }

  renderSecurityGroup(data) {
    if (data.securityGroup) {
      return (
        <Link
          to={`/app/security-groups/${data.securityGroup.id}`}
        >{data.securityGroup.name}</Link>
      );
    }

    return '-';
  }

  renderBasicInfo() {
    const { data } = this.props.port.current;

    return (
      <div className="basic-info">
        <Row>
          <Col span="2">
            <label>名称</label>
          </Col>
          <Col span="10">
            <span className="content">
              <span className="content">
                {data.name || data.id}
              </span>
            </span>
          </Col>
        </Row>
        <Row>
          <Col span="2">
            <label>IP</label>
          </Col>
          <Col span="10">
            <span className="content">
              <span className="content">
                {data.ip}
              </span>
            </span>
          </Col>
        </Row>
        <Row>
          <Col span="2">
            <label>MAC</label>
          </Col>
          <Col span="10">
            <span className="content">
              <span className="content">
                {data.mac}
              </span>
            </span>
          </Col>
        </Row>
        <Row>
          <Col span="2">
            <label>主机</label>
          </Col>
          <Col span="10">
            <span className="content">
              <span className="content">
                {this.renderInstance(data)}
              </span>
            </span>
          </Col>
        </Row>
        <Row>
          <Col span="2">
            <label>子网</label>
          </Col>
          <Col span="10">
            <span className="content">
              <span className="content">
                {this.renderSubnet(data)}
              </span>
            </span>
          </Col>
        </Row>
        <Row>
          <Col span="2">
            <label>公网IP</label>
          </Col>
          <Col span="10">
            <span className="content">
              <span className="content">
                {this.renderFloatingIp(data)}
              </span>
            </span>
          </Col>
        </Row>
        <Row>
          <Col span="2">
            <label>安全组</label>
          </Col>
          <Col span="10">
            <span className="content">
              <span className="content">
                {this.renderSecurityGroup(data)}
              </span>
            </span>
          </Col>
        </Row>
        <Row>
          <Col span="2">
            <label>状态</label>
          </Col>
          <Col span="10">
            <span className="content">{data.status}</span>
          </Col>
        </Row>
        <Row>
          <Col span="2">
            <label>创建时间</label>
          </Col>
          <Col span="10">
            <span className="content">{data.createdAt}</span>
          </Col>
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
    const basic = this.props.port.current;
    const basicInfo = basic.error ?
      this.renderError(basic.error) :
      this.renderBasicInfo();

    return (
      <div className="basic-info">
        {basic.isFetching ? this.renderFetching() : basicInfo}
      </div>
    );
  }
}
