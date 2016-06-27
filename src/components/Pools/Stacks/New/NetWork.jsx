import React from 'react';
import Form from 'antd/lib/form';
import Col from 'antd/lib/col';
import InputNumber from 'antd/lib/input-number';
import Select from 'antd/lib/select';
import Row from 'antd/lib/row';
import Button from 'antd/lib/button';
import classNames from 'classnames';

import differenceBy from 'lodash/differenceBy';

import { dict } from '../../../../utils/data';

const FormItem = Form.Item;
const Option = Select.Option;

class NetWork extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    spec: React.PropTypes.object.isRequired,
    handleSpecChange: React.PropTypes.func.isRequired,
    handleNetInstance: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      name: undefined,
      CIDR: '',
      number: 1,
      formEditing: false,
      numberCheck: '',
    };
  }

  handleAddClick = () => {
    this.setState({
      formEditing: true,
    });
  };

  handleSaveClick = () => {
    this.props.form.validateFields(errors => {
      if (!!errors) {
        return;
      }

      if (this.state.number <= 0 || this.checkNumber()) {
        this.setState({
          numberCheck: '数量不符合',
        });
        return;
      }

      this.saveNet();
    });
  };

  checkNumber = () => {
    const num = this.props.spec.quantity - this.props.spec.sumNet;
    return this.state.number > num;
  };

  saveNet = () => {
    const CIDR = dict(this.state.name, this.props.spec.network, 'name', 'CIDR');

    const net = this.props.spec.netInstance.slice(0);
    net.push({
      name: this.state.name,
      CIDR,
      number: this.state.number,
    });

    const num = this.props.spec.sumNet + this.state.number;
    this.props.handleNetInstance(net, num);

    this.setState({
      formEditing: false,
      name: undefined,
      number: 1,
      numberCheck: '',
    });
    this.props.form.resetFields();
  };

  handleCancelClick = e => {
    e.preventDefault();

    this.setState({
      formEditing: false,
      numberCheck: '',
    });
  };

  handleNumberChange = value => {
    this.setState({
      number: value,
      numberCheck: '',
    });
  };

  handleNetWorkChange = value => {
    this.setState({
      name: value,
    });
  };

  handleDeleteClick = index => () => {
    const net = this.props.spec.netInstance.slice(0);
    const netNum = net[index].number;
    const num = this.props.spec.sumNet - netNum;
    net.splice(index, 1);
    this.props.handleNetInstance(net, num);
  };

  renderNetWorkSelect() {
    const differenceData =
      differenceBy(this.props.spec.network, this.props.spec.netInstance, 'name');
    const { getFieldProps } = this.props.form;

    const netProps = getFieldProps('network', {
      rules: [
        { required: true, message: '网络必填' },
      ],
      onChange: this.handleNetWorkChange,
    });

    return (
      <Select
        {...netProps}
        style={{ width: '110px' }}
        value={this.state.name}
        placeholder="网络"
      >
        {differenceData.map(data =>
          <Option key={data.name}>{data.name}</Option>
        )}
      </Select>
    );
  }

  renderAddForm() {
    const formEditing = this.state.formEditing;
    const max = this.props.spec.quantity - this.props.spec.sumNet;
    return (
      <Form inline form={this.props.form}>
        <Row className={classNames({ hide: formEditing }, 'add-item')}>
          <FormItem>
            <Button
              type="primary"
              onClick={this.handleAddClick}
            >
              添加主机
            </Button>
          </FormItem>
        </Row>
        <Row className={classNames({ hide: !formEditing }, 'add-item')}>
          <FormItem>
            在
          </FormItem>
          <FormItem>
            {this.renderNetWorkSelect()}
          </FormItem>
          <FormItem>
            中添加
          </FormItem>
          <FormItem>
            <InputNumber
              min={1}
              max={this.props.spec.quantity - this.props.spec.sumNet}
              name="number"
              value={this.state.number > max ? max : this.state.number}
              onChange={this.handleNumberChange}
            />
          </FormItem>
          <FormItem>
            台主机
          </FormItem>
          <FormItem>
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
          </FormItem>
        </Row>
      </Form>
    );
  }

  renderNetInstance() {
    const { spec } = this.props;
    const netInstance = spec.netInstance;
    return (
      <div>
        {netInstance.map((net, i) =>
          <Row key={i} type="flex" justify="center" className="list-data">
            <Col span="6">
              <span>{net.name}</span>
            </Col>
            <Col span="6">
              <span>{net.CIDR}</span>
            </Col>
            <Col span="6">
              <span>{net.number}</span>
            </Col>
            <Col span="6">
              <a
                className="delete"
                onClick={this.handleDeleteClick(i)}
              >
                <i className={classNames('portalicon', 'portalicon-delete', 'delete')}></i>
              </a>
            </Col>
          </Row>)}
      </div>
    );
  }

  render() {
    return (
      <Row type="flex" justify="center">
        <Col span="22">
          <div className="add-item">
            {this.renderAddForm()}
          </div>
          <div className="has-error">{this.state.numberCheck}</div>
          <div className="list-item">
            <Row type="flex" justify="center" className="header">
              <Col span="6">网络</Col>
              <Col span="6">CIDR网段</Col>
              <Col span="6">主机数量</Col>
              <Col span="6">操作</Col>
            </Row>
          </div>
          <div>
            {this.renderNetInstance()}
          </div>
        </Col>
      </Row>
    );
  }
}

export default Form.create()(NetWork);
