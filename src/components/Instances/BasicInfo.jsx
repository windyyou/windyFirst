import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Icon from 'antd/lib/icon';
import Spin from 'antd/lib/spin';
import { Link } from 'react-router';
import classNames from 'classnames';
import { Input } from 'antd';

export default class BasicInfo extends React.Component {
  static propTypes = {
    instance: React.PropTypes.shape({
      current: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        data: React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
          status: React.PropTypes.string.isRequired,
          type: React.PropTypes.string.isRequired,
          systemName: React.PropTypes.string.isRequired,
          ips: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
          floatingIps: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
          createdAt: React.PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
    updateInstance: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      nameEditing: false,
      name: props.instance.current.data.name,
    };
  }

  handleNameEditClick = (e) => {
    e.preventDefault();

    this.setState({
      name: this.props.instance.current.data.name,
      nameEditing: true,
    });
  };

  handleNameSaveClick = (e) => {
    e.preventDefault();

    let current = this.props.instance.current.data;
    current = {
      ...current,
      name: this.state.name,
    };
    this.props.updateInstance(current);

    // 判断其是否更新完成
    this.setState({
      ...this.state,
      name: current.name,
      nameEditing: false,
    });
  };

  handleNameCancelClick = (e) => {
    e.preventDefault();

    this.setState({
      ...this.state,
      name: this.props.instance.current.data.name,
      nameEditing: false,
    });
  };

  handleNameChange = (e) => {
    this.setState({
      ...this.state,
      name: e.target.value,
    });
  };

  renderBasicInfo() {
    const props = this.props.instance.current.data;

    const ips = props.ips.join(', ');
    const floatingIps = props.floatingIps.join(', ');
    return (
      <div className="basic-info">
        <Row>
          <Col span="2">
            <label>名称</label>
          </Col>
          <Col
            span="10"
            className={classNames({ hide: this.state.nameEditing })}
          >
            <span>{props.name}</span>
            <a
              onClick={this.handleNameEditClick}
            >
              <Icon type="edit" />
            </a>
          </Col>
          <Col
            span="10"
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
              <i
                className={ classNames('portalicon', 'portalicon-save', 'save', 'verticalCenter') }
              >
              </i>
            </a>
            <a
              className="cancel"
              onClick={this.handleNameCancelClick}
            >
              <i
                className={
                classNames('portalicon', 'portalicon-cancel', 'cancel', 'verticalCenter')
                 }
              >
              </i>
            </a>
          </Col>
          <Col span="2">
            <label>内网IP</label>
          </Col>
          <Col span="10">
            <span className="content">
              {ips}
            </span>
          </Col>
        </Row>
        <Row>
          <Col span="2">
            <label>状态</label>
          </Col>
          <Col span="10">
          <span className="content">
            {props.status}
          </span>
          </Col>
          <Col span="2">
            <label>公网IP</label>
          </Col>
          <Col span="10">
            <span className="content">{floatingIps}</span>
          </Col>
        </Row>
        <Row>
          <Col span="2">
            <label>配置</label>
          </Col>
          <Col span="10">
            <span className="content">{props.type}</span>
          </Col>
          <Col span="2">
            <label>系统</label>
          </Col>
          <Col span="10">
            <span className="content">{props.systemName}</span>
          </Col>
        </Row>
        <Row>
          <Col span="2">
            <label>创建时间</label>
          </Col>
          <Col span="10">
            <span className="content">{props.createdAt}</span>
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
    const basic = this.props.instance.current;

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
