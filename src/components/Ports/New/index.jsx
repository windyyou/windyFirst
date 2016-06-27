import React from 'react';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import Spin from 'antd/lib/spin';

const FormItem = Form.Item;
const Option = Select.Option;
const OptGroup = Select.OptGroup;

class PortForm extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object,
  };

  static propTypes = {
    form: React.PropTypes.object.isRequired,
    port: React.PropTypes.shape({
      current: React.PropTypes.shape({
        error: React.PropTypes.object,
        data: React.PropTypes.arrayOf(React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
        })).isRequired,
      }).isRequired,
    }).isRequired,
    network: React.PropTypes.shape({
      list: React.PropTypes.shape({
        data: React.PropTypes.arrayOf(React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
          subnets: React.PropTypes.arrayOf(React.PropTypes.shape({
            id: React.PropTypes.string.isRequired,
            name: React.PropTypes.string.isRequired,
          })).isRequired,
        })).isRequired,
      }).isRequired,
    }).isRequired,
    securityGroup: React.PropTypes.shape({
      list: React.PropTypes.shape({
        isFetching: React.PropTypes.bool.isRequired,
        error: React.PropTypes.object,
        data: React.PropTypes.arrayOf(React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
        })).isRequired,
      }).isRequired,
    }).isRequired,
    createPort: React.PropTypes.func.isRequired,
    fetchSecurityGroups: React.PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.fetchSecurityGroups();
  }

  handleSubnetsChange = subnets => {
    this.setState({ subnets });
  };

  handleSubmit = () => {
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        return;
      }

      this.props.createPort({ ...values })
        .then(() => {
          if (!this.props.port.current.error) {
            this.context.router.push('/app/ports');
          }
        });
    });
  };

  renderSecurityGroups(getFieldProps) {
    if (this.props.securityGroup.list.isFetching) {
      return <Spin size="default" />;
    }

    if (this.props.securityGroup.list.error) {
      return <span>{this.props.securityGroup.list.error.message}</span>;
    }

    return (
      <Select
        {...getFieldProps('securityGroup')}
        style={{ width: 300 }}
        showSearch={false}
        placeholder="请选择安全组"
      >
        {this.props.securityGroup.list.data.map(group =>
          <Option key={group.id} value={group.id}>{group.name}</Option>
        )}
      </Select>
    );
  }

  render() {
    const { getFieldProps } = this.props.form;
    const formInputItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 7, offset: 1 },
    };

    return (
      <div className="port-new">
        <Form horizontal form={this.props.form}>
          <div className="form-area">
            <FormItem {...formInputItemLayout} label="名称">
              <Input
                {...getFieldProps('name', {
                  rules: [
                    { required: true, message: '名称必填' },
                  ],
                })}
                placeholder="请输入名称"
              />
            </FormItem>
            <FormItem {...formInputItemLayout} label="子网">
              <Select
                {...getFieldProps('subnet', {
                  rules: [
                    { required: true, message: '请选择子网' },
                  ],
                })}
                style={{ width: 300 }}
                showSearch={false}
                placeholder="请选择子网"
              >
                {this.props.network.list.data.map(net => (
                  <OptGroup key={net.id} label={net.name}>
                    {net.subnets.map(sub =>
                      <Option key={sub.id} value={sub.id}>{sub.name}</Option>)}
                  </OptGroup>
                ))}
              </Select>
            </FormItem>
            <FormItem {...formInputItemLayout} label="IP地址">
              <Input
                {...getFieldProps('ip')}
                placeholder="请输入IP地址，省略则会自动分配"
              />
            </FormItem>
            <FormItem {...formInputItemLayout} label="安全组">
              {this.renderSecurityGroups(getFieldProps)}
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

export default Form.create()(PortForm);
