import React from 'react';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';

import TerminalList from './TerminalList';

const FormItem = Form.Item;

class NotificationListForm extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object,
  };

  static propTypes = {
    form: React.PropTypes.object.isRequired,
    createNotificationList: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      name: '通知列表',
      description: '',
      terminals: [],
    };
  }

  handleTerminalsChane = (value) => {
    this.setState({
      terminals: value,
    });
  };

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  handleDescriptionChange = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  handleSubmit = () => {
    this.props.form.validateFields((errors) => {
      if (!!errors) {
        return;
      }

      this.props.createNotificationList({
        name: this.state.name,
        description: this.state.description,
        terminals: this.state.terminals,
      });
      this.context.router.push('/app/notification-lists');
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
      <div className="notification-list-new">
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
            <FormItem {...formInputItemLayout} label="描述:">
              <Input
                onChange={this.handleDescriptionChange}
                placeholder="请输入描述"
                type="textarea"
                rows="5"
                value={this.state.description}
              />
            </FormItem>
          </div>
        </Form>
        <TerminalList handleTerminalsChane={this.handleTerminalsChane} />
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

export default Form.create()(NotificationListForm);
