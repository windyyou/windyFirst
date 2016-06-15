import React from 'react';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import Radio from 'antd/lib/radio';
import InputNumber from 'antd/lib/input-number';
import Spin from 'antd/lib/spin';

import FormButtonArea from '../../common/FormButtonArea';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const Option = Select.Option;

class Step3 extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    spec: React.PropTypes.shape({
      password: React.PropTypes.string.isRequired,
      keypair: React.PropTypes.string.isRequired,
      username: React.PropTypes.string.isRequired,
      credentialType: React.PropTypes.string.isRequired,
      quantity: React.PropTypes.number.isRequired,
    }),
    keypair: React.PropTypes.shape({
      list: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        entities: React.PropTypes.arrayOf(React.PropTypes.shape({
          name: React.PropTypes.string.isRequired,
        })),
      }),
    }),
    handleSubmit: React.PropTypes.func.isRequired,
    handleSpecChange: React.PropTypes.func.isRequired,
  };

  handleSubmit = (e) => {
    this.props.form.validateFields((errors) => {
      if (!!errors) {
        return;
      }

      this.props.handleSubmit(e);
    });
  };

  handleKeypairChange = (value) => {
    const event = {
      target: {
        name: 'keypair',
        value,
      },
    };

    this.props.handleSpecChange(event);
  };

  handleQuantityChange = (value) => {
    const event = {
      target: {
        name: 'quantity',
        value,
      },
    };

    this.props.handleSpecChange(event);
  };

  passwordField = (spec, formItemLayout) => {
    const { getFieldProps } = this.props.form;
    const passwordProps = getFieldProps('password', {
      rules: [
        { required: true, min: 6, message: '密码至少为6位字符' },
      ],
      trigger: ['onBlur'],
      validateTrigger: ['onBlur'],
      initialValue: spec.password,
    });

    return (
      <FormItem {...formItemLayout} label="密码:">
        <Input
          {...passwordProps}
          placeholder="密码"
          onChange={this.props.handleSpecChange}
          name="password"
          type="password"
          value={spec.password}
        />
      </FormItem>
    );
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

  renderKeypair(formItemLayout) {
    const { spec, keypair } = this.props;
    const { getFieldProps } = this.props.form;
    const isFetching = keypair.list.isFetching;
    const error = keypair.list.error;

    const keypairProps = getFieldProps('keypair', {
      rules: [
        { required: true, message: '请选择密钥' },
      ],
      onChange: this.handleKeypairChange,
      initialValue: spec.keypair,
    });

    let contents = '';
    if (isFetching) {
      contents = this.renderFetching();
    } else if (error) {
      contents = this.renderError(error);
    } else {
      contents = (
        <Select
          {...keypairProps}
          style={{ width: 200 }}
          showSearch={false}
        >
        {keypair.list.data.map((key) => <Option key={key.id} value={key.id}>{key.name}</Option>)}
      </Select>);
    }

    return (
      <FormItem {...formItemLayout} label="密钥:">
        {contents}
      </FormItem>
    );
  }

  render() {
    const { spec } = this.props;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 14, offset: 1 },
    };

    return (
      <Form horizontal form={this.props.form}>
        <div className="form-area">
          <FormItem {...formItemLayout} label="用户名:">
            <Input defaultValue={spec.username} disabled />
          </FormItem>
          <FormItem {...formItemLayout} label="登录方式:">
            <RadioGroup
              name="credentialType"
              value={spec.credentialType}
              size="large"
              onChange={this.props.handleSpecChange}
            >
              <RadioButton value="password" name="credentialType">密码</RadioButton>
              <RadioButton value="keypair" name="credentialType">密钥</RadioButton>
            </RadioGroup>
          </FormItem>
          {spec.credentialType === 'password' ?
            this.passwordField(spec, formItemLayout) : this.renderKeypair(formItemLayout)}
          <FormItem {...formItemLayout} label="数量:">
            <InputNumber
              min={1}
              max={100}
              name="quantity"
              defaultValue={spec.quantity}
              onChange={this.handleQuantityChange}
            />
          </FormItem>
        </div>

        <FormButtonArea {...this.props} handleSubmit={this.handleSubmit} />
      </Form>
    );
  }
}

export default Form.create()(Step3);
