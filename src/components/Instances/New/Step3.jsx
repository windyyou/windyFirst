import React from 'react';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import Radio from 'antd/lib/radio';
import InputNumber from 'antd/lib/input-number';

import FormButtonArea from './FormButtonArea';

import keyPairs from '../../../api/mock/keyPairs.json';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const Option = Select.Option;

class Step3 extends React.Component {
  handleSubmit = (e) => {
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        return;
      }

      this.props.handleSubmit(e);
    });
  };

  handleKeyPairChange = (value) => {
    const event = {
      target: {
        name: 'keyPair',
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
      <FormItem
        {...formItemLayout}
        label="密码:"
      >
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

  keyPairField = (spec, formItemLayout) => (
    <FormItem
      {...formItemLayout}
      label="密钥:"
    >
      <Select value={spec.keyPair}
        style={{ width: 200 }}
        showSearch={false}
        onChange={this.handleKeyPairChange}>
        {keyPairs.map((key, i) => <Option key={i} value={key.name}>{key.name}</Option>)}
      </Select>
    </FormItem>
  );

  render() {
    const { spec } = this.props;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 14, offset: 1 },
    };

    return (
      <Form horizontal form={this.props.form}>
        <div className="form-area">
          <FormItem
            {...formItemLayout}
            label="用户名:"
          >
            <Input defaultValue={spec.username} disabled />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="登录方式:"
          >
            <RadioGroup
              name="credentialType"
              value={spec.credentialType}
              size="large"
              onChange={this.props.handleSpecChange}
            >
              <RadioButton value="password" name="credentialType">密码</RadioButton>
              <RadioButton value="keyPair" name="credentialType">密钥</RadioButton>
            </RadioGroup>
          </FormItem>
          {spec.credentialType == 'password' ?
            this.passwordField(spec, formItemLayout) : this.keyPairField(spec, formItemLayout)}
          <FormItem
            {...formItemLayout}
            label="数量:"
          >
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
