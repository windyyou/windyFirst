import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import { Link } from 'react-router';
import Spin from 'antd/lib/spin';

export default class NetResource extends React.Component {
  static propTypes = {
    stack: React.PropTypes.shape({
      current: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        data: React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          network: React.PropTypes.arrayOf(React.PropTypes.shape({
            id: React.PropTypes.string.isRequired,
            name: React.PropTypes.string.isRequired,
            type: React.PropTypes.string.isRequired,
            status: React.PropTypes.string.isRequired,
            createdAt: React.PropTypes.string.isRequired,
            updatedAt: React.PropTypes.string.isRequired,
          })).isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  };

  renderResources(current) {
    return (
      <div>
        {current.data.network.map((network, i) => <Row key={i}>
          <Col span="4">
            <Link to={`/${network.type}s/${network.id}`}>
              {network.name}
            </Link>
          </Col>
          <Col span="4">{network.type}</Col>
          <Col span="4">{network.status}</Col>
          <Col span="6">{network.updatedAt}</Col>
          <Col span="6">{network.createdAt}</Col>
        </Row>)}
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
    const current = this.props.stack.current;
    const showResources = current.error ?
      this.renderError(current.error) : this.renderResources(current);

    return (
      <div className="instance-snapshots">
        <div className="instance-snapshots-header">
          <Row>
            <Col span="4">名称</Col>
            <Col span="4">类型</Col>
            <Col span="4">状态</Col>
            <Col span="6">更新时间</Col>
            <Col span="6">创建时间</Col>
          </Row>
        </div>
        <div className="alarm-basic-info">
          {current.isFetching ? this.renderFetching() : showResources}
        </div>
      </div>
    );
  }
}
