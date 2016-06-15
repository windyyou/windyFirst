import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Spin from 'antd/lib/spin';

export default class BasicInfo extends React.Component {
  static propTypes = {
    user: React.PropTypes.shape({
      current: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        data: React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          account: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
          email: React.PropTypes.string.isRequired,
          phone: React.PropTypes.string.isRequired,
          company: React.PropTypes.string.isRequired,
          enabled: React.PropTypes.bool.isRequired,
          createdAt: React.PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  };

  renderBasicInfo() {
    const prop = this.props.user.current.data;
    const enabled = prop.enabled === true ? '启用' : '禁用';

    return (
      <div className="basic-info">
        <Row className="rowHeight">
          <Col span="2">
            <label>用户名</label>
          </Col>
          <Col span="10">
            <span className="content">{prop.account}</span>
          </Col>
        </Row>
        <Row className="rowHeight">
          <Col span="2">
            <label>状态</label>
          </Col>
          <Col span="10">
          <span className="content">
            {enabled}
          </span>
          </Col>
        </Row>
        <Row className="rowHeight">
          <Col span="2">
            <label>真实姓名</label>
          </Col>
          <Col span="10">
            <span className="content">{prop.name}</span>
          </Col>
        </Row>
        <Row className="rowHeight">
          <Col span="2">
            <label>邮箱</label>
          </Col>
          <Col span="10">
            <span className="content">{prop.email}</span>
          </Col>
        </Row>
        <Row className="rowHeight">
          <Col span="2">
            <label>手机</label>
          </Col>
          <Col span="10">
            <span className="content">{prop.phone}</span>
          </Col>
        </Row>
        <Row className="rowHeight">
          <Col span="2">
            <label>公司</label>
          </Col>
          <Col span="10">
            <span className="content">{prop.company}</span>
          </Col>
        </Row>
        <Row className="rowHeight">
          <Col span="2">
            <label>创建时间</label>
          </Col>
          <Col span="10">
            <span className="content">{prop.createdAt}</span>
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
    const basic = this.props.user.current;
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
