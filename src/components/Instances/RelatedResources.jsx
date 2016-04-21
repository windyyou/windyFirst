import React from 'react';
import { Link } from 'react-router';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Icon from 'antd/lib/icon';
import RelatedResource from './RelatedResource';

export default class RelatedResources extends React.Component {
  renderRelatedResources() {
    const keys = this.props.instance.currentInstance.keypairs;
    const keysHeader = (<Row>
      <Col span="23">名称</Col>
    </Row>);
    const keysBody = keys.map((pair, i) => <Row key={i}>
      <Col span="23"><Link to="#">{pair.name}</Link></Col>
      <Col span="1"><a className="delete" href="#"><Icon type="minus-circle-o" /></a></Col>
    </Row>);

    const volumes = this.props.instance.currentInstance.disks;
    const volumeHeader = (<Row>
      <Col span="8">名称</Col>
      <Col span="15">容量</Col>
    </Row>);
    const volumeBody = volumes.map((vol, i) => <Row key={i}>
      <Col span="8"><Link to="#">{vol.name}</Link></Col>
      <Col span="15">{vol.size}</Col>
      <Col span="1"><a className="delete" href="#"><Icon type="minus-circle-o" /></a></Col>
    </Row>);

    const networks = this.props.instance.currentInstance.networks;
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

    const key = this.props.instance.error ?
      this.renderError(this.props.instance.error) :
      keysBody;

    const volume = this.props.instance.error ?
      this.renderError(this.props.instance.error) :
      volumeBody;

    const network = this.props.instance.error ?
     this.renderError(this.props.instance.error) :
     networkBody;

    return (
      <Row>
        <Col span="12">
          <RelatedResource
            type="密钥"
            header={keysHeader}
            body={this.props.instance.isFetching ? this.renderFetching() : key}
          />
        </Col>
        <Col span="12">
          <RelatedResource
            type="云硬盘"
            header={volumeHeader}
            body={this.props.instance.isFetching ? this.renderFetching() : volume}
          />
        </Col>
        <Col span="12">
          <RelatedResource
            type="网络"
            header={networkHeader}
            body={this.props.instance.isFetching ? this.renderFetching() : network}
          />
        </Col>
      </Row>
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
    const related = this.props.instance.error ?
      this.renderError(this.props.instance.error) :
      this.renderRelatedResources();
    return (
      <div className="related-resources">
        {this.props.instance.isFetching ? this.renderFetching() : related}
      </div>
    );
  }
}

RelatedResources.propTypes = {
  instance: React.PropTypes.shape({
    isFetching: React.PropTypes.bool.isRequired,
    error: React.PropTypes.object,
    currentInstance: React.PropTypes.shape({
      keypairs: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
      })),
      networks: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        subnet: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        securityGroup: React.PropTypes.string.isRequired,
        floatingIp: React.PropTypes.string.isRequired,
      })),
      disks: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        size: React.PropTypes.number.isRequired,
      })),
    }),
  }).isRequired,
};

