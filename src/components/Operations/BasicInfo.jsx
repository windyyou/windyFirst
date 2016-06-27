import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Spin from 'antd/lib/spin';
import { Link } from 'react-router';

export default class BasicInfo extends React.Component {

  renderBasicInfo() {
    function renderResource(resources) {
      return resources.reduce((prev, curr, index) => {
        prev.push(<Link key={curr.id} to={`/${curr.type}/${curr.id}`}>{curr.name}</Link>);

        if (index !== resources.length - 1) {
          prev.push(', ');
        }

        return prev;
      }, []);
    }

    const prop = this.props.operation.current.data;
    const resourcesLink = renderResource(prop.resources);

    return (
      <div className="basic-info">
        <Row>
          <Col span="2">
            <label>操作</label>
          </Col>
          <Col span="10">
            <span className="content">{prop.title}</span>
          </Col>
        </Row>
        <Row>
          <Col span="2">
            <label>资源</label>
          </Col>
          <Col span="10">
            <span className="content">
              {resourcesLink}
            </span>
          </Col>
        </Row>
        <Row>
          <Col span="2">
            <label>操作者</label>
          </Col>
          <Col span="10">
            <span className="content">{prop.user}</span>
          </Col>
        </Row>
        <Row>
          <Col span="2">
            <label>操作状态</label>
          </Col>
          <Col span="10">
            <span className="content">{prop.status}</span>
          </Col>
        </Row>
        <Row>
          <Col span="2">
            <label>操作时间</label>
          </Col>
          <Col span="10">
            <span className="content">{prop.timestamp}</span>
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
    const basic = this.props.operation.current;
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

BasicInfo.propTypes = {
  operation: React.PropTypes.shape({
    current: React.PropTypes.shape({
      isFetching: React.PropTypes.bool.isRequired,
      error: React.PropTypes.object,
      data: React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        user: React.PropTypes.string.isRequired,
        timestamp: React.PropTypes.string.isRequired,
        status: React.PropTypes.string.isRequired,
        resources: React.PropTypes.arrayOf(React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
          type: React.PropTypes.string.isRequired,
        })).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};
