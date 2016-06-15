import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import { Link } from 'react-router';

export default class BasicInfo extends React.Component {

  renderVolume(volume) {
    return (
      <Link to={`/app/volumes/${volume.id}`}>{volume.name}</Link>
    );
  }

  renderBasicInfo() {
    const prop = this.props.backup.current.data;

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
            <label>云硬盘</label>
          </Col>
          <Col span="10">
            <span className="content">{this.renderVolume(prop.volume)}</span>
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
    const { backup } = this.props;
    const isFetching = backup.current.isFetching;
    const error = backup.current.error;

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
  backup: React.PropTypes.shape({
    current: React.PropTypes.shape({
      isFetching: React.PropTypes.bool.isRequired,
      error: React.PropTypes.object,
      data: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        status: React.PropTypes.string.isRequired,
        size: React.PropTypes.string.isRequired,
        volume: React.PropTypes.object.isRequired,
        createdAt: React.PropTypes.string.isRequired,
      })).isRequired,
    }).isRequired,
  }).isRequired,
};
