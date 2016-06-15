import React from 'react';
import { Link } from 'react-router';
import Button from 'antd/lib/button';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import classNames from 'classnames';
import Popconfirm from 'antd/lib/popconfirm';
import Select from 'antd/lib/select';
import Spin from 'antd/lib/spin';
import differenceBy from 'lodash/differenceBy';

const Option = Select.Option;

export default class Networks extends React.Component {
  static propTypes = {
    instance: React.PropTypes.shape({
      current: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        data: React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          networks: React.PropTypes.arrayOf(React.PropTypes.shape({
            subnet: React.PropTypes.shape({
              id: React.PropTypes.string.isRequired,
              name: React.PropTypes.string.isRequired,
            }).isRequired,
            port: React.PropTypes.shape({
              id: React.PropTypes.string.isRequired,
              name: React.PropTypes.string.isRequired,
            }).isRequired,
            securityGroup: React.PropTypes.shape({
              id: React.PropTypes.string.isRequired,
              name: React.PropTypes.string.isRequired,
            }).isRequired,
            floatingIp: React.PropTypes.shape({
              id: React.PropTypes.string.isRequired,
              name: React.PropTypes.string.isRequired,
            }).isRequired,
          })).isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
    network: React.PropTypes.shape({
      list: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        data: React.PropTypes.arrayOf(React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
        })).isRequired,
      }).isRequired,
    }).isRequired,
    addNetwork: React.PropTypes.func.isRequired,
    deleteNetwork: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      formEditing: false,
      ids: [],
    };
  }

  handleAddClick = () => {
    this.setState({
      ...this.state,
      formEditing: true,
    });
  };

  handleSaveClick = (e) => {
    e.preventDefault();

    const pid = this.props.instance.current.data.id;
    const params = {
      pid,
      Ids: this.state.ids,
    };
    this.props.addNetwork(params);
    this.setState({
      ...this.state,
      formEditing: false,
      ids: [],
    });
  };

  handleCancelClick = (e) => {
    e.preventDefault();

    this.setState({
      ...this.state,
      formEditing: false,
      ids: [],
    });
  };

  handleSelectChange = (value) => {
    this.setState({
      ...this.state,
      ids: value,
    });
  };

  handleDeleteNetwork = (id) => () => {
    const pid = this.props.instance.current.data.id;
    this.props.deleteNetwork({ pid, id });
  };

  renderNetworks() {
    const props = this.props.instance.current.data.networks;

    return (
      <div>
        {props.map((network, i) => <Row key={i}>
          <Col span="4">
            <Link to={`/app/networks/${network.port.id}`}>{network.port.name}</Link>
          </Col>
          <Col span="4">
            <Link to={`/app/subnets/${network.subnet.id}`}>{network.subnet.name}</Link>
          </Col>
          <Col span="4">
            <Link to={`/app/securityGroups/${network.securityGroup.id}`}>
              {network.securityGroup.name}
            </Link>
          </Col>
          <Col span="4">
            <Link to={`/app/floatingIps/${network.floatingIp.id}`}>{network.floatingIp.name}</Link>
          </Col>
          <Col span="1">
            <a className="delete">
              <Popconfirm
                title="确定删除网络"
                okText="删除"
                cancelText="取消"
                onConfirm={this.handleDeleteNetwork(network.port.id)}
              >
                <i className={ classNames('portalicon', 'portalicon-delete', 'delete') }></i>
              </Popconfirm>
            </a>
          </Col>
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

  renderNetwork() {
    const formEditing = this.state.formEditing;
    const { network } = this.props;
    const hasNetwork = network.list.data.length > 0;
    const props = this.props.instance.current.data.networks;
    const data = !hasNetwork ? null : differenceBy(network.list.data, props, 'id');
    const networkSelect = !hasNetwork ? null : data.map((datum) =>
      <Option key={datum.id} value={datum.id}>{datum.name}</Option>
    );
    const message = !hasNetwork ? 'loading...' : '请选择网络';

    return (
      <div className="basic-info">
        <Row className={classNames({ hide: formEditing }, 'rowHeight')}>
          <Button
            type="primary"
            size="large"
            onClick={this.handleAddClick}
          >
            加入网络
          </Button>
        </Row>
        <Row className={classNames({ hide: !formEditing }, 'rowHeight')}>
          <Col span="6" className="marginRight10px">
            <Select
              multiple
              style={{ width: '100%' }}
              onChange={this.handleSelectChange}
              placeholder={message}
              value={this.state.ids}
            >
              {networkSelect}
            </Select>
          </Col>
          <Col span="2" className="verticalCenter">
            <a
              className={ classNames('save') }
              onClick={this.handleSaveClick}
            >
              <i className={ classNames('portalicon', 'portalicon-save', 'save') }></i>
            </a>
            <a
              className={ classNames('cancel') }
              onClick={this.handleCancelClick}
            >
              <i className={ classNames('portalicon', 'portalicon-cancel', 'cancel') }></i>
            </a>
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    const current = this.props.instance.current;
    const networks = current.error ?
      this.renderError(current.error) :
      this.renderNetworks(this.props);
    const networkFrom = this.renderNetwork();

    return (
      <div className="instance-networks">
        <div className="instance-networks-action">
          {networkFrom}
        </div>
        <div className="instance-networks-header">
          <Row>
            <Col span="4">名称</Col>
            <Col span="4">子网</Col>
            <Col span="4">安全组</Col>
            <Col span="4">公网IP</Col>
            <Col span="1">操作</Col>
          </Row>
        </div>
        <div className="instance-networks-body">
          {current.isFetching ? this.renderFetching() : networks}
        </div>
      </div>
    );
  }
}
