import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';

import classNames from 'classnames';

export default class BasicInfo extends React.Component {
  static propTypes = {
    notificationList: React.PropTypes.shape({
      current: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        data: React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
          description: React.PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
    updateNotificationList: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      nameEditing: false,
      descriptionEditing: false,
      name: props.notificationList.current.data.name,
      description: props.notificationList.current.data.description,
    };
  }

  handleNameEditClick = e => {
    e.preventDefault();

    this.setState({
      ...this.state,
      name: this.props.notificationList.current.data.name,
      nameEditing: true,
    });
  };

  handleNameSaveClick = e => {
    e.preventDefault();

    let currentNotificationList = this.props.notificationList.current.data;
    currentNotificationList = {
      ...currentNotificationList,
      name: this.state.name,
    };
    this.props.updateNotificationList(currentNotificationList);

    // 判断其是否更新完成
    this.setState({
      ...this.state,
      name: currentNotificationList.name,
      nameEditing: false,
    });
  };

  handleNameCancelClick = e => {
    e.preventDefault();

    this.setState({
      ...this.state,
      name: this.props.notificationList.current.data.name,
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
      ...this.state,
      description: this.props.notificationList.current.data.description,
      descriptionEditing: true,
    });
  };

  handleDescriptionSaveClick = e => {
    e.preventDefault();

    let currentNotificationList = this.props.notificationList.current.data;
    currentNotificationList = {
      ...currentNotificationList,
      description: this.state.description,
    };
    this.props.updateNotificationList(currentNotificationList);
    this.setState({
      ...this.state,
      descriptionEditing: false,
      description: currentNotificationList.description,
    });
  };

  handleDescriptionCancelClick = e => {
    e.preventDefault();

    this.setState({
      ...this.state,
      descriptionEditing: false,
      description: this.props.notificationList.current.data.description,
    });
  };

  handleDescriptionChange = e => {
    this.setState({
      ...this.state,
      description: e.target.value,
    });
  };

  renderNameContent() {
    const currentNotificationList = this.props.notificationList.current.data;

    return (
      <div>
        <Row className="rowHeight">
          <Col span="1"><label>名称：</label></Col>
          <Col
            span="6"
            className={classNames({ hide: this.state.nameEditing })}
          >
            <span>{currentNotificationList.name}</span>
            <a
              href="#"
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
              href="#"
              className="save"
              onClick={this.handleNameSaveClick}
            >
              <i className={classNames('portalicon', 'portalicon-save', 'save')}></i>
            </a>
            <a
              href="#"
              className="cancel"
              onClick={this.handleNameCancelClick}
            >
              <i className={classNames('portalicon', 'portalicon-cancel', 'cancel')}></i>
            </a>
          </Col>
        </Row>
      </div>
    );
  }

  renderDescriptionContent() {
    const currentNotificationList = this.props.notificationList.current.data;
    const hideEditingClass = classNames({
      hide: this.state.descriptionEditing,
    });
    const showEditingClass = classNames({
      hide: !this.state.descriptionEditing,
    });

    return (
      <div>
        <Row className="rowHeight">
          <Col span="1"><label>描述：</label></Col>
          <div className={hideEditingClass} >
            <span>{currentNotificationList.description}</span>
            <a
              href="#"
              onClick={this.handleDescriptionEditClick}
            >
              <Icon type="edit" />
            </a>
          </div>
          <div className={showEditingClass} >
            <Input
              style={{ width: '60%' }}
              onChange={this.handleDescriptionChange}
              placeholder="请输入描述"
              type="textarea"
              value={this.state.description}
            />
            <a
              href="#"
              className="save"
              onClick={this.handleDescriptionSaveClick}
            >
              <i className={classNames('portalicon', 'portalicon-save', 'save')}></i>
            </a>
            <a
              href="#"
              className="cancel"
              onClick={this.handleDescriptionCancelClick}
            >
              <i className={classNames('portalicon', 'portalicon-cancel', 'cancel')}></i>
            </a>
          </div>
        </Row>
      </div>
    );
  }

  renderFecthing() {
    return (
      <span>fetching...</span>
    );
  }

  renderError(error) {
    return (
      <span>{error.message}</span>
    );
  }

  renderContent = () => (
    <div>
      {this.renderNameContent()}
      {this.renderDescriptionContent()}
    </div>
  );

  render() {
    const current = this.props.notificationList;
    const renderContent = current.error ?
      this.renderError(current.error) :
      this.renderContent();

    return (
      <div className="notification-list-basic-info">
        {current.isFetching ? this.renderFecthing() : renderContent}
      </div>
    );
  }

}
