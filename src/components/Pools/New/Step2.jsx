import React from 'react';
import Form from 'antd/lib/form';
import Spin from 'antd/lib/spin';
import { Checkbox } from 'antd';
import FormButtonArea from '../../common/FormButtonArea';

const FormItem = Form.Item;

class Step2 extends React.Component {
  static propTypes = {
    spec: React.PropTypes.shape({
      cpus: React.PropTypes.number.isRequired,
      mems: React.PropTypes.number.isRequired,
      volumes: React.PropTypes.shape({
        performance: React.PropTypes.number.isRequired,
        capacity: React.PropTypes.number.isRequired,
      }).isRequired,
      fips: React.PropTypes.shape({
        CTCCIps: React.PropTypes.number.isRequired,
        CMCCIps: React.PropTypes.number.isRequired,
        CUCCIps: React.PropTypes.number.isRequired,
        BGPIps: React.PropTypes.number.isRequired,
      }).isRequired,
      dbaas: React.PropTypes.bool.isRequired,
      maas: React.PropTypes.bool.isRequired,
      vpnaas: React.PropTypes.bool.isRequired,
      lbaas: React.PropTypes.bool.isRequired,
      fwaas: React.PropTypes.bool.isRequired,
    }).isRequired,
    handleSpecChange: React.PropTypes.func.isRequired,
    form: React.PropTypes.object.isRequired,
    handleNextClick: React.PropTypes.func.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
  };

  handleSubmit = (e) => {
    this.props.handleSubmit(e);
  };

  handleInputNumberChange = (ename) => (e) => {
    const event = {
      target: {
        name: ename,
        value: e.target.checked,
      },
    };

    this.props.handleSpecChange(event);
  };

  renderFetching() {
    return (
      <Spin size="default" />
    );
  }

  renderError(error) {
    return (
      <span>{error.message}</span>
    );
  }

  render() {
    const { spec } = this.props;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 14, offset: 2 },
    };

    return (
      <Form horizontal form={this.props.form}>
        <div className="form-area">
          <FormItem {...formItemLayout} label="服务名:">
            <span>启用</span>
          </FormItem>

          <FormItem {...formItemLayout} label="数据库:">
            <Checkbox
              name="dbaas"
              checked={spec.dbaas}
              onChange={this.handleInputNumberChange('dbaas')}
            />
          </FormItem>

          <FormItem {...formItemLayout} label="监控:">
            <Checkbox
              name="maas"
              checked={spec.maas}
              onChange={this.handleInputNumberChange('maas')}
            />
          </FormItem>

          <FormItem {...formItemLayout} label="VPN:">
            <Checkbox
              name="vpnaas"
              defaultChecked={spec.vpnaas}
              onChange={this.handleInputNumberChange('vpnaas')}
            />
          </FormItem>

          <FormItem {...formItemLayout} label="负载均衡:">
            <Checkbox
              name="lbaas"
              checked={spec.lbaas}
              onChange={this.handleInputNumberChange('lbaas')}
            />
          </FormItem>

          <FormItem {...formItemLayout} label="防火墙:">
            <Checkbox
              name="fwaas"
              checked={spec.fwaas}
              onChange={this.handleInputNumberChange('fwaas')}
            />
          </FormItem>
        </div>

        <FormButtonArea {...this.props} handleSubmit={this.handleSubmit} />
      </Form>
    );
  }
}

export default Form.create()(Step2);
