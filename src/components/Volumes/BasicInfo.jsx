import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Spin from 'antd/lib/spin';
import { Link } from 'react-router';
import classNames from 'classnames';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';

export default class BasicInfo extends React.Component {
  static propTypes = {
    volume: React.PropTypes.shape({
      current: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        data: React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
          size: React.PropTypes.string.isRequired,
          status: React.PropTypes.string.isRequired,
          type: React.PropTypes.string,
          share: React.PropTypes.bool.isRequired,
          instances: React.PropTypes.arrayOf(React.PropTypes.shape({
            id: React.PropTypes.string.isRequired,
            name: React.PropTypes.string.isRequired,
          })).isRequired,
          createdAt: React.PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
    updateVolume: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      nameEditing: false,
      name: props.volume.current.data.name,
    };
  }

  handleNameEditClick = e => {
    e.preventDefault();

    this.setState({
      name: this.props.volume.current.data.name,
      nameEditing: true,
    });
  };

  handleNameSaveClick = e => {
    e.preventDefault();

    let current = this.props.volume.current.data;
    current = {
      ...current,
      name: this.state.name,
    };
    this.props.updateVolume(current);

    // 判断其是否更新完成
    this.setState({
      name: current.name,
      nameEditing: false,
    });
  };

  handleNameCancelClick = e => {
    e.preventDefault();

    this.setState({
      name: this.props.volume.current.data.name,
      nameEditing: false,
    });
  };

  handleNameChange = e => {
    this.setState({
      name: e.target.value,
    });
  };

  renderInstances(instances) {
    return instances.reduce((prev, curr, index) => {
      prev.push(<Link key={curr.id} to={`/app/instances/${curr.id}`}>{curr.name}</Link>);

      if (index !== instances.length - 1) {
        prev.push(', ');
      }

      return prev;
    }, []);
  }

  renderBasicInfo() {
    const data = this.props.volume.current.data;
    const resourcesLink = this.renderInstances(data.instances);

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
            <label>类型</label>
          </Col>
          <Col span="10">
            <span className="content">
              <span className="content">{data.type}</span>
            </span>
          </Col>
        </Row>
        <Row>
          <Col span="2">
            <label>容量</label>
          </Col>
          <Col span="10">
            <span className="content">{data.size}</span>
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
            <label>共享盘</label>
          </Col>
          <Col span="10">
            <span className="content">{data.share ? '是' : '否'}</span>
          </Col>
        </Row>
        <Row>
          <Col span="2">
            <label>挂载到主机</label>
          </Col>
          <Col span="10">
            <span className="content">
              {resourcesLink}
            </span>
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
    const basic = this.props.volume.current;
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
