import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Form from 'antd/lib/form';
import Select from 'antd/lib/select';
import Button from 'antd/lib/button';
import Spin from 'antd/lib/spin';
import Input from 'antd/lib/input';
import Checkbox from 'antd/lib/checkbox';
import classNames from 'classnames';
import FormButtonArea from '../../../common/FormButtonArea';

const Option = Select.Option;
const FormItem = Form.Item;

class Step1 extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    spec: React.PropTypes.object.isRequired,
    stack: React.PropTypes.object.isRequired,
    handleNextClick: React.PropTypes.func.isRequired,
    handleSpecChange: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      formEditing: false,
      countValidation: '',
      name: '',
      CIDR: '',
      ipVersion: undefined,
      gateway: '',
      DHCP: false,
    };
  }

  handleAddClick = () => {
    this.setState({
      formEditing: true,
      countValidation: '',
    });
  };

  handleSaveClick = (e) => {
    this.props.form.validateFields((errors) => {
      e.preventDefault();
      if (!!errors) {
        return;
      }

      this.addNetWork();
    });
  };

  checkDuplicate(array, name) {
    let ret = false;
    for (const data of array) {
      if (data.name === name) {
        ret = true;
      }
    }

    return ret;
  }

  addNetWork = () => {
    if (this.checkDuplicate(this.props.spec.network, this.state.name)) {
      this.setState({
        countValidation: '网络名重复',
      });
      return;
    }

    const net = this.props.spec.network.slice(0);
    net.push({
      name: this.state.name,
      CIDR: this.state.CIDR,
      ipVersion: this.state.ipVersion,
      gateway: this.state.gateway,
      DHCP: this.state.DHCP,
    });

    const event = {
      target: {
        name: 'network',
        value: net,
      },
    };
    this.props.handleSpecChange(event);
    this.setState({
      formEditing: false,
      countValidation: '',
      name: '',
      CIDR: '',
      ipVersion: undefined,
      gateway: '',
      DHCP: false,
    });
    this.props.form.resetFields();
  };

  handleCancelClick = (e) => {
    e.preventDefault();

    this.setState({
      formEditing: false,
      countValidation: '',
    });
  };

  handleDeleteClick = (index) => () => {
    const net = this.props.spec.network.slice(0);
    net.splice(index, 1);

    const event = {
      target: {
        name: 'network',
        value: net,
      },
    };
    this.props.handleSpecChange(event);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.props.spec.network.length === 0) {
      this.setState({
        countValidation: '请添加网络',
      });
      return;
    }

    this.props.handleNextClick(e);
  };

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  handleCIDRChange = (e) => {
    this.setState({
      CIDR: e.target.value,
    });
  };

  handleIpVersionChange = (value) => {
    this.setState({
      ipVersion: value,
    });
  };

  handleGatewayChange = (e) => {
    this.setState({
      gateway: e.target.value,
    });
  };

  handleDHCPChange = (e) => {
    this.setState({
      DHCP: e.target.checked,
    });
  };

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

  renderIpVersionsSelect(stack) {
    const { getFieldProps } = this.props.form;

    const ipVersionProps = getFieldProps('ipVersion', {
      rules: [
        { required: true, message: '网络版本必填' },
      ],
      onChange: this.handleIpVersionChange,
    });

    return (
      <Select
        {...ipVersionProps}
        style={{ width: '110px' }}
        value={this.state.ipVersion}
        placeholder="网络版本"
      >
        {stack.config.data.ipVersion.map((data) =>
          <Option key={data}>{data}</Option>
        )}
      </Select>
    );
  }

  renderAddNetworkForm() {
    const { stack } = this.props;
    const { getFieldProps } = this.props.form;
    const formEditing = this.state.formEditing;

    let ipVersions = '';

    if (stack.config.isFetching) {
      ipVersions = this.renderFetching();
    } else if (!!stack.config.error) {
      ipVersions = this.renderError(stack.config.error);
    } else {
      ipVersions = this.renderIpVersionsSelect(stack);
    }

    const nameProps = getFieldProps('name', {
      rules: [
        { required: true, message: '名称必填' },
      ],
      trigger: ['onBlur'],
      validateTrigger: ['onBlur'],
      initialValue: this.state.name,
    });

    const CIDRProps = getFieldProps('CIDR', {
      rules: [
        { required: true, message: 'CIDR网段必填' },
      ],
      trigger: ['onBlur'],
      validateTrigger: ['onBlur'],
      initialValue: this.state.CIDR,
    });

    const gatewayProps = getFieldProps('gateway', {
      rules: [
        { required: true, message: '网关必填' },
      ],
      trigger: ['onBlur'],
      validateTrigger: ['onBlur'],
      initialValue: this.state.gateway,
    });

    return (
      <Form inline form={this.props.form}>
        <div className="has-error">{this.state.countValidation}</div>
        <Row className={classNames({ hide: formEditing }, 'add-item')}>
          <FormItem>
            <Button
              type="primary"
              onClick={this.handleAddClick}
            >
              添加网络
            </Button>
          </FormItem>
        </Row>
        <Row className={classNames({ hide: !formEditing }, 'add-item')}>
          <FormItem>
            <Input
              {...nameProps}
              onChange={this.handleNameChange}
              placeholder="名称"
              name="name"
              value={this.state.name}
            />
          </FormItem>
          <FormItem>
            <Input
              {...CIDRProps}
              onChange={this.handleCIDRChange}
              placeholder="CIDR网段"
              name="CIDR"
              value={this.state.CIDR}
            />
          </FormItem>
          <FormItem>
            {ipVersions}
          </FormItem>
          <FormItem>
            <Input
              {...gatewayProps}
              onChange={this.handleGatewayChange}
              placeholder="网关"
              name="gateway"
              value={this.state.gateway}
            />
          </FormItem>
          <FormItem>
            <Checkbox
              checked={this.state.DHCP}
              onChange={this.handleDHCPChange}
            >DHCP</Checkbox>
          </FormItem>
          <FormItem>
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
          </FormItem>
        </Row>
      </Form>
    );
  }

  renderNetWorkList() {
    const { spec } = this.props;
    const networks = spec.network;
    return (
      <div>
        {networks.map((network, i) =>
          <Row key={i} type="flex" justify="center" className="list-data">
          <Col span="4">
            <span>{network.name}</span>
          </Col>
          <Col span="4">
            <span>{network.CIDR}</span>
          </Col>
          <Col span="4">
            <span>{network.ipVersion}</span>
          </Col>
          <Col span="4">
            <span>{network.gateway}</span>
          </Col>
          <Col span="4">
            <span>{network.DHCP ? '启用' : '未启用'}</span>
          </Col>
          <Col span="4">
            <a
              className="delete"
              onClick={this.handleDeleteClick(i)}
            >
              <i className={ classNames('portalicon', 'portalicon-delete', 'delete') }></i>
            </a>
          </Col>
        </Row>)}
      </div>
    );
  }

  render() {
    const { stack } = this.props;

    let addConfigs = '';
    if (stack.config.isFetching) {
      addConfigs = this.renderFetching();
    } else if (!!stack.config.error) {
      addConfigs = this.renderError(stack.config.error);
    } else {
      addConfigs = this.renderAddNetworkForm();
    }

    return (
      <Col span="20">
        <div>
          <div className="form-area">
            <div>
              <div className="add-item">
                {addConfigs}
              </div>
              <div className="list-item">
                <Row type="flex" justify="center" className="header">
                  <Col span="4">名称</Col>
                  <Col span="4">CIDR网段</Col>
                  <Col span="4">IP版本</Col>
                  <Col span="4">网关</Col>
                  <Col span="4">DHCP</Col>
                  <Col span="4">操作</Col>
                </Row>
              </div>
              <div>
                {this.renderNetWorkList()}
              </div>
            </div>
          </div>
          <Form form={this.props.form}>
            <FormButtonArea {...this.props} handleSubmit={this.handleSubmit} />
          </Form>
        </div>
      </Col>
    );
  }
}

export default Form.create()(Step1);
