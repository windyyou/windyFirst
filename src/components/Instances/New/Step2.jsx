import React from 'react';
import Form from 'antd/lib/form';
import Slider from 'antd/lib/slider';
import Radio from 'antd/lib/radio';
import Select from 'antd/lib/select';

import FormButtonArea from './FormButtonArea';

import cpus from '../../../api/mock/cpus.json';
import memorys from '../../../api/mock/memorys.json';
import networks from '../../../api/mock/networks.json';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const Option = Select.Option;
const OptGroup = Select.OptGroup;

class Step2 extends React.Component {
  handleSliderChange = (name, list, value) => {
    const event = {
      target: {
        name: name,
        value: parseInt(list[value], 10),
      },
    };

    this.props.handleSpecChange(event);
  };

  handleNetworkChange = (value) => {
    const event = {
      target: {
        name: 'subnet',
        value,
      },
    };

    this.props.handleSpecChange(event);
  };

  handleSubmit = (e) => {
    this.props.handleNextClick(e);
  };

  networkField = (spec, formItemLayout) => (
    <FormItem
      {...formItemLayout}
      label="子网:"
    >
      <Select value={spec.subnet}
              style={{ width: 200 }}
              showSearch={false}
              onChange={this.handleNetworkChange}>
        {networks.map((net, i) => <OptGroup key={i} label={net.name}>
          {net.subnet.map((sub, j) => <Option key={j} value={sub}>{sub}</Option>)}
        </OptGroup>)}
      </Select>
    </FormItem>
  );

  render() {
    const { spec } = this.props;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 14, offset: 1 },
    };

    return (
      <Form horizontal form={this.props.form}>
        <div className="form-area">
          <FormItem
            {...formItemLayout}
            label="CPU:"
          >
            <Slider
              marks={cpus}
              step={null}
              value={cpus.indexOf(`${spec.cpu}核`)}
              onChange={value => this.handleSliderChange('cpu', cpus, value)}
              tipFormatter={key => cpus[key]}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="内存:"
          >
            <Slider
              marks={memorys}
              step={null}
              value={memorys.indexOf(`${spec.memory}G`)}
              onChange={value => this.handleSliderChange('memory', memorys, value)}
              tipFormatter={key => memorys[key]}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="网络:"
            extra={<span>私有网络可在云主机创建完成后单独设置。<a href='#'>了解更多</a></span>}
          >
            <RadioGroup
              name="networkType"
              value={spec.networkType}
              size="large"
              onChange={this.props.handleSpecChange}
            >
              <RadioButton value="basic" name="networkType">基础网络</RadioButton>
              <RadioButton value="private" name="networkType">私有网络</RadioButton>
            </RadioGroup>
          </FormItem>
          {spec.networkType == 'private' ? this.networkField(spec, formItemLayout) : null}
        </div>

        <FormButtonArea {...this.props} handleSubmit={this.handleSubmit}/>
      </Form>
    );
  }
}

export default Form.create()(Step2);
