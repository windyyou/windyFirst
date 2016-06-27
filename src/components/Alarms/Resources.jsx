import React from 'react';
import Button from 'antd/lib/button';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Select from 'antd/lib/select';
import classNames from 'classnames';
import { Link } from 'react-router';
import Popconfirm from 'antd/lib/popconfirm';
import Spin from 'antd/lib/spin';

export default class Resources extends React.Component {
  static propTypes = {
    alarm: React.PropTypes.shape({
      current: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        data: React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          resources: React.PropTypes.arrayOf(React.PropTypes.shape({
            id: React.PropTypes.string.isRequired,
            name: React.PropTypes.string.isRequired,
            status: React.PropTypes.string.isRequired,
          })).isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
    addAlarmResource: React.PropTypes.func.isRequired,
    deleteAlarmResource: React.PropTypes.func.isRequired,
    instance: React.PropTypes.object.isRequired,
    bareMetal: React.PropTypes.object.isRequired,
    service: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      formEditing: false,
    };
  }

  getData(mockData, resources) {
    const data = mockData.list.data.length > 0 ?
      mockData.list.data.map(datum =>
        ({ ...datum, id: datum.id, name: datum.name })) : [];

    const t1 = [];
    const t2 = [];
    for (let i = 0; i < resources.length; i++) {
      t1[resources[i].id] = true;
    }

    for (let i = 0; i < data.length; i++) {
      if (!t1[data[i].id]) {
        t2.push(data[i]);
      }
    }

    return t2;
  }

  handleAddClick = () => {
    this.setState({
      ...this.state,
      formEditing: true,
    });
  };

  handleSaveClick = e => {
    e.preventDefault();

    const pid = this.props.alarm.current.data.id;
    const params = {
      pid,
      Ids: this.state.ids,
    };
    this.props.addAlarmResource(params);
    this.setState({
      ...this.state,
      formEditing: false,
    });
  };

  handleCancelClick = e => {
    e.preventDefault();

    this.setState({
      ...this.state,
      formEditing: false,
    });
  };

  handleDeleteClick = id => () => {
    const pid = this.props.alarm.current.data.id;
    this.props.deleteAlarmResource({ pid, id });
  };

  handleSelectChange = value => {
    this.setState({
      ...this.state,
      ids: value,
    });
  };

  renderResources(current) {
    return (
      <div>
        {current.data.resources.map((resource, i) => <Row key={i}>
          <Col span="4">
            <Link to={`/${current.data.type}s/${resource.id}`}>
              {resource.name}
            </Link>
          </Col>
          <Col span="5">{current.data.type}</Col>
          <Col span="4">{resource.status}</Col>
          <Col span="1">
            <a className="delete">
              <Popconfirm
                title="确定删除对象"
                okText="删除"
                cancelText="取消"
                onConfirm={this.handleDeleteClick(resource.id)}
              >
                <i className={classNames('portalicon', 'portalicon-delete', 'delete')}></i>
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

  renderAddResourceForm() {
    const current = this.props.alarm.current;
    const resources = current.data.resources;
    const formEditing = this.state.formEditing;
    const { instance, bareMetal, service } = this.props;
    const type = current.data.type;
    const resourceMap = new Map([
      ['instance', instance],
      ['bareMetal', bareMetal],
      ['service', service],
    ]);
    const data = type === '' ? [] : this.getData(resourceMap.get(type), resources);
    const message = type === '' ? 'loading...' : '请选择监控对象';
    const object = type === '' ? null : data.map(status =>
      <Option key={status.id} value={status.id}>{status.name}</Option>
    );

    return (
      <div className="basic-info">
        <Row className={classNames({ hide: formEditing }, 'rowHeight')}>
          <Button
            type="primary"
            size="large"
            onClick={this.handleAddClick}
          >
            添加监控对象
          </Button>
        </Row>
        <Row className={classNames({ hide: !formEditing }, 'rowHeight')}>
          <Col span="6" className="marginRight10px">
            <Select
              multiple
              style={{ width: '100%' }}
              onChange={this.handleSelectChange}
              placeholder={message}
            >
              {object}
            </Select>
          </Col>
          <Col span="2" className="verticalCenter">
            <a
              className={classNames('save')}
              onClick={this.handleSaveClick}
            >
              <i className={classNames('portalicon', 'portalicon-save', 'save')}></i>
            </a>
            <a
              className={classNames('cancel')}
              onClick={this.handleCancelClick}
            >
              <i className={classNames('portalicon', 'portalicon-cancel', 'cancel')}></i>
            </a>
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    const { alarm } = this.props;

    let addConfigs = '';
    if (alarm.config.isFetching) {
      addConfigs = this.renderFetching();
    } else if (!!alarm.config.error) {
      addConfigs = this.renderError(alarm.config.error);
    } else if (alarm.config.data.item.length > 0) {
      addConfigs = this.renderAddResourceForm();
    }

    const current = this.props.alarm.current;
    const hasType = current.data.type === null ?
      this.renderFetching() : this.renderResources(current);
    const showResources = current.error ?
      this.renderError(current.error) : hasType;

    return (
      <div className="instance-snapshots">
        {addConfigs}
        <div className="instance-snapshots-header">
          <Row>
            <Col span="4">对象</Col>
            <Col span="5">类型</Col>
            <Col span="4">状态</Col>
            <Col span="4">操作</Col>
            <Col span="1" />
          </Row>
        </div>
        <div className="alarm-basic-info">
          {current.isFetching ? this.renderFetching() : showResources}
        </div>
      </div>
    );
  }
}
