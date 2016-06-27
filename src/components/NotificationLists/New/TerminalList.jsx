import React from 'react';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';

import classNames from 'classnames';

const FormItem = Form.Item;
const Option = Select.Option;

class TerminalList extends React.Component {

  static propTypes = {
    form: React.PropTypes.object.isRequired,
    handleTerminalsChane: React.PropTypes.func.isRequired,
    handleSubnetsChange: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      select: 'EMail',
      terminalValidate: '',
      content: '',
      terminals: [],
    };
  }

  handleInputChange = e => {
    this.setState({
      content: e.target.value,
    });
  };

  handleAddClick = e => {
    this.props.form.validateFields(errors => {
      e.preventDefault();
      if (!!errors) {
        return;
      }

      this.addTerminal();
    });
  };

  handleSelectChange = value => {
    this.setState({
      select: value,
      terminalValidate: '',
    });
  };

  handleDeleteClick = index => () => {
    const terminals = this.state.terminals.slice(0);
    terminals.splice(index, 1);
    this.setState({
      terminals,
    });
  };

  checkSMS(rule, value, callback) {
    if (!/^1\d{10}$/.test(value)) {
      callback(new Error('请输入正确的电话号码'));
    } else {
      callback();
    }
  }

  addTerminal = () => {
    const type = this.state.select;
    const content = this.state.content;
    const terminals = this.state.terminals.slice(0);
    terminals.push({
      type,
      content,
      verified: false,
    });

    this.props.handleSubnetsChange(terminals);

    this.setState({
      terminals,
      terminalValidate: '',
    });
  };

  renderTerminalList() {
    const terminals = this.state.terminals;

    return (
      <div>
        {terminals.map((terminal, i) => <Row key={i}>
          <Col span="4">{terminal.type}</Col>
          <Col span="8">{terminal.content}</Col>
          <Col span="8">未验证</Col>
          <Col span="4">
            <a
              href="#"
              className="delete"
              onClick={this.handleDeleteClick(i)}
            >
              <i className={classNames('portalicon', 'portalicon-delete')}></i>
            </a>
          </Col>
        </Row>)}
      </div>
    );
  }

  render() {
    const { getFieldProps } = this.props.form;

    const tips = this.state.select === 'EMail' ? '邮箱地址' : '手机号码';
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 14, offset: 1 },
    };

    let props = '';

    if (this.state.select === 'EMail') {
      props = getFieldProps('email', {
        validate: [{
          rules: [
            { required: true },
          ],
          trigger: 'onBlur',
        }, {
          rules: [
            { type: 'email', message: '请输入正确的邮箱地址' },
          ],
          trigger: ['onBlur', 'onChange'],
        },
        ],
        onChange: this.handleInputChange,
      });
    } else {
      props = getFieldProps('sms', {
        rules: [
          { validator: this.checkSMS },
        ],
        trigger: ['onBlur', 'onChange'],
        onChange: this.handleInputChange,
      });
    }

    return (
      <Form horizontal form={this.props.form}>
        <FormItem {...formItemLayout} label="终端:">
          <Row>
            <Col span="4" className="marginRight10px">
              <Select
                defaultValue={this.state.select}
                style={{ width: '100%' }}
                size="large"
                onChange={this.handleSelectChange}
              >
                <Option value="EMail">EMail</Option>
                <Option value="SMS">SMS</Option>
              </Select>
            </Col>
            <Col span="8">
              <FormItem>
                <Input
                  {...props}
                  placeholder={tips}
                />
              </FormItem>
            </Col>
            <Col span="2" className="lineHeight30px">
              <a
                className="add"
                onClick={this.handleAddClick}
              >
                <i className={classNames('portalicon', 'portalicon-add')}></i>
              </a>
            </Col>
            <Col span="8" className="lineHeight30px">
              <div className="has-error">{this.state.terminalValidate}</div>
            </Col>
          </Row>
        </FormItem>
        <FormItem {...formItemLayout} label=" ">
          <Row>
            <Col span="24">
              <div className="terminal-header">
                <Row>
                  <Col span="4">类别</Col>
                  <Col span="8">终端</Col>
                  <Col span="8">验证状态</Col>
                  <Col span="4">操作</Col>
                </Row>
              </div>
              {this.renderTerminalList()}
            </Col>
          </Row>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(TerminalList);
