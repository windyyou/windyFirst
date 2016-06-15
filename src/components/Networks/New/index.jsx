import React from 'react';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Radio from 'antd/lib/radio';

import Subnets from './Subnets';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class NetworkForm extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object,
  };

  static propTypes = {
    form: React.PropTypes.object.isRequired,
    createNetwork: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      subnets: [],
    };
  }

  handleSubnetsChange = (subnets) => {
    this.setState({ subnets });
  };

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  handleSubmit = () => {
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        return;
      }

      this.props.createNetwork({
        ...values,
        subnets: this.state.subnets,
      });
      this.context.router.push('/app/networks');
    });
  };

  render() {
    const { getFieldProps } = this.props.form;
    const formInputItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 7, offset: 1 },
    };
    const nameProps = getFieldProps('name', {
      rules: [
        { required: true, message: '名称必填' },
      ],
      trigger: ['onBlur'],
      validateTrigger: ['onBlur'],
      initialValue: this.state.name,
    });

    return (
      <div className="network-new">
        <Form horizontal form={this.props.form}>
          <div className="form-area">
            <FormItem {...formInputItemLayout} label="名称:">
              <Input
                {...nameProps}
                onChange={this.handleNameChange}
                placeholder="请输入名称"
                name="name"
                value={this.state.name}
              />
            </FormItem>
            <FormItem {...formInputItemLayout} label="受管网络:">
              <RadioGroup
                {...getFieldProps('managed', { initialValue: true })}
                onChange={this.handleSelectShare}
              >
                <Radio key="true" value>是</Radio>
                <Radio key="false">否</Radio>
              </RadioGroup>
            </FormItem>
          </div>
        </Form>
        <Subnets handleSubnetsChange={this.handleSubnetsChange} />
        <Row>
          <Col span="2" push="14">
            <Button
              type="primary"
              size="large"
              style={{ width: '100%' }}
              onClick={this.handleSubmit}
            >
              创建
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create()(NetworkForm);
