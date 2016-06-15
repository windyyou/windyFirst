import React from 'react';
import Form from 'antd/lib/form';
import Spin from 'antd/lib/spin';
import { InputNumber } from 'antd';
import FormButtonArea from '../../common/FormButtonArea';

const FormItem = Form.Item;

class Step1 extends React.Component {
  static propTypes = {
    spec: React.PropTypes.shape({
      cpus: React.PropTypes.number.isRequired,
      mems: React.PropTypes.number.isRequired,
      volumes: React.PropTypes.shape({
        performance: React.PropTypes.number,
        capacity: React.PropTypes.number,
      }),
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
    handleNextClick: React.PropTypes.func.isRequired,
    handleSpecBGPChange: React.PropTypes.func.isRequired,
    handleSpecCMCCChange: React.PropTypes.func.isRequired,
    handleSpecCUCCChange: React.PropTypes.func.isRequired,
    handleSpecCTCCChange: React.PropTypes.func.isRequired,
    handleSpecVolumesPerformanceChange: React.PropTypes.func.isRequired,
    handleSpecVolumesCapacityChange: React.PropTypes.func.isRequired,
    form: React.PropTypes.object.isRequired,
  };

  handleSubmit = (e) => {
    this.props.form.validateFields((errors) => {
      if (!!errors) {
        return;
      }

      this.props.handleNextClick(e);
    });
  };

  handleInputNumberChange = (ename) => (value) => {
    const event = {
      target: {
        name: ename,
        value,
      },
    };

    this.props.handleSpecChange(event);
  };

  handleSpecPerformanceChange = (value) => {
    this.props.handleSpecVolumesPerformanceChange(value);
  };

  handleSpecCapacityChange = (value) => {
    this.props.handleSpecVolumesCapacityChange(value);
  };

  handleBGPChange = (value) => {
    this.props.handleSpecBGPChange(value);
  };

  handleCMCCChange = (value) => {
    this.props.handleSpecCMCCChange(value);
  };

  handleCUCCChange = (value) => {
    this.props.handleSpecCUCCChange(value);
  };

  handleCTCCChange = (value) => {
    this.props.handleSpecCTCCChange(value);
  }

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
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 14, offset: 2 },
    };
    const { spec } = this.props;

    return (
      <Form horizontal form={this.props.form}>
        <div className="form-area">
          <FormItem {...formItemLayout} label="CPU:">
            <InputNumber
              size="large"
              name="cpus"
              min={0}
              max={100}
              step={2}
              value={spec.cpus}
              onChange={this.handleInputNumberChange('cpus')}
            />核
          </FormItem>
          <FormItem {...formItemLayout} label="内存:">
            <InputNumber
              size="large"
              name="mems"
              min={0}
              max={102400}
              value={spec.mems}
              onChange={this.handleInputNumberChange('mems')}
            />GB
          </FormItem>
          <FormItem {...formItemLayout} label="性能型硬盘:">
            <InputNumber
              size="large"
              name="performance"
              min={0}
              max={10240}
              value={spec.volumes.performance}
              onChange={this.handleSpecPerformanceChange}
            />GB
          </FormItem>
          <FormItem {...formItemLayout} label="容量型硬盘:">
            <InputNumber
              size="large"
              name="capacity"
              min={0}
              max={102400}
              value={spec.volumes.capacity}
              onChange={this.handleSpecCapacityChange}
            />GB
          </FormItem>
          <FormItem {...formItemLayout} label="公网IP(电信线路):">
            <InputNumber
              size="large"
              name="CTCCIps"
              min={0}
              max={100}
              value={spec.fips.CTCCIps}
              onChange={this.handleCTCCChange}
            />个
          </FormItem>
          <FormItem {...formItemLayout} label="公网IP(移动线路):">
            <InputNumber
              size="large"
              name="CMCCIps"
              min={0}
              max={100}
              value={spec.fips.CMCCIps}
              onChange={this.handleCMCCChange}
            />个
          </FormItem>
          <FormItem {...formItemLayout} label="公网IP(联通线路):">
            <InputNumber
              size="large"
              name="CUCCIps"
              min={0}
              max={100}
              value={spec.fips.CUCCIps}
              onChange={this.handleCUCCChange}
            />个
          </FormItem>
          <FormItem {...formItemLayout} label="公网IP(BGP线路):">
            <InputNumber
              size="large"
              name="BGPIps"
              min={0}
              max={100}
              value={spec.fips.BGPIps}
              onChange={this.handleBGPChange}
            />个
          </FormItem>
        </div>
        <FormButtonArea {...this.props} handleSubmit={this.handleSubmit} />
      </Form>
    );
  }
}

export default Form.create()(Step1);
