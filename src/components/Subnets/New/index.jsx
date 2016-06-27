import React from 'react';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import Select from 'antd/lib/select';

import Subnets from './Subnets';

const FormItem = Form.Item;
const Option = Select.Option;

class SubnetForm extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object,
  };

  static propTypes = {
    form: React.PropTypes.object.isRequired,
    subnet: React.PropTypes.shape({
      current: React.PropTypes.shape({
        error: React.PropTypes.object,
        data: React.PropTypes.shape({
          id: React.PropTypes.string.isRequired,
          name: React.PropTypes.string.isRequired,
        }).isRequired,
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
    createSubnet: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      subnets: [],
    };
  }

  handleSubnetsChange = subnets => {
    this.setState({ subnets });
  };

  handleSubmit = () => {
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        return;
      }

      this.props.createSubnet({
        ...values,
        subnets: this.state.subnets,
      }).then(() => {
        if (!this.props.subnet.current.error) {
          this.context.router.push('/app/subnets');
        }
      });
    });
  };

  render() {
    const { getFieldProps } = this.props.form;
    const formInputItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 7, offset: 1 },
    };

    return (
      <div className="subnet-new">
        <Form horizontal form={this.props.form}>
          <div className="form-area">
            <FormItem {...formInputItemLayout} label="私有网络">
              <Select
                {...getFieldProps('network', {
                  rules: [
                    { required: true, message: '请选择私有网络' },
                  ],
                })}
                style={{ width: 300 }}
                showSearch={false}
              >
                {this.props.network.list.data.map(net =>
                  <Option key={net.id} value={net.id}>{net.name}</Option>
                )}
              </Select>
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
              disabled={this.state.subnets.length < 1}
            >
              创建
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create()(SubnetForm);
