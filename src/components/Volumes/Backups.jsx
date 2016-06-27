import React from 'react';
import Button from 'antd/lib/button';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import classNames from 'classnames';
import Popconfirm from 'antd/lib/popconfirm';
import Spin from 'antd/lib/spin';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';

const FormItem = Form.Item;

class Volumes extends React.Component {
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
          createdAt: React.PropTypes.string.isRequired,
          backups: React.PropTypes.array.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
    deleteBackup: React.PropTypes.func.isRequired,
    addBackup: React.PropTypes.func.isRequired,
    form: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      formEditing: false,
      name: '',
      id: '',
    };
  }

  handleAddClick = () => {
    this.setState({
      formEditing: true,
    });
  };

  handleSaveClick = e => {
    this.props.form.validateFields(errors => {
      e.preventDefault();
      if (!!errors) {
        this.setState({
          formEditing: true,
        });
        return;
      }

      const volumeId = this.props.volume.current.data.id;
      const params = {
        volumeId,
        name: this.state.name,
      };
      this.props.addBackup(params).then(() => {
        this.setState({
          name: '',
          formEditing: false,
        });
        this.props.form.resetFields();
      });
    });
  };

  handleCancelClick = e => {
    e.preventDefault();

    this.setState({
      name: '',
      formEditing: false,
    });
    this.props.form.resetFields();
  };

  handleDeleteBackup = id => () => {
    const pid = this.props.volume.current.data.id;
    this.props.deleteBackup({ pid, id });
  };

  handleNameChange = e => {
    this.setState({
      name: e.target.value,
    });
  };

  renderVolumes() {
    const props = this.props.volume.current.data.backups;

    return (
      <div>
        {props.map((backup, i) => <Row key={i}>
          <Col span="4">{backup.name}</Col>
          <Col span="4">{backup.status}</Col>
          <Col span="4">{backup.size}</Col>
          <Col span="4">{backup.createdAt}</Col>
          <Col span="1">
            <a className="delete">
              <Popconfirm
                title="确定删除备份"
                okText="删除"
                cancelText="取消"
                onConfirm={this.handleDeleteBackup(backup.id)}
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

  renderBackup() {
    const { getFieldProps } = this.props.form;
    const formEditing = this.state.formEditing;
    const nameProps = getFieldProps('name', {
      rules: [
        { required: true, message: '名称必填' },
      ],
      trigger: ['onBlur', 'onChange'],
      validateTrigger: ['onBlur', 'onChange'],
    });
    return (
      <div className="basic-info">
        <Row className={classNames({ hide: formEditing }, 'rowHeight')}>
          <Button
            type="primary"
            size="large"
            onClick={this.handleAddClick}
          >
            创建备份
          </Button>
        </Row>
        <Form inline horizontal form={this.props.form}>
          <Row className={classNames({ hide: !formEditing }, 'rowHeight')}>
            <FormItem>
              <Input
                {...nameProps}
                placeholder="请输入名称"
                onChange={this.handleNameChange}
                name="name"
                value={this.state.name}
              />
            </FormItem>
            <FormItem>
              <a
                className={classNames('save')}
                onClick={this.handleSaveClick}
              >
                <i className={classNames('portalicon', 'portalicon-save', 'save')}></i>
              </a>
            </FormItem>
            <FormItem>
              <a
                className={classNames('cancel')}
                onClick={this.handleCancelClick}
              >
                <i className={classNames('portalicon', 'portalicon-cancel', 'cancel')}></i>
              </a>
            </FormItem>
          </Row>
        </Form>
      </div>
    );
  }

  render() {
    const current = this.props.volume.current;
    const backups = current.error ?
      this.renderError(current.error) :
      this.renderVolumes(this.props);
    const backupsFrom = this.renderBackup();

    return (
      <div className="volume-volumes">
        <div className="volume-volumes-action">
          {backupsFrom}
        </div>
        <div className="volume-volumes-header">
          <Row>
            <Col span="4">名称</Col>
            <Col span="4">状态</Col>
            <Col span="4">容量</Col>
            <Col span="4">创建时间</Col>
            <Col span="1">操作</Col>
          </Row>
        </div>
        <div className="volume-volumes-body">
          {current.isFetching ? this.renderFetching() : backups}
        </div>
      </div>
    );
  }
}

export default Form.create()(Volumes);
