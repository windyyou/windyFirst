import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Icon from 'antd/lib/icon';
import Spin from 'antd/lib/spin';
import { Input } from 'antd';
import classNames from 'classnames';

export default class BasicInfo extends React.Component {
  static propTypes = {
    alarm: React.PropTypes.shape({
      current: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        data: React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
          enable: React.PropTypes.string.isRequired,
          status: React.PropTypes.string.isRequired,
          createdAt: React.PropTypes.string.isRequired,
          description: React.PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
    updateAlarm: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      nameEditing: false,
      descriptionEditing: false,
      name: props.alarm.current.data.name,
      description: props.alarm.current.data.description,
    };
  }

  handleNameEditClick = e => {
    e.preventDefault();

    this.setState({
      name: this.props.alarm.current.data.name,
      nameEditing: true,
    });
  };

  handleNameSaveClick = e => {
    e.preventDefault();

    let current = this.props.alarm.current.data;
    current = {
      ...current,
      name: this.state.name,
    };
    this.props.updateAlarm(current);

    // 判断其是否更新完成
    this.setState({
      ...this.state,
      name: current.name,
      nameEditing: false,
    });
  };

  handleNameCancelClick = e => {
    e.preventDefault();

    this.setState({
      ...this.state,
      name: this.props.alarm.current.data.name,
      nameEditing: false,
    });
  };

  handleNameChange = e => {
    this.setState({
      ...this.state,
      name: e.target.value,
    });
  };

  handleDescriptionEditClick = e => {
    e.preventDefault();

    this.setState({
      description: this.props.alarm.current.data.description,
      descriptionEditing: true,
    });
  };

  handleDescriptionSaveClick = e => {
    e.preventDefault();

    let current = this.props.alarm.current.data;
    current = {
      ...current,
      description: this.state.description,
    };
    this.props.updateAlarm(current);
    this.setState({
      ...this.state,
      descriptionEditing: false,
      description: current.description,
    });
  };

  handleDescriptionCancelClick = e => {
    e.preventDefault();

    this.setState({
      ...this.state,
      descriptionEditing: false,
      description: this.props.alarm.current.data.description,
    });
  };

  handleDescriptionChange = e => {
    this.setState({
      ...this.state,
      description: e.target.value,
    });
  };

  renderBasicInfo() {
    const prop = this.props.alarm.current.data;
    const hideEditingClass = classNames({
      hide: this.state.descriptionEditing,
    });
    const showEditingClass = classNames({
      hide: !this.state.descriptionEditing,
    });

    return (
      <div className="rowHeight">
        <Row>
          <Col span="2">
            <label>名称</label>
          </Col>
          <Col
            span="6"
            className={classNames({ hide: this.state.nameEditing })}
          >
            <span>{prop.name}</span>
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
        <Row className="rowHeight">
          <Col span="2"><label>描述：</label></Col>
          <div className={hideEditingClass} >
            <span>{prop.description}</span>
            <a
              onClick={this.handleDescriptionEditClick}
            >
              <Icon type="edit" />
            </a>
          </div>
          <div className={showEditingClass} >
            <Input
              style={{ width: '30%' }}
              onChange={this.handleDescriptionChange}
              placeholder="请输入描述"
              type="textarea"
              value={this.state.description}
            />
            <a
              className="save"
              onClick={this.handleDescriptionSaveClick}
            >
              <i className={classNames('portalicon', 'portalicon-save', 'save')}></i>
            </a>
            <a
              className="cancel"
              onClick={this.handleDescriptionCancelClick}
            >
              <i className={classNames('portalicon', 'portalicon-cancel', 'cancel')}></i>
            </a>
          </div>
        </Row>
        <Row>
          <Col span="2">
            <label>启用状态</label>
          </Col>
          <Col span="10">
            <span className="content">{prop.enable}</span>
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
      <Spin size="default" />
    );
  }

  renderError(error) {
    return (
      <span>{error.message}</span>
    );
  }

  render() {
    const basic = this.props.alarm.current;
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
