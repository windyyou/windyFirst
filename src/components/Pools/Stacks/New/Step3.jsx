import React from 'react';
import Form from 'antd/lib/form';
import Col from 'antd/lib/col';
import Checkbox from 'antd/lib/checkbox';
import Row from 'antd/lib/row';

import FormButtonArea from '../../../common/FormButtonArea';

class Step3 extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    spec: React.PropTypes.object.isRequired,
    handleNextClick: React.PropTypes.func.isRequired,
    handleSpecChange: React.PropTypes.func.isRequired,
  };

  handleChangeCheck = name => e => {
    const event = {
      target: {
        name,
        value: e.target.checked,
      },
    };

    this.props.handleSpecChange(event);
  };

  handleSubmit = e => {
    this.props.form.validateFields(errors => {
      if (!!errors) {
        return;
      }

      this.props.handleNextClick(e);
    });
  };

  render() {
    return (
      <Col span="20">
        <Form horizontal form={this.props.form}>
          <div className="form-area">
            <div className="list-item">
              <Row type="flex" justify="center" className="header">
                <Col span="10">服务名</Col>
                <Col span="10">启用</Col>
              </Row>
            </div>
            <Row type="flex" justify="center" className="list-data">
              <Col span="10">数据库</Col>
              <Col span="10">
                <Checkbox
                  defaultChecked={this.props.spec.databasesEnable}
                  onChange={this.handleChangeCheck('databasesEnable')}
                />
              </Col>
            </Row>
            <Row type="flex" justify="center" className="list-data">
              <Col span="10">监控</Col>
              <Col span="10">
                <Checkbox
                  defaultChecked={this.props.spec.monitorEnable}
                  onChange={this.handleChangeCheck('monitorEnable')}
                />
              </Col>
            </Row>
            <Row type="flex" justify="center" className="list-data">
              <Col span="10">VPN</Col>
              <Col span="10">
                <Checkbox
                  defaultChecked={this.props.spec.VPNEnable}
                  onChange={this.handleChangeCheck('VPNEnable')}
                />
              </Col>
            </Row>
            <Row type="flex" justify="center" className="list-data">
              <Col span="10">负载均衡</Col>
              <Col span="10">
                <Checkbox
                  defaultChecked={this.props.spec.loadBalancerEnable}
                  onChange={this.handleChangeCheck('loadBalancerEnable')}
                />
              </Col>
            </Row>
            <Row type="flex" justify="center" className="list-data">
              <Col span="10">防火墙</Col>
              <Col span="10">
                <Checkbox
                  defaultChecked={this.props.spec.firewallEnable}
                  onChange={this.handleChangeCheck('firewallEnable')}
                />
              </Col>
            </Row>
          </div>
          <FormButtonArea {...this.props} handleSubmit={this.handleSubmit} />
        </Form>
      </Col>
    );
  }
}

export default Form.create()(Step3);
