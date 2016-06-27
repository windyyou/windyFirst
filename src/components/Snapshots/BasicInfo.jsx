import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

export default class BasicInfo extends React.Component {

  renderBasicInfo() {
    const prop = this.props.snapshot.current.data;

    return (
      <div className="basic-info">
        <Row>
          <Col span="2">
            <label>名称</label>
          </Col>
          <Col span="10">
            <span className="content">{prop.name}</span>
          </Col>
        </Row>
        <Row>
          <Col span="2">
            <label>系统</label>
          </Col>
          <Col span="10">
            <span className="content">
              {prop.systemName}
            </span>
          </Col>
        </Row>
        <Row>
          <Col span="2">
            <label>容量</label>
          </Col>
          <Col span="10">
            <span className="content">{prop.size}</span>
          </Col>
        </Row>
        <Row>
          <Col span="2">
            <label>状态</label>
          </Col>
          <Col span="10">
            <span className="content">{prop.status}</span>
          </Col>
        </Row>
        <Row>
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
      <span>loading...</span>
    );
  }

  renderError(error) {
    return (
      <span>{error.message}</span>
    );
  }

  render() {
    const { snapshot } = this.props;
    const isFetching = snapshot.current.isFetching;
    const error = snapshot.current.error;

    let contents = '';
    if (isFetching) {
      contents = this.renderFetching();
    } else if (error) {
      contents = this.renderError(error);
    } else {
      contents = this.renderBasicInfo();
    }

    return (
      <div className="basic-info">
        {contents}
      </div>
    );
  }
}

BasicInfo.propTypes = {
  snapshot: React.PropTypes.shape({
    current: React.PropTypes.shape({
      isFetching: React.PropTypes.bool.isRequired,
      error: React.PropTypes.object,
      data: React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        size: React.PropTypes.string.isRequired,
        createdAt: React.PropTypes.string.isRequired,
        status: React.PropTypes.string.isRequired,
        systemName: React.PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};
