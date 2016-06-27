import React from 'react';
import { connect } from 'react-redux';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';

import { login } from '../actions/auth';

import { redirectToApp } from '../utils/route';

const FormItem = Form.Item;

class Login extends React.Component {
  static propTypes = {
    form: React.PropTypes.shape({
      getFieldProps: React.PropTypes.func.isRequired,
      resetFields: React.PropTypes.func.isRequired,
      validateFields: React.PropTypes.func.isRequired,
    }).isRequired,
    location: React.PropTypes.shape({
      state: React.PropTypes.object,
    }).isRequired,
    login: React.PropTypes.func.isRequired,
  };

  static contextTypes = {
    router: React.PropTypes.object,
  };

  componentDidMount() {
    document.body.style.backgroundColor = '#3c8dbc';
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = 'transparent';
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        // TODO: any extra work to do except displaying validations error??
        return;
      }

      this.props.login(values).then(() => {
        redirectToApp(this.props.location.state, this.context.router.replace);
      });
    });
  };

  handleRedirectToSignUp = e => {
    e.preventDefault();
    this.context.router.push('/sign-up');
  };

  render() {
    const { getFieldProps } = this.props.form;
    const formItemLayout = {
      wrapperCol: { span: 20, offset: 2 },
    };
    const userProps = getFieldProps('code', {
      rules: [
        { required: true, message: '请输入用户名' },
      ],
    });
    const passProps = getFieldProps('password', {
      rules: [
        { required: true, message: '请输入密码' },
      ],
    });

    return (
      <Row type="flex" justify="center" align="middle">
        <Col className="login" span="8">
          <Row type="flex" className="header">
            <Col span="12" className="logo" />
          </Row>
          <Row type="flex" className="box">
            <Col span="16" className="form" >
              <Form horizontal form={this.props.form}>
                <FormItem
                  {...formItemLayout}
                >
                  <Input
                    {...userProps}
                    size="large"
                    placeholder="请输入用户名，电子邮箱地址或手机号码"
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
                  wrapperCol={{ offset: 2, span: 14 }}
                >
                  <Button
                    className="btn"
                    htmlType="submit"
                    type="primary"
                    onClick={this.handleSubmit}
                  >登录</Button>
                </FormItem>
              </Form>
            </Col>
            <Col span="8" className="sign-up-area">
              <p>还没有账号？</p>
              <a href="sign-up">立即注册 <Icon type="arrow-right" /></a>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    login: credentials => dispatch(login(credentials)),
  };
}

export default connect(
  undefined,
  mapDispatchToProps
)(Form.create()(Login));
