import React from 'react';
import { Link } from 'react-router';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Spin from 'antd/lib/spin';
import classNames from 'classnames';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';

export default class BasicInfo extends React.Component {
  static propTypes = {
    router: React.PropTypes.shape({
      current: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        data: React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
          publicGateway: React.PropTypes.string.isRequired,
          createdAt: React.PropTypes.string.isRequired,
          status: React.PropTypes.string.isRequired,
          floatingIp: React.PropTypes.shape({
            id: React.PropTypes.string.isRequired,
            name: React.PropTypes.string.isRequired,
          }),
        }).isRequired,
      }).isRequired,
    }).isRequired,
    updateRouter: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      nameEditing: false,
      name: props.router.current.data.name,
    };
  }

  handleNameEditClick = e => {
    e.preventDefault();

    this.setState({
      name: this.props.router.current.data.name,
      nameEditing: true,
    });
  };

  handleNameSaveClick = e => {
    e.preventDefault();

    let current = this.props.router.current.data;
    current = {
      ...current,
      name: this.state.name,
    };
    this.props.updateRouter(current)
      .then(() => this.setState({
        name: current.name,
        nameEditing: false,
      }));
  };

  handleNameCancelClick = e => {
    e.preventDefault();

    this.setState({
      name: this.props.router.current.data.name,
      nameEditing: false,
    });
  };

  handleNameChange = e => {
    this.setState({
      name: e.target.value,
    });
  };

  renderFloatingIp(data) {
    if (data.floatingIp) {
      return <Link to={`/app/floating-ips/${data.floatingIp.id}`}>{data.floatingIp.name}</Link>;
    }

    return '-';
  }

  renderBasicInfo() {
    const { data } = this.props.router.current;

    return (
      <div className="basic-info">
        <Row>
          <Col span="2">
            <label>名称</label>
          </Col>
          <Col
            span="6"
            className={classNames({ hide: this.state.nameEditing })}
          >
            <span>{data.name}</span>
            <a
              onClick={this.handleNameEditClick}
            >
              <Icon type="edit" />
            </a>
          </Col>
          <Col
            span="6"
            className={classNames({ hide: !this.state.nameEditing })}
          >
            <Input
              style={{ width: '60%' }}
              onChange={this.handleNameChange}
              placeholder="请输入名称"
              size="small"
              value={this.state.name}
            />
            <a
              className="save"
              onClick={this.handleNameSaveClick}
            >
              <i className={classNames('portalicon', 'portalicon-save', 'save')}></i>
            </a>
            <a
              className="cancel"
              onClick={this.handleNameCancelClick}
            >
              <i className={classNames('portalicon', 'portalicon-cancel', 'cancel')}></i>
            </a>
          </Col>
        </Row>
        <Row>
          <Col span="2">
            <label>公网网关</label>
          </Col>
          <Col span="10">
            <span className="content">
              <span className="content">
                {data.publicGateway ? '开启' : '关闭'}
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
    const basic = this.props.router.current;
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
