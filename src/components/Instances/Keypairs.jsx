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

export default class Keypairs extends React.Component {
  static propTypes = {
    instance: React.PropTypes.shape({
      current: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        data: React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          keypairs: React.PropTypes.arrayOf(React.PropTypes.shape({
            id: React.PropTypes.string.isRequired,
            name: React.PropTypes.string.isRequired,
          })).isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
    keypair: React.PropTypes.object.isRequired,
    addKeypair: React.PropTypes.func.isRequired,
    deleteKeypair: React.PropTypes.func.isRequired,
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

  handleSaveClick = e => {
    e.preventDefault();

    const pid = this.props.instance.current.data.id;
    const params = {
      pid,
      Ids: this.state.ids,
    };
    this.props.addKeypair(params);
    this.setState({
      ...this.state,
      formEditing: false,
      ids: [],
    });
  };

  handleCancelClick = e => {
    e.preventDefault();

    this.setState({
      ...this.state,
      formEditing: false,
      ids: [],
    });
  };

  handleSelectChange = value => {
    this.setState({
      ...this.state,
      ids: value,
    });
  };

  handleDeleteKeypair = id => () => {
    const pid = this.props.instance.current.data.id;
    this.props.deleteKeypair({ pid, id });
  };

  renderKeypairs() {
    const props = this.props.instance.current.data.keypairs;

    return (
      <div>
        {props.map((keypair, i) => <Row key={i}>
          <Col span="4"><Link to={`/app/keypairs/${keypair.id}`}>{keypair.name}</Link></Col>
          <Col span="1">
            <a className="delete">
              <Popconfirm
                title="确定删除密钥"
                okText="删除"
                cancelText="取消"
                onConfirm={this.handleDeleteKeypair(keypair.id)}
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

  renderKeypair() {
    const formEditing = this.state.formEditing;
    const { keypair } = this.props;
    const hasKeypair = keypair.list.data.length > 0;
    const props = this.props.instance.current.data.keypairs;
    const data = !hasKeypair ? null : differenceBy(keypair.list.data, props, 'id');
    const keypairSelect = !hasKeypair ? null : data.map(datum =>
      <Option key={datum.id} value={datum.id}>{datum.name}</Option>
    );
    const message = !hasKeypair ? 'loading...' : '请选择密钥';

    return (
      <div className="basic-info">
        <Row className={classNames({ hide: formEditing }, 'rowHeight')}>
          <Button
            type="primary"
            size="large"
            onClick={this.handleAddClick}
          >
            添加密钥
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
              {keypairSelect}
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
    const current = this.props.instance.current;
    const keypairs = current.error ?
      this.renderError(current.error) :
      this.renderKeypairs(this.props);
    const keypairFrom = this.renderKeypair();

    return (
      <div className="instance-keypairs">
        <div className="instance-keypairs-action">
          {keypairFrom}
        </div>
        <div className="instance-keypairs-header">
          <Row>
            <Col span="4">名称</Col>
            <Col span="1">操作</Col>
          </Row>
        </div>
        <div className="instance-keypairs-body">
          {current.isFetching ? this.renderFetching() : keypairs}
        </div>
      </div>
    );
  }
}
