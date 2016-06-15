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

export default class Volumes extends React.Component {
  static propTypes = {
    instance: React.PropTypes.shape({
      current: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        data: React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          volumes: React.PropTypes.arrayOf(React.PropTypes.shape({
            id: React.PropTypes.string.isRequired,
            name: React.PropTypes.string.isRequired,
            size: React.PropTypes.string.isRequired,
            type: React.PropTypes.string.isRequired,
          })).isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
    volume: React.PropTypes.object.isRequired,
    addVolume: React.PropTypes.func.isRequired,
    deleteVolume: React.PropTypes.func.isRequired,
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
    this.props.addVolume(params);
    this.setState({
      ...this.state,
      ids: [],
      formEditing: false,
    });
  };

  handleCancelClick = (e) => {
    e.preventDefault();

    this.setState({
      ...this.state,
      ids: [],
      formEditing: false,
    });
  };

  handleSelectChange = (value) => {
    this.setState({
      ...this.state,
      ids: value,
    });
  };

  handleDeleteVolume = (id) => () => {
    const pid = this.props.instance.current.data.id;
    this.props.deleteVolume({ pid, id });
  };

  renderVolumes() {
    const props = this.props.instance.current.data.volumes;

    return (
      <div>
        {props.map((volume, i) => <Row key={i}>
          <Col span="4"><Link to={`/app/volumes/${volume.id}`}>{volume.name}</Link></Col>
          <Col span="4">{volume.size}</Col>
          <Col span="4">{volume.type}</Col>
          <Col span="1">
            <a className="delete">
              <Popconfirm
                title="确定删除云硬盘"
                okText="删除"
                cancelText="取消"
                onConfirm={this.handleDeleteVolume(volume.id)}
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

  renderVolume() {
    const formEditing = this.state.formEditing;
    const { volume } = this.props;
    const hasVolume = volume.list.data.length > 0;
    const props = this.props.instance.current.data.volumes;
    const data = !hasVolume ? null : differenceBy(volume.list.data, props, 'id');
    const volumeSelect = !hasVolume ? null : data.map((datum) =>
      <Option key={datum.id} value={datum.id}>{datum.name}</Option>
    );
    const message = !hasVolume ? 'loading...' : '请选择云硬盘';

    return (
      <div className="basic-info">
        <Row className={classNames({ hide: formEditing }, 'rowHeight')}>
          <Button
            type="primary"
            size="large"
            onClick={this.handleAddClick}
          >
            挂载云硬盘
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
              {volumeSelect}
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
    const volumes = current.error ?
      this.renderError(current.error) :
      this.renderVolumes(this.props);
    const volumeFrom = this.renderVolume();

    return (
      <div className="instance-volumes">
        <div className="instance-volumes-action">
          {volumeFrom}
        </div>
        <div className="instance-volumes-header">
          <Row>
            <Col span="4">名称</Col>
            <Col span="4">容量</Col>
            <Col span="4">类型</Col>
            <Col span="1">操作</Col>
          </Row>
        </div>
        <div className="instance-volumes-body">
          {current.isFetching ? this.renderFetching() : volumes}
        </div>
      </div>
    );
  }
}
