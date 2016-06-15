import React from 'react';
import { connect } from 'react-redux';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Spin from 'antd/lib/spin';
import Icon from 'antd/lib/icon';

import { signUp } from '../actions/auth';
import { redirectToLogin } from '../utils/route';

const FormItem = Form.Item;

class SignUp extends React.Component {
  static propTypes = {
    form: React.PropTypes.shape({
      getFieldProps: React.PropTypes.func.isRequired,
      getFieldValue: React.PropTypes.func.isRequired,
      validateFields: React.PropTypes.func.isRequired,
    }).isRequired,
    location: React.PropTypes.shape({
      state: React.PropTypes.object,
    }).isRequired,
    signUp: React.PropTypes.func.isRequired,
    error: React.PropTypes.object,
    isFetching: React.PropTypes.bool.isRequired,
  };

  static contextTypes = {
    router: React.PropTypes.object,
  };

  state = {
    success: false,
  };

  componentDidMount() {
    document.body.style.backgroundColor = '#3c8dbc';
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = 'transparent';
  }

  checkConfirmPass = (rule, value, callback) => {
    const { getFieldValue } = this.props.form;
    if (value && value !== getFieldValue('password')) {
      callback('password does not match');
    } else {
      callback();
    }
  };

  checkPhone = (rule, value, callback) => {
    if (value && !/^1\d{10}$/.test(value)) {
      callback('phone is incorrect');
    } else {
      callback();
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        // TODO: any extra work to do except displaying validations error??
        return;
      }

      this.props.signUp(values).then(() => {
        // signed up successfully
        if (!this.props.error) {
          this.setState({
            success: true,
          });
          setTimeout(() => {
            redirectToLogin(this.props.location.state, this.context.router.replace);
          }, 2000);
        }
      });
    });
  };

  handleRedirectToLogin = (e) => {
    e.preventDefault();
    this.context.router.push('/');
  };

  renderForm() {
    const { getFieldProps } = this.props.form;
    const formItemLayout = {
      wrapperCol: { span: 20, offset: 2 },
    };
    const codeProps = getFieldProps('code', {
      rules: [
        { required: true, message: '请输入用户名' },
      ],
    });
    const passProps = getFieldProps('password', {
      rules: [
        { required: true, message: '请输入密码' },
      ],
    });
    const confirmPassProps = getFieldProps('confirmPassword', {
      rules: [
        { required: true, message: '请再次输入密码' },
        { validator: this.checkConfirmPass, message: '请保持两次输入一致密码' },
      ],
    });
    const emailProps = getFieldProps('email', {
      rules: [
        { required: true, message: '请输入电子邮箱地址' },
        { type: 'email', message: '请输入正确的电子邮箱地址' },
      ],
    });
    const phoneProps = getFieldProps('phone', {
      rules: [
        { required: true, message: '请输入手机号码' },
        { validator: this.checkPhone, message: '请输入正确的手机号码' },
      ],
    });
    const companyProps = getFieldProps('company');
    const nameProps = getFieldProps('name');

    return (
      <Form horizontal form={this.props.form}>
        <FormItem
          {...formItemLayout}
        >
          <Input
            {...codeProps}
            size="large"
            placeholder="请输入用户名"
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
        >
          <Input
            type="password"
            size="large"
            {...passProps}
            placeholder="请输入密码"
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
        >
          <Input
            type="password"
            size="large"
            {...confirmPassProps}
            placeholder="请再次输入密码"
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
        >
          <Input
            {...emailProps}
            size="large"
            placeholder="请输入电子邮箱地址"
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
        >
          <Input
            {...phoneProps}
            size="large"
            placeholder="请输入手机号码"
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
        >
          <Input
            {...nameProps}
            size="large"
            placeholder="请输入真实姓名"
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
        >
          <Input
            {...companyProps}
            size="large"
            placeholder="请输入公司"
          />
        </FormItem>
        <FormItem
          wrapperCol={{ offset: 2, span: 14 }}
        >
          <Button
            className="btn"
            htmlType="submit"
            type="primary"
            onClick={this.handleSubmit}
          >注册</Button>
        </FormItem>
      </Form>
    );
  }

  renderRedirect() {
    return <h2>注册成功，正在跳转至登录页面……</h2>;
  }

  renderError() {
    const { error } = this.props;
    if (!!error) {
      return <span className="error">{error.message}</span>;
    }

    return null;
  }

  renderFetching() {
    if (this.props.isFetching) {
      return <Spin size="default" />;
    }

    return null;
  }

  render() {
    return (
    <Row type="flex" justify="center" align="middle">
      <Col className="sign-up" span="8">
        <Row type="flex" className="header">
          <Col span="12" className="logo" />
        </Row>
        <Row type="flex" className="box">
          <Col span="16" className="form" >
            {this.renderFetching()}
            {this.renderError()}
            {this.state.success ? this.renderRedirect() : this.renderForm()}
          </Col>
          <Col span="8" className="login-area">
            <p>已经有账号？</p>
            <a href="/">立即登录 <Icon type="arrow-right" /></a>
          </Col>
        </Row>
      </Col>
    </Row>
    );
  }
}

function mapStateToProps(state) {
  return {
    error: state.auth.error,
    isFetching: state.auth.isFetching,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signUp: (data) => dispatch(signUp(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(SignUp));
