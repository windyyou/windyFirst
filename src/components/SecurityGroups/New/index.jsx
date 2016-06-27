import React from 'react';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';

const FormItem = Form.Item;

class SecurityGroupForm extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object,
  };

  static propTypes = {
    form: React.PropTypes.object.isRequired,
    securityGroup: React.PropTypes.shape({
      current: React.PropTypes.shape({
        error: React.PropTypes.object,
        data: React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
    createSecurityGroup: React.PropTypes.func.isRequired,
  };

  handleSubmit = () => {
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        return;
      }

      this.props.createSecurityGroup({
        ...values,
      }).then(() => {
        if (!this.props.securityGroup.current.error) {
          this.context.router.push('/app/security-groups');
        }
      }
      );
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
    });

    return (
      <div className="security-group-new">
        <Form horizontal form={this.props.form}>
          <div className="form-area">
            <FormItem {...formInputItemLayout} label="名称">
              <Input
                {...nameProps}
                placeholder="请输入名称"
              />
            </FormItem>
            <FormItem {...formInputItemLayout} label="描述">
              <Input
                type="textarea"
                rows="6"
                {...getFieldProps('description')}
                placeholder="请输入描述"
              />
            </FormItem>
          </div>
        </Form>
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

export default Form.create()(SecurityGroupForm);
