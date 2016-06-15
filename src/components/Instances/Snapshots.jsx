import React from 'react';
import { Link } from 'react-router';
import Button from 'antd/lib/button';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import classNames from 'classnames';
import Popconfirm from 'antd/lib/popconfirm';
import Input from 'antd/lib/input';
import Spin from 'antd/lib/spin';

export default class Snapshots extends React.Component {
  static propTypes = {
    instance: React.PropTypes.shape({
      current: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        data: React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          snapshots: React.PropTypes.arrayOf(React.PropTypes.shape({
            id: React.PropTypes.string.isRequired,
            createdAt: React.PropTypes.string.isRequired,
            name: React.PropTypes.string.isRequired,
            size: React.PropTypes.string.isRequired,
            status: React.PropTypes.string.isRequired,
          })).isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
    snapshot: React.PropTypes.object.isRequired,
    addSnapshot: React.PropTypes.func.isRequired,
    deleteSnapshot: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      formEditing: false,
      isError: null,
      name: '',
    };
  }

  handleNameChange = (e) => {
    e.preventDefault();
    this.setState({ name: e.target.value });
  };

  handleAddClick = () => {
    this.setState({
      ...this.state,
      formEditing: true,
    });
  };

  handleSaveClick = (e) => {
    e.preventDefault();
    const params = {
      instanceId: this.props.instance.current.data.id,
      name: this.state.name,
    };
    this.props.addSnapshot(params);
    this.setState({ formEditing: false });
  };

  handleCancelClick = (e) => {
    e.preventDefault();

    this.setState({
      ...this.state,
      formEditing: false,
    });
  };

  handleDeleteSnapshot = (id) => () => {
    const instanceId = this.props.instance.current.data.id;
    this.props.deleteSnapshot({ instanceId, id });
  };

  renderSnapshots() {
    const props = this.props.instance.current.data.snapshots;

    return (
      <div>
        {props.map((snapshot, i) => <Row key={i}>
          <Col span="4"><Link to={`/app/snapshots/${snapshot.id}`}>{snapshot.name}</Link></Col>
          <Col span="4">{snapshot.status}</Col>
          <Col span="4">{snapshot.size}</Col>
          <Col span="6">{snapshot.createdAt}</Col>
          <Col span="1">
            <a className="delete">
              <Popconfirm
                title="确定删除快照"
                okText="删除"
                cancelText="取消"
                onConfirm={this.handleDeleteSnapshot(snapshot.id)}
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

  renderAddSnapshots() {
    const formEditing = this.state.formEditing;

    return (
      <div className="basic-info">
        <Row className={classNames({ hide: formEditing }, 'rowHeight')}>
          <Button
            type="primary"
            size="large"
            onClick={this.handleAddClick}
          >
            创建快照
          </Button>
        </Row>
        <Row className={classNames({ hide: !formEditing }, 'rowHeight')}>
          <Col span="8" className="marginRight10px">
            <Input placeholder="请输入快照名" onChange={this.handleNameChange} />
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
    const snapshots = current.error ?
      this.renderError(current.error) :
      this.renderSnapshots(this.props);
    const addSnapshots = this.renderAddSnapshots();

    return (
      <div className="instance-snapshots">
        {addSnapshots}
        <div className="instance-snapshots-header">
          <Row>
            <Col span="4">名称</Col>
            <Col span="4">状态</Col>
            <Col span="4">容量</Col>
            <Col span="6">创建时间</Col>
            <Col span="1">操作</Col>
          </Row>
        </div>
        <div className="instance-snapshots-body">
          {current.isFetching ? this.renderFetching() : snapshots}
        </div>
      </div>
    );
  }
}
