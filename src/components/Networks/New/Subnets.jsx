import React from 'react';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Checkbox from 'antd/lib/checkbox';
import Select from 'antd/lib/select';

import classNames from 'classnames';

const FormItem = Form.Item;
const Option = Select.Option;

class Subnets extends React.Component {

  static propTypes = {
    form: React.PropTypes.object.isRequired,
    handleSubnetsChange: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      subnets: [],
    };
  }

  handleAddClick = e => {
    e.preventDefault();

    this.props.form.validateFields(errors => {
      if (!!errors) {
        return;
      }

      this.addSubnet();
    });
  };

  handleDeleteClick = index => () => {
    const subnets = this.state.subnets.slice(0);
    subnets.splice(index, 1);
    this.setState({
      subnets,
    });
  };

  addSubnet = () => {
    const subnets = this.state.subnets.slice(0);
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        // TODO: any extra work to do except displaying validations error??
        return;
      }

      subnets.push({ ...values });
    });

    this.props.handleSubnetsChange(subnets);

    this.setState({
      subnets,
    });
    this.props.form.resetFields();
  };

  renderSubnets() {
    const subnets = this.state.subnets;

    return (
      <div>
        {subnets.map((subnet, i) => <Row key={i}>
          <Col span="4">{subnet.name}</Col>
          <Col span="4">{subnet.cidr}</Col>
          <Col span="4">{subnet.ipVersion}</Col>
          <Col span="4">{subnet.gateway}</Col>
          <Col span="4">{subnet.dhcp ? '启用' : '关闭'}</Col>
          <Col span="4">
            <a
              href="#"
              className="delete"
              onClick={this.handleDeleteClick(i)}
            >
              <i className={classNames('portalicon', 'portalicon-delete')} />
            </a>
          </Col>
        </Row>)}
      </div>
    );
  }

  render() {
    const { getFieldProps } = this.props.form;

    return (
      <div>
        <Row className="subnet-form">
          <Col span="2" className="ant-form-item">
            <label>子网</label>
          </Col>
          <Col offset="3">
            <Form inline form={this.props.form}>
              <FormItem>
                <Input
                  {...getFieldProps('name', {
                    rules: [
                      { required: true, message: '请输入名称' },
                    ],
                  })}
                  placeholder="名称"
                />
              </FormItem>
              <FormItem>
                <Input
                  {...getFieldProps('cidr', {
                    rules: [
                      { required: true, message: '请输入CIDR地址' },
                    ],
                  })}
                  placeholder="CIDR"
                />
              </FormItem>
              <FormItem>
                <Select
                  {...getFieldProps('ipVersion', {
                    initialValue: 4,
                  })}
                  placeholder="IP版本"
                >
                  {[
                    { value: 4, name: 'IP v4' },
                    { value: 6, name: 'IP v6' },
                  ].map(ip => <Option key={ip.value} value={ip.value}>{ip.name}</Option>)}
                </Select>
              </FormItem>
              <FormItem>
                <Input
                  {...getFieldProps('gateway', {
                    rules: [
                      { required: true, message: '请选择网关' },
                    ],
                  })}
                  placeholder="网关"
                />
              </FormItem>
              <FormItem>
                <Checkbox
                  {...getFieldProps('dhcp', {
                    valuePropName: 'checked',
                  })}
                >DHCP</Checkbox>
              </FormItem>
              <a
                className="add"
                onClick={this.handleAddClick}
              >
                <i className={classNames('portalicon', 'portalicon-add')} />
              </a>
            </Form>
          </Col>
        </Row>
        <Row className="subnets">
          <Col offset="3" span="16">
            <div className="simple-table-header">
              <Row>
                <Col span="4">名称</Col>
                <Col span="4">CIDR</Col>
                <Col span="4">IP版本</Col>
                <Col span="4">网关</Col>
                <Col span="4">DHCP</Col>
                <Col span="4">操作</Col>
              </Row>
            </div>
            {this.renderSubnets()}
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create()(Subnets);
